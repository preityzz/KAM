import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { name, role, email, phone, restaurantId } = await request.json();
    if (!name || !role || !email || !phone || !restaurantId) {
      return NextResponse.json(
        { message: "Please provide all fields" },
        { status: 400 }
      );
    }

    // Check if the restaurant exists
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      include: { contacts: true },
    });


    if (!restaurant) {
      return NextResponse.json(
        { message: "Restaurant not found" },
        { status: 404 }
      );
    }
    const contact = await prisma.contact.create({
      data: { name, role, email, phone, restaurantId },
    });

    return NextResponse.json(contact);
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating contact", error },
      { status: 500 }
    );
  }
}
