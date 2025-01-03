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

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useUpdateRestaurant } from '@/app/queries/restaurants';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2),
  address: z.string().min(5),
  phone: z.string().min(10),
  status: z.enum(['active', 'pending', 'inactive'])
});

type FormValues = z.infer<typeof formSchema>;

interface CellActionProps {
  data: RestaurantLead;
}

export function CellAction({ data }: CellActionProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { mutate: deleteRestaurant, isPending: isDeleting } =
    useDeleteRestaurant();

  const { mutate: updateRestaurant, isPending } = useUpdateRestaurant();

  const onConfirm = () => {
    deleteRestaurant(data.id, {
      onSuccess: () => toast.success('Restaurant deleted'),
      onError: () => toast.error('Failed to delete')
    });
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      address: data.address,
      phone: data.phone,
      status: data.status as 'active' | 'pending' | 'inactive'
    }
  });

  const onSubmit = async (values: FormValues) => {
    updateRestaurant(
      { id: data.id, data: values },
      {
        onSuccess: () => {
          toast.success('Updated successfully');
        },
        onError: () => toast.error('Update failed')
      }
    );
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {['active', 'pending', 'inactive'].map((status) => (
                            <SelectItem key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Updating...</span>
                    </div>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </form>
            </Form>
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
          onClick={() =>
            router.push(`/dashboard/restaurantLeads/pocs/${data.id}`)
          }
        >
          <Users className="mr-2 h-4 w-4" />
          POCs
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
