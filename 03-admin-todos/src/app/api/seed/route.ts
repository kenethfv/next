import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

  await prisma.todo.deleteMany();

  await prisma.todo.createMany({
    data: [
        { description: 'Piedra de alma', complete: true },
        { description: 'Piedra de realidad' },
        { description: 'Piedra de espacio' },
        { description: 'Piedra de tiempo' },
        { description: 'Piedra de poder' },
        { description: 'Piedra de mente' },

    ]
  })


  return NextResponse.json({ message: 'seed excecuted'})
}