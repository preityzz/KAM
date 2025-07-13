'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import * as z from 'zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
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

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  phone: z.string().min(10, 'Phone must be at least 10 characters'),
  status: z.enum(['active', 'inactive', 'pending'])
});

type FormValues = z.infer<typeof formSchema>;

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'text-green-600';
    case 'inactive':
      return 'text-red-600';
    case 'pending':
      return 'text-yellow-600';
    default:
      return '';
  }
};

export default function RestaurantLeadForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      status: 'pending'
    }
  });

  const { mutate: createRestaurant, isPending } = useMutation({
    mutationFn: async (values: FormValues) => {
      const response = await fetch('/api/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...values,
          userId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create restaurant');
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success('Restaurant created successfully');
      router.push('/dashboard/restaurantLeads');
      router.refresh();
    },
    onError: () => {
      toast.error('Failed to create restaurant');
    }
  });

  const onSubmit = (values: FormValues) => {
    createRestaurant(values);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="-mt-20 w-full max-w-lg shadow-md transition-all">
        <CardHeader>
          <CardTitle>Create Restaurant Lead</CardTitle>
          <CardDescription>
            Enter restaurant details to create a new lead
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
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
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
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
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
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
                        <SelectTrigger disabled={isPending}>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem
                          value="active"
                          className={getStatusColor('active')}
                        >
                          Active
                        </SelectItem>
                        <SelectItem
                          value="inactive"
                          className={getStatusColor('inactive')}
                        >
                          Inactive
                        </SelectItem>
                        <SelectItem
                          value="pending"
                          className={getStatusColor('pending')}
                        >
                          Pending
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-[#084C61] text-white hover:bg-[#084C61]/90"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Restaurant Lead'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
