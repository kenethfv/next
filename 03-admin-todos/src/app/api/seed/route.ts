import prisma from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"
import bcrypt from "bcryptjs"

export async function GET(request: Request) {
  await prisma.todo.deleteMany()
  await prisma.user.deleteMany()

  const user = await prisma.user.create({
    data: {
      email: "test@google.com",
      password: bcrypt.hashSync("123456"),
      roles: ["admin", "client", "super-user"],
      todos: {
        create: [
          { description: "Piedra de alma", complete: true },
          { description: "Piedra de realidad" },
          { description: "Piedra de espacio" },
          { description: "Piedra de tiempo" },
          { description: "Piedra de poder" },
          { description: "Piedra de mente" },
        ],
      },
    },
  })

  // await prisma.todo.createMany({
  //   data: [
  //       { description: 'Piedra de alma', complete: true },
  //       { description: 'Piedra de realidad' },
  //       { description: 'Piedra de espacio' },
  //       { description: 'Piedra de tiempo' },
  //       { description: 'Piedra de poder' },
  //       { description: 'Piedra de mente' },

  //   ]
  // })

  return NextResponse.json({ message: "seed excecuted" })
}
