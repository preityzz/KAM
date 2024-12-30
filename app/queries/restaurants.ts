


import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type {
  RestaurantLead,
  APIError
} from '@/types/restaurant-type';

const API_URL = '/api/restaurants';

export const QUERY_KEYS = {
  restaurants: ['restaurants'] as const,
  restaurant: (id: number) => ['restaurants', id] as const
};



export const fetchPoc = async ({ id }: { id: number }) => {
  try {
    const response = await fetch(`/api/contacts/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch all leads');
    }

    return await response.json();
  } catch (error) {
    return {
      error: true,
      message: 'An unexpected error occurred'
    };
  }
};

async function fetchRestaurants(): Promise<RestaurantLead[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch restaurants');
    }
    const data: RestaurantLead[] = await response.json();
    return data;
  } catch (error) {
    const apiError: APIError = {
      message:
        error instanceof Error ? error.message : 'Failed to fetch restaurants',
      status: error instanceof Response ? error.status : 500
    };
    throw apiError;
  }
}

async function createRestaurant(data: Partial<RestaurantLead>) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Failed to create restaurant');
  return response.json();
}

async function updateRestaurant({
  id,
  data
}: {
  id: number;
  data: Partial<RestaurantLead>;
}) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Failed to update restaurant');
  return response.json();
}

async function deleteRestaurant(id: number) {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete restaurant');
  return response.json();
}

// Custom Hooks
export function useRestaurants() {
  return useQuery({
    queryKey: QUERY_KEYS.restaurants,
    queryFn: fetchRestaurants
  });
}

export function useCreateRestaurant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.restaurants });
      toast.success('Restaurant created successfully');
    },
    onError: () => toast.error('Failed to create restaurant')
  });
}

export function useUpdateRestaurant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRestaurant,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.restaurants });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.restaurant(id) });
      toast.success('Restaurant updated successfully');
    },
    onError: () => toast.error('Failed to update restaurant')
  });
}

export function useDeleteRestaurant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.restaurants });
      toast.success('Restaurant deleted successfully');
    },
    onError: () => toast.error('Failed to delete restaurant')
  });
}

export function useAddRestaurant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RestaurantLead) => {
      const response = await fetch('/api/restaurants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to add restaurant');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      toast.success('Restaurant added successfully');
    },
    onError: () => {
      toast.error('Failed to add restaurant');
    }
  });
}
