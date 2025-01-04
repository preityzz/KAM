import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { RestaurantLead } from '@/types/restaurant-type';
import { useSession } from 'next-auth/react'; 
const API_URL = '/api/restaurants';

export const QUERY_KEYS = {
  restaurants: ['restaurants'] as const,
  restaurant: (id: number) => ['restaurants', id] as const
};


const appendUserId = (body: object, userId: string) => ({
  ...body,
  userId
});

interface Restaurant {
  id: number;
  name: string;
  address: string;
  phone: string;
  status: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export const fetchPoc = async (id: number, userId: string) => {
  try {
    const response = await fetch(`/api/contacts/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId })
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

async function fetchRestaurants(
  userId: string | undefined
): Promise<Restaurant[]> {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const response = await fetch(`${API_URL}?userId=${userId}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch restaurants');
  }
  const data = await response.json();
  return data.restaurants;
}

async function createRestaurant(data: Partial<Restaurant>, userId: string) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, userId })
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create restaurant');
  }
  return response.json();
}
async function updateRestaurant({
  id,
  data,
  userId
}: {
  id: number;
  data: Partial<RestaurantLead>;
  userId: string;
}) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appendUserId(data, userId))
  });
  if (!response.ok) throw new Error('Failed to update restaurant');
  return response.json();
}

async function deleteRestaurant(id: number, userId: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }) // Include userId in the request body
  });
  if (!response.ok) throw new Error('Failed to delete restaurant');
  return response.json();
}

export function useRestaurants(userId?: string) {
  return useQuery<Restaurant[], Error>({
    queryKey: ['restaurants', userId],
    queryFn: async () => {
      const response = await fetchRestaurants(userId!);
      if (!response) {
        throw new Error('No data returned');
      }
      return response;
    },
    enabled: !!userId,
    staleTime: 1000 * 60, // 1 minute
    retry: 2
    // onError: (error) => {
    //   console.error('Error fetching restaurants:', error);
    // }
  });
}

export function useCreateRestaurant() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  return useMutation({
    mutationFn: (data: Partial<Restaurant>) => createRestaurant(data, userId!),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      toast.success('Restaurant created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create restaurant');
    }
  });
}

export const useUpdateRestaurant = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  return useMutation({
    mutationFn: async (data: { id: number; data: Partial<RestaurantLead> }) =>
      updateRestaurant({ ...data, userId: userId! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.restaurants });
      toast.success('Restaurant updated successfully');
    },
    onError: () => toast.error('Failed to update restaurant')
  });
};

export function useDeleteRestaurant() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  return useMutation({
    mutationFn: (id: number) => deleteRestaurant(id, userId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.restaurants });
      toast.success('Restaurant deleted successfully');
    },
    onError: () => toast.error('Failed to delete restaurant')
  });
}

export function useAddRestaurant() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  return useMutation({
    mutationFn: async (data: RestaurantLead) => {
      const response = await fetch('/api/restaurants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appendUserId(data, userId!))
      });
      if (!response.ok) throw new Error('Failed to add restaurant');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.restaurants });
      toast.success('Restaurant added successfully');
    },
    onError: () => {
      toast.error('Failed to add restaurant');
    }
  });
}
interface FormValues {
  name: string;
  address: string;
  phone: string;
  status: string;
}

export const useCreateRestaurantLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await fetch('/api/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to create restaurant lead');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
    }
  });
};
