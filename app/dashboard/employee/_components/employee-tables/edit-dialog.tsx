'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
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
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { RestaurantLead } from '@/types/restaurant-type';

const formSchema = z.object({
  name: z.string().min(2),
  address: z.string().min(5),
  phone: z.string().min(10),
  status: z.enum(['active', 'pending', 'inactive'])
});

type FormValues = z.infer<typeof formSchema>;

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  initialData: RestaurantLead;
}

export function EditDialog({ open, onClose, initialData }: EditDialogProps) {
  const { mutate: updateRestaurant, isPending } = useUpdateRestaurant();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name,
      address: initialData.address,
      phone: initialData.phone,
      status: initialData.status as 'active' | 'pending' | 'inactive'
    }
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await updateRestaurant(
        { id: initialData.id, data: values },
        {
          onSuccess: () => {
            toast.success('Updated successfully');
            onClose();
          },
          onError: () => toast.error('Update failed')
        }
      );
    } catch (error) {
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Restaurant</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {Object.keys(formSchema.shape).map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as keyof FormValues}
                render={({ field: fieldProps }) => (
                  <FormItem>
                    <FormLabel className="capitalize">{field}</FormLabel>
                    <FormControl>
                      {field === 'status' ? (
                        <Select
                          onValueChange={fieldProps.onChange}
                          defaultValue={fieldProps.value}
                          disabled={isPending}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {['active', 'pending', 'inactive'].map((status) => (
                              <SelectItem key={status} value={status}>
                                {status.charAt(0).toUpperCase() +
                                  status.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input {...fieldProps} disabled={isPending} />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
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
  );
}
