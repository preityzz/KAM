import { Restaurant } from './index';
// export type Interaction = {
//   id: number;
//   restaurantName: string;
//   interactionDate: string;
//   interactionType: string;
//   details: string;
//   restaurant: Restaurant;
// };
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
