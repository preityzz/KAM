import { useQuery } from '@tanstack/react-query';
import type { Interaction } from '@/types/interaction-type';

interface APIResponse {
  message: string;
  data: Interaction[];
}

const API_URL = '/api/interaction';

export const QUERY_KEYS = {
  interactions: ['interaction'] as const
};

async function fetchInteractions(): Promise<Interaction[]> {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch interactions');

  const { data } = (await response.json()) as APIResponse;
  return data;
}

export function useInteractions() {
  return useQuery({
    queryKey: QUERY_KEYS.interactions,
    queryFn: fetchInteractions
  });
}
