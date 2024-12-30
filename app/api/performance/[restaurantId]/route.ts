// app/api/performance/[restaurantId].ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Assuming you have Prisma set up

export async function GET(
  request: Request,
  { params }: { params: { restaurantId: string } }
) {
  const { restaurantId } = params;

  try {
    // Find performance by restaurantId
    const performance = await prisma.performance.findUnique({
      where: { restaurantId: parseInt(restaurantId) },
    });

    if (!performance) {
      return NextResponse.json(
        { error: "Performance record not found for this restaurant." },
        { status: 404 }
      );
    }

    return NextResponse.json(performance);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
