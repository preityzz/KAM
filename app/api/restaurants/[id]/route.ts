import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const restaurantSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  phone: z.string().min(10, 'Phone must be at least 10 characters'),
  status: z.enum(['active', 'pending', 'inactive'])
});

export async function GET({ params }: { params: { restaurantId: string } }) {
  try {
    if (!params.restaurantId || isNaN(Number(params.restaurantId))) {
      return NextResponse.json(
        { message: 'Invalid or missing restaurantId' },
        { status: 400 }
      );
    }
    const performance = await prisma.performance.findUnique({
      where: { restaurantId: parseInt(params.restaurantId) }
    });

    if (!performance) {
      return NextResponse.json(
        { message: 'Performance not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(performance);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching performance', error },
      { status: 500 }
    );
  }
}

// export async function PUT({
//   params,
//   request
// }: {
//   params: { restaurantId: string };
//   request: Request;
// }) {
//   try {
//     const { name, address, phone, status } = await request.json();
//     if (!name || !address || !phone || !status) {
//       return NextResponse.json(
//         { message: 'All fields are required' },
//         { status: 400 }
//       );
//     }
//     // console.log('Restaurant ID:', params.restaurantId);

//     const restaurant = await prisma.restaurant.update({
//       where: { id: parseInt(params.restaurantId) },
//       data: { name, address, phone, status }
//     });

//     return NextResponse.json(restaurant);
//   } catch (error) {
//     return NextResponse.json(
//       { message: 'Error updating restaurant', error },
//       { status: 500 }
//     );
//   }
// }

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params?.id;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: 'Invalid restaurant ID' },
        { status: 400 }
      );
    }

    const restaurantId = Number(id);

    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId }
    });

    if (!restaurant) {
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      );
    }

    await prisma.restaurant.delete({
      where: { id: restaurantId }
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
  { params }: { params: { restaurantId: string } }
) {
  try {
    const body = await req.json();
    const validatedData = restaurantSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: validatedData.error.issues },
        { status: 400 }
      );
    }

    const restaurant = await prisma.restaurant.update({
      where: { id: parseInt(params.restaurantId) },
      data: validatedData.data
    });

    return NextResponse.json(restaurant);
  } catch (error) {
    console.error('[RESTAURANT_UPDATE]', error);
    return NextResponse.json(
      { error: 'Failed to update restaurant' },
      { status: 500 }
    );
  }
}
