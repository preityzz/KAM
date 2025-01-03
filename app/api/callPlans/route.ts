import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { restaurantId, frequency, lastCallDate } = await request.json();

    // Validate required fields
    if (!restaurantId || !frequency) {
      return NextResponse.json(
        { message: 'Restaurant ID and frequency are required' },
        { status: 400 }
      );
    }

    // Verify restaurant exists
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId }
    });

    if (!restaurant) {
      return NextResponse.json(
        { message: 'Restaurant not found' },
        { status: 404 }
      );
    }

    // Calculate next call date based on frequency
    const nextCallDate = new Date();
    if (lastCallDate) {
      nextCallDate.setDate(new Date(lastCallDate).getDate() + frequency);
    }

    const callPlan = await prisma.callPlan.upsert({
      where: { restaurantId },
      update: {
        frequency,
        lastCallDate: lastCallDate ? new Date(lastCallDate) : null,
        nextCallDate
      },
      create: {
        restaurantId,
        frequency,
        lastCallDate: lastCallDate ? new Date(lastCallDate) : null,
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
      { message: 'Error managing call plan', error },
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

    const callPlans = await prisma.callPlan.findMany({
      where: {
        restaurant: {
          userId: parseInt(userId)
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
      { message: 'Error fetching call plans', error },
      { status: 500 }
    );
  }
}
