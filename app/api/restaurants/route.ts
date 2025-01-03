import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const { name, address, phone, status, userId } = await request.json();

    if (!name || !address || !phone || !status || !userId) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) }
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        address,
        phone,
        status,
        userId: parseInt(userId)
      }
    });

    return NextResponse.json({
      message: 'Restaurant created successfully',
      restaurant
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        return NextResponse.json(
          { message: 'Invalid user ID provided' },
          { status: 400 }
        );
      }
    }
    return NextResponse.json(
      { message: 'Error creating restaurant', error },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }

    const restaurants = await prisma.restaurant.findMany({
      where: {
        userId: parseInt(userId)
      },
      include: {
        contacts: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      message: 'Restaurants fetched successfully',
      restaurants
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching restaurants' },
      { status: 500 }
    );
  }
}
