/**
 * @swagger
 * /api/callPlans:
 *   post:
 *     summary: Create a new call plan
 *     description: Creates a new call plan for a restaurant with specified frequency
 *     tags: [CallPlans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - restaurantId
 *               - frequency
 *             properties:
 *               restaurantId:
 *                 type: string
 *                 description: ID of the restaurant
 *               frequency:
 *                 type: integer
 *                 description: Call frequency in days
 *               lastCallDate:
 *                 type: string
 *                 format: date
 *                 description: Date of the last call (optional)
 *     responses:
 *       201:
 *         description: Call plan created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 callPlan:
 *                   $ref: '#/components/schemas/CallPlan'
 *       400:
 *         description: Bad request - Missing required fields
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Server error
 */

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { restaurantId, frequency, lastCallDate } = await request.json();

    // Validate required fields
    if (!restaurantId || !frequency) {
      return NextResponse.json(
        { message: 'Restaurant ID and frequency are required' },
        { status: 400 }
      );
    }

    // Verify restaurant exists
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId }
    });

    if (!restaurant) {
      return NextResponse.json(
        { message: 'Restaurant not found' },
        { status: 404 }
      );
    }

    // Calculate next call date based on frequency
    const nextCallDate = new Date();
    if (lastCallDate) {
      nextCallDate.setDate(new Date(lastCallDate).getDate() + frequency);
    }

    const callPlan = await prisma.callPlan.upsert({
      where: { restaurantId },
      update: {
        frequency,
        lastCallDate: lastCallDate ? new Date(lastCallDate) : null,
        nextCallDate
      },
      create: {
        restaurantId,
        frequency,
        lastCallDate: lastCallDate ? new Date(lastCallDate) : null,
        nextCallDate
      },
      include: {
        restaurant: true
      }
    });

    return NextResponse.json({
      message: 'Call plan created successfully',
      callPlan
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error managing call plan', error },
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

    const callPlans = await prisma.callPlan.findMany({
      where: {
        restaurant: {
          userId: parseInt(userId)
        }
      },
      include: {
        restaurant: true
      },
      orderBy: {
        nextCallDate: 'asc'
      }
    });

    return NextResponse.json({
      message: 'Call plans fetched successfully',
      callPlans
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching call plans', error },
      { status: 500 }
    );
  }
}
