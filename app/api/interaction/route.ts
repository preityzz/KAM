import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { interactionType, details, interactionDate, restaurantId } =
      await req.json();

    if (!interactionType || !interactionDate || !restaurantId) {
      return NextResponse.json(
        {
          message:
            'Please provide interactionType, interactionDate, and restaurantId.'
        },
        { status: 400 }
      );
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId }
    });

    if (!restaurant) {
      return NextResponse.json(
        { message: 'Restaurant not found.' },
        { status: 404 }
      );
    }

    // Create a new interaction
    const interaction = await prisma.interaction.create({
      data: {
        interactionType,
        details,
        interactionDate: new Date(interactionDate),
        restaurant: { connect: { id: restaurantId } }
      }
    });

    return NextResponse.json(interaction, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating interaction', error: (error as any).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const interactions = await prisma.interaction.findMany({
      orderBy: { interactionDate: 'desc' },
      include: {
        restaurant: true
      }
    });
    return NextResponse.json({
      message: 'interactions fetched successfully',
      data: interactions
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching interactions', error: (error as any).message },
      { status: 500 }
    );
  }
}
