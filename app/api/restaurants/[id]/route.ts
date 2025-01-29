import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const restaurantSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  phone: z.string().min(10, 'Phone must be at least 10 characters'),
  status: z.enum(['active', 'pending', 'inactive'])
});


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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const restrauntId = params?.id;

    if (!restrauntId || isNaN(Number(restrauntId))) {
      return NextResponse.json(
        { error: 'Invalid restaurant ID' },
        { status: 400 }
      );
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: { id: parseInt(restrauntId) }
    });

    if (!restaurant) {
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      );
    }
    await prisma.restaurant.delete({
      where: { id: parseInt(restrauntId) }
    });

    return NextResponse.json(
      { message: 'Restaurant deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete restaurant' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const validatedData = restaurantSchema.safeParse(body);

    if (!params.id || isNaN(Number(params.id))) {
      return NextResponse.json(
        { error: 'Invalid restaurant ID' },
        { status: 400 }
      );
    }
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: validatedData.error.issues },
        { status: 400 }
      );
    }

    const restaurant = await prisma.restaurant.update({
      where: { id: parseInt(params.id) },
      data: validatedData.data
    });

    return NextResponse.json(restaurant);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update restaurant' },
      { status: 500 }
    );
  }
}
