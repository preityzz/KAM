import { Icons } from '@/components/icons';
export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export interface RestaurantLead {
  id: number;
  name: string;
  address: string;
  phone: string;
  status: string;
  totalContacts?: number;
  createdAt: string;
  updatedAt: string;
}
export interface RestaurantData {
  id: number;
  name: string;
  address: string;
  phone: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
export interface Order {
  id: string;
  restaurant: string;
  orderDate: string;
  orderStatus: string;
  orderValue: number;
}

export interface RestaurantLead
  extends Omit<RestaurantData, 'createdAt' | 'updatedAt'> {
  totalContacts?: number;
}

export type Restaurant = Omit<RestaurantLead, 'totalContacts'>;

export type RestaurantFormData = Omit<RestaurantLead, 'id' | 'totalContacts'>;

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
