import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust the path to your prisma client file
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { restaurantId: string } }
) {
  const { restaurantId } = params;

  if(!restaurantId || isNaN(Number(restaurantId))) {
    return NextResponse.json(
      { message: "Invalid or missing restaurantId" },
      { status: 400 }
    );
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        restaurantId: parseInt(restaurantId),
      },
      include: {
        performance: true, // Optional: Include performance details if necessary
        restaurant: true, // Include restaurant details if necessary
      },
    });

    if (!orders.length) {
      return NextResponse.json(
        { message: `No orders found for restaurant ID: ${restaurantId}` },
        { status: 404 }
      );
    }

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong while fetching the orders" },
      { status: 500 }
    );
  }
}
