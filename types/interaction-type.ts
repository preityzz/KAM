import { Restaurant } from './index';
export type Interaction = {
  id: number;
  restaurantName: string;
  interactionDate: string;
  interactionType: string;
  details: string;
  restaurant: Restaurant;
};
