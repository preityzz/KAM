// import { useQuery } from '@tanstack/react-query';
// import type { Order } from '@/types/order-type';

// const API_URL = '/api/orders';

// export const QUERY_KEYS = {
//   orders: ['orders'] as const,
//   order: (id: number) => ['orders', id] as const
// };

// async function fetchOrders(): Promise<Order[]> {
//   try {
//     const response = await fetch(API_URL);
//     if (!response.ok) {
//       throw new Error('Failed to fetch orders');
//     }
//     const data: Order[] = await response.json();
//     return data;
//   } catch (error) {
//     throw {
//       message:
//         error instanceof Error ? error.message : 'Failed to fetch orders',
//       status: error instanceof Response ? error.status : 500
//     };
//   }
// }

// export function useOrders() {
//   return useQuery({
//     queryKey: QUERY_KEYS.orders,
//     queryFn: fetchOrders
//   });
// }

// export function useOrder(id: number) {
//   return useQuery({
//     queryKey: QUERY_KEYS.order(id),
//     queryFn: async () => {
//       const response = await fetch(`${API_URL}/${id}`);
//       if (!response.ok) throw new Error('Failed to fetch order');
//       return response.json();
//     },
//     enabled: !!id
//   });
// }

import { useQuery } from '@tanstack/react-query';
import { Restaurant } from '@/types';

interface Order {
  id: number;
  restaurantId: number;
  orderDate: string;
  orderValue: number;
  orderStatus: string;
  restaurant: Restaurant;
  performanceId: number | null;
}

interface APIResponse {
  message: string;
  data: Order[];
}

const API_URL = '/api/orders';

export const QUERY_KEYS = {
  orders: ['orders'] as const,
  order: (id: number) => ['orders', id] as const
};
async function fetchOrders(): Promise<Order[]> {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch orders');

  const { data } = (await response.json()) as APIResponse;
  return data;
}

export function useOrders() {
  return useQuery({
    queryKey: QUERY_KEYS.orders,
    queryFn: fetchOrders
  });
}
