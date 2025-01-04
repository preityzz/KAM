import {prisma} from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { restrauntsId: string } }
) {
  try {
    const restaurantId = parseInt(params.restrauntsId);

    if (isNaN(restaurantId)) {
      return NextResponse.json(
        { error: 'Invalid restaurant ID' },
        { status: 400 }
      );
    }

    const contacts = await prisma.contact.findMany({
      where: {
        restaurantId: restaurantId
      }
    });

    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}



