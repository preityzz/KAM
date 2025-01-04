
export interface Interaction {
  id: number;
  interactionType: string;
  details: string;
  interactionDate: string;
  restaurantId: number;
  restaurantName: string;
  userId: number;
}

export interface InteractionTableProps {
  data: Interaction[];
  totalData: number;
}
