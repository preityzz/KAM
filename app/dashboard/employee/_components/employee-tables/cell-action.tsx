'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { RestaurantLead } from '@/types/restaurant-type';
import { Edit, MoreHorizontal, Trash, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDeleteRestaurant } from '@/app/queries/restaurants';
import { toast } from 'sonner';
import { EditForm } from './edit-form';
import { useState } from 'react';

interface CellActionProps {
  data: RestaurantLead;
}

export function CellAction({ data }: CellActionProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { mutate: deleteRestaurant, isPending: isDeleting } =
    useDeleteRestaurant();

  const onConfirm = () => {
    deleteRestaurant(data.id, {
      onSuccess: () => toast.success('Restaurant deleted'),
      onError: () => toast.error('Failed to delete')
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Restaurant</DialogTitle>
            </DialogHeader>
            <EditForm initialData={data} onClose={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
        <DropdownMenuItem
          onClick={onConfirm}
          disabled={isDeleting}
          className="text-red-600"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/dashboard/employee/pocs/${data.id}`)}
        >
          <Users className="mr-2 h-4 w-4" />
          POCs
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
