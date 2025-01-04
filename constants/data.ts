import { NavItem } from '@/types';

export type RestaurantLead = {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive' | 'pending'; 
  assignedKAM: string; 
  userId: number; 
  createdAt: Date; 
  updatedAt: Date; 
  contacts?: Contact[]; 
  notes?: string; 
  lastInteraction?: Date;
  location?: {
   
    latitude?: number;
    longitude?: number;
  };
};
export type Contact = {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: string; 
  isPrimary: boolean; 
  restaurantId: number; 
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] 
  },
  {
    title: 'Restaurant Leads',
    url: '/dashboard/restaurantLeads',
    icon: 'user',
    shortcut: ['r', 'r'],
    isActive: false,
    items: [] 
  },

  {
    title: 'Interactions',
    url: '/dashboard/interactions',
    icon: 'messageCircle',
    shortcut: ['i', 'i'],
    isActive: false,
    items: [] 
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
    items: [] 
  }
];
