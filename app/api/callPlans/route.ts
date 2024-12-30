import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // 
// POST: Create/Update Call Plan
export async function POST(req: Request) {
  try {
    const { restaurantId, frequency, lastCallDate, nextCallDate } =
      await req.json();

    // Create or update the call plan
    const callPlan = await prisma.callPlan.upsert({
      where: { restaurantId },
      update: {
        frequency,
        lastCallDate: lastCallDate ? new Date(lastCallDate) : null,
        nextCallDate: new Date(nextCallDate),
      },
      create: {
        restaurantId,
        frequency,
        lastCallDate: lastCallDate ? new Date(lastCallDate) : null,
        nextCallDate: new Date(nextCallDate),
      },
    });

    return NextResponse.json(callPlan, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create/update call plan" },
      { status: 500 }
    );
  }
}

// GET: Get Call Plan by Restaurant ID
export async function GET(req: Request) {
  try {
    const restaurantId = req.url.split("/").pop(); // Extract restaurantId from the URL

    if (!restaurantId) {
      return NextResponse.json(
        { error: "Restaurant ID is required" },
        { status: 400 }
      );
    }

    // Retrieve the call plan for the specific restaurant
    const callPlan = await prisma.callPlan.findUnique({
      where: { restaurantId: Number(restaurantId) },
    });

    if (callPlan) {
      return NextResponse.json(callPlan, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Call plan not found for this restaurant" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve call plan" },
      { status: 500 }
    );
  }
}
