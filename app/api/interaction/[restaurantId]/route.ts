import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// here we get interactions for a specific restaurant with the help of the restaurantId

export async function GET(
  req: Request,
  { params }: { params: { restaurantId: string } }
) {
  try {
    const { restaurantId } = params;

    if (!restaurantId || isNaN(Number(restaurantId))) {
      return NextResponse.json(
        { message: 'Invalid or missing restaurantId.' },
        { status: 400 }
      );
    }

    const interactions = await prisma.interaction.findMany({
      where: { restaurantId: Number(restaurantId) },
      orderBy: { interactionDate: 'desc' }
    });

    if (!interactions || interactions.length === 0) {
      return NextResponse.json(
        { message: 'No interactions found for the restaurant.' },
        { status: 404 }
      );
    }

    return NextResponse.json(interactions);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching interactions', error: (error as any).message },
      { status: 500 }
    );
  }
}
