'use client';

import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useOrders } from '@/app/queries/order';
import { Loader } from 'lucide-react';
import OrderTable from './order-table';
import { Order } from './order-table/columns';
import { useSession } from 'next-auth/react';

export default function OrderListingPage() {
  const { data: session } = useSession();
  const { data: ordersData, isLoading } = useOrders(
    session?.user?.id as string
  );

  const formattedOrders: Order[] =
    ordersData?.map((order) => ({
      id: order.id,
      restaurant: {
        name: order.restaurant?.name || 'N/A'
      },
      orderDate: order.orderDate,
      orderStatus:
        (order.orderStatus as 'pending' | 'completed' | 'cancelled') ||
        'pending',
      orderValue: order.orderValue || 0
    })) || [];

  const totalOrders = formattedOrders.length;

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex min-h-screen items-center justify-center">
          <Loader className="h-8 w-8 animate-spin  text-[#084C61]" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Orders (${totalOrders})`}
            description="View all restaurant orders and their status"
          />
        </div>
        <Separator />
        <OrderTable data={formattedOrders} totalData={totalOrders} />
      </div>
    </PageContainer>
  );
}
