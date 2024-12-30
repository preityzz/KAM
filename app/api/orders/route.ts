import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust the path to your prisma client file

export async function POST(request: Request) {
  try {
    const { restaurantId, orderDate, orderValue, orderStatus, performanceId } =
      await request.json();

    if (!restaurantId || !orderDate || !orderValue || !orderStatus) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create or update the order
    const order = await prisma.order.create({
      data: {
        restaurant: { connect: { id: restaurantId } },
        orderDate,
        orderValue,
        orderStatus,
        performance: performanceId
          ? {
              connect: { id: performanceId }
            }
          : undefined
      }
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong while creating/updating the order' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { orderDate: 'desc' },
      include: {
        restaurant: true,
        performance: true
      }
    });
    return NextResponse.json({
      message: 'Orders fetched successfully',
      data: orders
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong while fetching orders' },
      { status: 500 }
    );
  }
}
