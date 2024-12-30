'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Restaurant } from '@/types';

export type Interaction = {
  id: number;
  restaurantId: number;
  restaurantName: string;
  interactionDate: string;
  interactionType: 'call' | 'email' | 'meeting' | 'other';
  details: string;
  status: 'pending' | 'completed' | 'scheduled';
  restaurant: Restaurant;
};

export const columns: ColumnDef<Interaction>[] = [
  {
    accessorKey: 'restaurant.name', // Update accessor to get name from restaurant object
    header: 'Restaurant Name',
    cell: ({ row }) => {
      const restaurant = row.original.restaurant;
      return <span className="font-medium">{restaurant.name}</span>;
    }
  },
  {
    accessorKey: 'interactionDate',
    header: 'Interaction Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('interactionDate'));
      return format(date, 'PPP');
    }
  },
  {
    accessorKey: 'interactionType',
    header: 'InteractionType',
    cell: ({ row }) => {
      const type = row.getValue('interactionType') as string;
      return (
        <Badge variant="outline" className="capitalize">
          {type}
        </Badge>
      );
    }
  },
  {
    accessorKey: 'details',
    header: 'Details',
    cell: ({ row }) => {
      const details = row.getValue('details') as string;
      return <p className=" truncate">{details}</p>;
    }
  },
  {
    header: 'Actions',
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
