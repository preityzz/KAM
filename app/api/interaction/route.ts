
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { restaurantId, interactionType, details, interactionDate, userId } =
      await request.json();

    if (!restaurantId || !interactionType || !interactionDate || !userId) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const restaurant = await prisma.restaurant.findFirst({
      where: {
        id: restaurantId,
        userId: parseInt(userId)
      }
    });

    if (!restaurant) {
      return NextResponse.json(
        { message: 'Restaurant not found or unauthorized' },
        { status: 404 }
      );
    }

    const interaction = await prisma.interaction.create({
      data: {
        restaurantId,
        interactionType,
        details: details || '',
        interactionDate: new Date(interactionDate)
      },
      include: {
        restaurant: true
      }
    });

    return NextResponse.json({
      message: 'Interaction created successfully',
      interaction
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating interaction', error },
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

    const interactions = await prisma.interaction.findMany({
      where: {
        restaurant: {
          userId: parseInt(userId)
        }
      },
      include: {
        restaurant: true
      },
      orderBy: {
        interactionDate: 'desc'
      }
    });

    return NextResponse.json({
      message: 'Interactions fetched successfully',
      interactions
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching interactions', error },
      { status: 500 }
    );
  }
}