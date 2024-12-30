'use client';
import { useDeleteRestaurant } from '@/app/queries/restaurants';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { RestaurantLead } from '@/types/restaurant-type';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface CellActionProps {
  data: RestaurantLead;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const { mutate: deleteRestaurant } = useDeleteRestaurant();
  const [isDeleting, setIsDeleting] = useState(false);

  const onConfirm = async () => {
    setIsDeleting(true);
    await deleteRestaurant(data.id, {
      onSuccess: () => {
        toast.success('Restaurant deleted successfully');
      },
      onError: () => {
        toast.error('Something went wrong');
      },
      onSettled: () => {
        setIsDeleting(false);
      }
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" disabled={isDeleting}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/employee/${data.id}`)}
            disabled={isDeleting}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onConfirm}
            disabled={isDeleting}
            className="text-red-600"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
