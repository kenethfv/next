import prisma from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"
import * as yup from "yup"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const take = Number(searchParams.get("take") ?? "10")
  const skip = Number(searchParams.get("skip") ?? "10")

  if (isNaN(take)) {
    throw NextResponse.json(
      { message: "take tiene que ser un numero" },
      { status: 400 }
    )
  }

  if (isNaN(skip)) {
    throw NextResponse.json(
      { message: "skip tiene que ser un numero" },
      { status: 400 }
    )
  }

  const todos = await prisma.todo.findMany({
    take,
    skip,
  })

  return NextResponse.json(todos)
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false), //! TODO: Mostrar algo interesante
})

export async function POST(request: Request) {
  try {
    const { complete, description } = await postSchema.validate(await request.json())

    const todo = await prisma.todo.create({ data: { description, complete } })

    return NextResponse.json(todo)
  } catch (error) {
    return NextResponse.json(error, {status: 400})
  }
}
