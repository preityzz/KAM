import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { restaurantId } = req.query;

  if (req.method === 'GET') {
    if (!restaurantId) {
      return res.status(400).json({ error: 'Restaurant ID is required' });
    }

    try {
      const callPlan = await prisma.callPlan.findUnique({
        where: { restaurantId: Number(restaurantId) }
      });

      if (callPlan) {
        res.status(200).json(callPlan);
      } else {
        res
          .status(404)
          .json({ error: 'Call plan not found for this restaurant' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve call plan' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
