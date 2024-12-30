import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// take example from here

// export async function POST(req: Request) {
//   const { name, address,contactNumber, status, assignedKAM,name,password } = await req.json();
//   const exists = await prisma.user.findUnique({
//     where: {

//     },
//   });
//   if (exists) {
//     return NextResponse.json({ error: 'User already exists' }, { status: 400 });
//   } else {
//     const user = await prisma.user.create({
//       data: {
//         email,
//         password: password,
//       },
//     });
//     return NextResponse.json(user);
//   }
// }