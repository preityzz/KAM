export interface APIResponse<T> {
  data: T;
  error?: string;
  status: 'success' | 'error';
}

export type APIError = {
  message: string;
  code?: string;
  status?: number;
};

export type Contact = {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: string;
};

export type RestaurantLead = {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  status: string;
  assignedKAM: string;
  contacts: Contact[];
};

export type RestaurantResponse = APIResponse<RestaurantLead[]>;