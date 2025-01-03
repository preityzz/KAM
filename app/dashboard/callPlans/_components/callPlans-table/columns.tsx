'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
// import { CellAction } from './cell-action';

export type CallPlan = {
  id: number;
  restaurant: {
    name: string;
  };
  frequency: number;
  lastCallDate: string | null;
  nextCallDate: string;
};

export const columns: ColumnDef<CallPlan>[] = [
  {
    accessorKey: 'restaurant.name',
    header: 'Restaurant Name',
    cell: ({ row }) => (
      <span className="font-medium">{row.original.restaurant.name}</span>
    )
  },
  {
    accessorKey: 'frequency',
    header: 'Frequency',
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="border-[#4A5568] bg-[#CED3DC] text-[#4A5568] hover:bg-[#BFC6D3]"
      >
        Every {row.getValue('frequency')} days
      </Badge>
    )
  },
  {
    accessorKey: 'lastCallDate',
    header: 'Last Called',
    cell: ({ row }) => {
      const date = row.getValue('lastCallDate');
      return date ? format(new Date(date as string), 'PPP') : 'Never';
    }
  },
  {
    accessorKey: 'nextCallDate',
    header: 'Next Call Due',
    cell: ({ row }) => {
      const lastCallDate = row.getValue('lastCallDate') as string;
      const frequency = row.getValue('frequency') as number;

      const calculateNextCallDate = (lastCall: string | null, freq: number) => {
        if (!lastCall) return new Date(); // If no last call, due immediately
        const lastCallDateObj = new Date(lastCall);
        return new Date(
          lastCallDateObj.setDate(lastCallDateObj.getDate() + freq)
        );
      };

      const nextCallDate = calculateNextCallDate(lastCallDate, frequency);

      return (
        <span className="text-muted-foreground">
          {format(nextCallDate, 'PPP')}
        </span>
      );
    }
  }
  //   {
  //     id: 'actions',
  //     cell: ({ row }) => <CellAction data={row.original} />
  //   }
];
