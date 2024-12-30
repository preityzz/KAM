import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, address, phone, status } = await request.json();
    if (!name || !address || !phone || !status) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }
    const restaurant = await prisma.restaurant.create({
      data: { name, address, phone, status }
    });

    return NextResponse.json(restaurant);
    
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating restaurant', error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany();
    return NextResponse.json(restaurants);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching restaurants', error },
      { status: 500 }
    );
  }
}

