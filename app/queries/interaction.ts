// import { useQuery } from '@tanstack/react-query';
// import type { Interaction } from '@/types/interaction-type';

// interface APIResponse {
//   message: string;
//   data: Interaction[];
// }

// const API_URL = '/api/interaction';

// export const QUERY_KEYS = {
//   interactions: ['interaction'] as const
// };

// async function fetchInteractions(): Promise<Interaction[]> {
//   const response = await fetch(API_URL);
//   if (!response.ok) throw new Error('Failed to fetch interactions');

//   const { data } = (await response.json()) as APIResponse;
//   return data;
// }

// export function useInteractions() {
//   return useQuery({
//     queryKey: QUERY_KEYS.interactions,
//     queryFn: fetchInteractions
//   });
// }
import { useQuery} from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

interface Interaction {
  id: number;
  interactionType: string;
  details: string;
  interactionDate: string;
  restaurantId: number;
  userId: number;
  restaurant?: {
    id: number;
    name: string;
    status: string;
  };
}

interface APIResponse {
  message: string;
  interactions: Interaction[];
}

const API_URL = '/api/interaction';
async function fetchInteractions(userId: string): Promise<Interaction[]> {
  if (!userId) throw new Error('User ID is required');

  const response = await fetch(`${API_URL}?userId=${userId}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch interactions');
  }

  const { interactions } = (await response.json()) as APIResponse;
  return interactions;
}
export function useInteractions() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  return useQuery({
    queryKey: ['interactions', userId],
    queryFn: () => fetchInteractions(userId!),
    enabled: !!userId
  });
}
