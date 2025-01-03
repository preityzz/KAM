import { useQuery } from '@tanstack/react-query';


export const QUERY_KEYS = {
  orders: ['orders'] as const,
  order: (id: number) => ['orders', id] as const
};

interface APIResponse {
  message: string;
  orders: Order[];
}

interface Order {
  id: number;
  restaurantId: number;
  orderDate: string;
  orderValue: number;
  orderStatus: string;
  restaurant: {
    name: string;
    address: string;
  };
}

async function fetchOrders(userId: string) {
  const response = await fetch(`/api/orders?userId=${userId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const { orders } = (await response.json()) as APIResponse;
  return orders;
}

export function useOrders(userId: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.orders, userId],
    queryFn: () => fetchOrders(userId),
    enabled: !!userId
  });
}
