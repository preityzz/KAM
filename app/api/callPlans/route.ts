import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { restaurantId, frequency, lastCallDate } = await request.json();

   
    const parsedRestaurantId = parseInt(restaurantId, 10);
    const parsedFrequency = parseInt(frequency, 10);

    if (isNaN(parsedRestaurantId) || isNaN(parsedFrequency)) {
      return NextResponse.json(
        { message: 'Restaurant ID and frequency must be valid numbers' },
        { status: 400 }
      );
    }

    let parsedLastCallDate = lastCallDate ? new Date(lastCallDate) : null;
    if (parsedLastCallDate && isNaN(parsedLastCallDate.getTime())) {
      return NextResponse.json(
        { message: 'Invalid last call date provided' },
        { status: 400 }
      );
    }

   
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: parsedRestaurantId }
    });

    if (!restaurant) {
      return NextResponse.json(
        { message: 'Restaurant not found' },
        { status: 404 }
      );
    }

  
    const nextCallDate = new Date();
    if (parsedLastCallDate) {
      nextCallDate.setDate(parsedLastCallDate.getDate() + parsedFrequency);
    }

   
    const callPlan = await prisma.callPlan.upsert({
      where: { restaurantId: parsedRestaurantId },
      update: {
        frequency: parsedFrequency,
        lastCallDate: parsedLastCallDate,
        nextCallDate
      },
      create: {
        restaurantId: parsedRestaurantId,
        frequency: parsedFrequency,
        lastCallDate: parsedLastCallDate,
        nextCallDate
      },
      include: {
        restaurant: true
      }
    });

    return NextResponse.json({
      message: 'Call plan created successfully',
      callPlan
    });
  } catch (error) {
   
    return NextResponse.json(
      { message: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userIdParam = url.searchParams.get('userId');
    
    if (!userIdParam) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }

    const userId = parseInt(userIdParam, 10);

    if (isNaN(userId)) {
      return NextResponse.json(
        { message: 'Invalid or missing User ID' },
        { status: 400 }
      );
    }

    const callPlans = await prisma.callPlan.findMany({
      where: {
        restaurant: {
          userId
        }
      },
      include: {
        restaurant: true
      },
      orderBy: {
        nextCallDate: 'asc'
      }
    });

    return NextResponse.json({
      message: 'Call plans fetched successfully',
      callPlans
    });
  } catch (error) {
   
    return NextResponse.json(
      { message: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
