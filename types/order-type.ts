export type Order = {
  id: number;
  restaurantName: string;
  orderDate: string;
  orderStatus: 'pending' | 'completed' | 'cancelled';
  amount: number;
};

export type APIError = {
  message: string;
  status: number;
};
