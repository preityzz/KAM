

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

  
    const existingSuperAdmin = await prisma.user.findFirst({
      where: { role: 'SUPERADMIN' }
    });

    if (existingSuperAdmin && email === existingSuperAdmin.email) {
      return NextResponse.json(
        { error: 'Cannot register using this email.' },
        { status: 400 }
      );
    }
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    if (existingUser) {
      return NextResponse.json(
        { error: 'A user with this email already exists.' },
        { status: 400 }
      );
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newAdmin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'ADMIN',
        isVerified: false
      }
    });

    return NextResponse.json({
      message: 'Admin registered successfully',
      user: newAdmin
    });
  } catch (error) {
   
    return NextResponse.json(
      { error: 'Failed to register admin' },
      { status: 500 }
    );
  }
}
