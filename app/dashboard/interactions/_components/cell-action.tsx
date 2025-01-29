'use client';

import { format } from 'date-fns';
import { Interaction } from '@/types/interaction-type';

interface CellActionProps {
  data: Interaction;
}

export function CellAction({ data }: CellActionProps) {
  return (
    <div className="flex flex-col space-y-1">
      <span className="font-medium">{data.restaurantName}</span>
      <span className="text-sm text-muted-foreground">
        {format(new Date(data.interactionDate), 'PPP')}
      </span>
      <span className="text-sm capitalize">{data.interactionType}</span>
      <p className="max-w-[300px] truncate text-sm text-muted-foreground">
        {data.details}
      </p>
    </div>
  );
}
