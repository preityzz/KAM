import { useQuery } from '@tanstack/react-query';

export const QUERY_KEYS = {
  callPlans: ['callPlans'] as const,
  callPlan: (id: number) => ['callPlans', id] as const
};

interface APIResponse {
  message: string;
  callPlans: CallPlan[];
}

interface CallPlan {
  id: number;
  restaurantId: number;
  frequency: number;
  lastCallDate: string | null;
  nextCallDate: string;
  restaurant: {
    name: string;
    address: string;
  };
}

async function fetchCallPlans(userId: string) {
  const response = await fetch(`/api/callPlans?userId=${userId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const { callPlans } = (await response.json()) as APIResponse;
  return callPlans;
}

export function useCallPlans(userId: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.callPlans, userId],
    queryFn: () => fetchCallPlans(userId),
    enabled: !!userId
  });
}
