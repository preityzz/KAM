
import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { restaurantId: string } }
) {
  const { restaurantId } = params;
  const userId = req.nextUrl.searchParams.get('userId');

  if (!restaurantId || isNaN(Number(restaurantId))) {
    return NextResponse.json(
      { message: 'Invalid or missing restaurantId' },
      { status: 400 }
    );
  }

  if (!userId) {
    return NextResponse.json(
      { message: 'User ID is required' },
      { status: 400 }
    );
  }

  try {
   
    const restaurant = await prisma.restaurant.findFirst({
      where: {
        id: parseInt(restaurantId),
        userId: parseInt(userId)
      }
    });

    if (!restaurant) {
      return NextResponse.json(
        { message: 'Restaurant not found or unauthorized' },
        { status: 404 }
      );
    }

    const orders = await prisma.order.findMany({
      where: {
        restaurantId: parseInt(restaurantId),
        restaurant: {
          userId: parseInt(userId)
        }
      },
      include: {
        restaurant: true
      },
      orderBy: {
        orderDate: 'desc'
      }
    });

    return NextResponse.json({
      message: 'Orders fetched successfully',
      orders
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching orders', error },
      { status: 500 }
    );
  }
}
