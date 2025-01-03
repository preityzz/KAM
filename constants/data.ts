import { NavItem } from '@/types';

export type RestaurantLead = {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive' | 'pending'; // Status can only be these values
  assignedKAM: string; // Key Account Manager assigned to this lead
  userId: number; // Reference to the user who owns this lead
  createdAt: Date; // When the lead was created
  updatedAt: Date; // When the lead was last updated
  contacts?: Contact[]; // Optional array of contact persons
  notes?: string; // Optional notes about the lead
  lastInteraction?: Date; // Optional date of last interaction
  location?: {
    // Optional location details
    latitude?: number;
    longitude?: number;
  };
};
export type Contact = {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: string; // Role in the restaurant
  isPrimary: boolean; // Whether this is the primary contact
  restaurantId: number; // Reference to the restaurant
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Restaurant Leads',
    url: '/dashboard/restaurantLeads',
    icon: 'user',
    shortcut: ['r', 'r'],
    isActive: false,
    items: [] // No child items
  },

  {
    title: 'Interactions',
    url: '/dashboard/interactions',
    icon: 'messageCircle',
    shortcut: ['i', 'i'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Call Plans',
    url: '/dashboard/callPlans',
    icon: 'phone',
    shortcut: ['c', 'c'],
    isActive: false,
    items: []
  },
  {
    title: 'Orders',
    url: '/dashboard/orders',
    icon: 'shoppingBag',
    shortcut: ['o', 'o'],
    isActive: false,
    items: [] // No child items
  }
];
