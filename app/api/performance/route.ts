import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma"; 

export async function POST(request: Request) {
  try {
    const { restaurantId, totalOrders, lastOrder, performanceScore } =
      await request.json();

    if (!restaurantId || !totalOrders || !performanceScore) {
      return NextResponse.json(
        {
          error:
            "restaurantId, totalOrders, and performanceScore are required.",
        },
        { status: 400 }
      );
    }

    
    const existingPerformance = await prisma.performance.findUnique({
      where: { restaurantId },
    });

    if (existingPerformance) {
      
      const updatedPerformance = await prisma.performance.update({
        where: { restaurantId },
        data: {
          totalOrders,
          lastOrder: lastOrder ? new Date(lastOrder) : null,
          performanceScore,
        },
      });

      return NextResponse.json(updatedPerformance);
    } else {
      // Create a new performance record
      const newPerformance = await prisma.performance.create({
        data: {
          restaurant: { connect: { id: restaurantId } },
          totalOrders,
          lastOrder: lastOrder ? new Date(lastOrder) : null,
          performanceScore,
        },
      });

      return NextResponse.json(newPerformance);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
