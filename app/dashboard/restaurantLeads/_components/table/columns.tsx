'use client';

import { RestaurantLead } from '@/types/restaurant-type';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { UserCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';

function KAMColumn() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge
          variant={userEmail ? 'default' : 'secondary'}
          className="flex items-center gap-1"
        >
          <UserCircle className="h-3 w-3" />
          {userEmail || 'Unassigned'}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p>Key Account Manager</p>
        {userEmail && (
          <p className="text-xs text-muted-foreground">{userEmail}</p>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

export const columns: ColumnDef<RestaurantLead>[] = [
  {
    accessorKey: 'name',
    header: 'Restaurant Name'
  },
  {
    accessorKey: 'phone',
    header: 'Phone Number'
  },
  {
    accessorKey: 'address',
    header: 'Address'
  },
  {
    accessorKey: 'assignedKAM',
    header: 'Assigned KAM',
    cell: () => <KAMColumn />
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <span
        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium 
        ${getStatusColor(row.getValue('status'))}`}
      >
        {row.getValue('status')}
      </span>
    )
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <CellAction data={row.original} />
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'text-green-600 bg-green-100';
    case 'inactive':
      return 'text-red-600 bg-red-100';
    case 'pending':
      return 'text-yellow-600 bg-yellow-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};
