'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

export type Order = {
  id: number;
  restaurant: {
    name: string;
  };
  orderDate: string;
  orderStatus: 'pending' | 'completed' | 'cancelled';
  orderValue: number;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'restaurant.name',
    header: 'Restaurant Name',
    cell: ({ row }) => {
      const restaurant = row.original.restaurant;
      return <span className="font-medium">{restaurant?.name}</span>;
    }
  },
  {
    accessorKey: 'orderDate',
    header: 'Order Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('orderDate'));
      return format(date, 'PPP');
    }
  },
  {
    accessorKey: 'orderStatus',
    header: () => <div className="text-left">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue('orderStatus') as string;
      return (
        <Badge
          className={`
            ${status === 'completed' ? 'bg-green-100 text-green-700' : ''}
            ${status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
            ${status === 'cancelled' ? 'bg-red-100 text-red-700' : ''}
          `}
        >
          {status || 'N/A'}
        </Badge>
      );
    }
  },
  {
    accessorKey: 'orderValue',
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('orderValue'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    }
  }
];
