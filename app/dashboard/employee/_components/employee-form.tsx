'use client';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
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
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useAddRestaurant } from '@/app/queries/restaurants';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Restaurant name must be at least 2 characters.'
  }),
  address: z.string().min(5, {
    message: 'Address must be at least 5 characters.'
  }),
  phone: z.string().min(10, {
    message: 'Phone number must be at least 10 characters.'
  }),
  status: z.enum(['active', 'pending', 'inactive'])
});

type FormValues = z.infer<typeof formSchema>;

export default function EmployeeForm() {
  const router = useRouter();
  const { mutate: addRestaurant, isPending } = useAddRestaurant();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      status: 'pending'
    }
  });

  const onSubmit = (data: FormValues) => {
    addRestaurant(
      {
        ...data,
        id: 0,
        email: '',
        assignedKAM: '',
        contacts: []
      },
      {
        onSuccess: () => {
          toast.success('Restaurant added successfully');
          router.push('/dashboard/employee');
          router.refresh();
        },
        onError: (error) => {
          toast.error('Failed to add restaurant');
        }
      }
    );
  };

  return (
    <Card className="mx-auto max-w-2xl shadow-lg">
      <CardHeader className="space-y-2 border-b pb-6">
        <CardTitle className="text-3xl font-bold text-primary">
          Add New Restaurant
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Restaurant Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter restaurant name..."
                      className="h-11 text-base"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter address..."
                      className="h-11 text-base"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter phone number..."
                        className="h-11 text-base"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Status
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11 text-base">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="mt-6 h-11 w-full bg-primary text-base font-semibold hover:bg-primary/90"
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Adding Restaurant...</span>
                </div>
              ) : (
                'Add Restaurant'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
