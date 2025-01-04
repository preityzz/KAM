
import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { restaurantId, orderDate, orderValue, orderStatus } =
      await request.json();

    // Validate required fields
    if (!restaurantId || !orderDate || !orderValue || !orderStatus) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Verify restaurant exists and belongs to user
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId }
    });

    if (!restaurant) {
      return NextResponse.json(
        { message: 'Restaurant not found' },
        { status: 404 }
      );
    }

    const order = await prisma.order.create({
      data: {
        restaurantId,
        orderDate: new Date(orderDate),
        orderValue: parseFloat(orderValue),
        orderStatus
      },
      include: {
        restaurant: true
      }
    });

    return NextResponse.json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating order', error },
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

    const orders = await prisma.order.findMany({
      where: {
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
