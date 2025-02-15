'use client';

import { useRestaurants } from '@/app/queries/restaurants';
import { useOrders } from '@/app/queries/order';
import { Users, ShoppingBag, TrendingUp, Calendar } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { TodayCalls } from './today-calls';
import BarGraph from './bar-graph';
import PageContainer from '@/components/layout/page-container';
import MetricCard from './metric-card';
import { Badge } from '@/components/ui/badge';
import NonPerformingRestaurants from './non-performing';

export default function OverViewPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data: restaurants = [], isLoading: isLoadingRestaurants } =
    useRestaurants({ userId: userId || '' });
  const { data: orders = [], isLoading: isLoadingOrders } = useOrders(
    userId || ''
  );

  if (!userId) {
    return null;
  }

  const totalRestaurants = restaurants.length;
  const totalOrders = orders.length;
  interface Order {
    orderValue: number;
  }

  const averageOrderValue: number = orders.length
    ? orders.reduce((sum: number, order: Order) => sum + order.orderValue, 0) /
      totalOrders
    : 0;

  const conversionRate: number = totalRestaurants
    ? parseFloat(((totalOrders / totalRestaurants) * 100).toFixed(1))
    : 0;

  return (
    <PageContainer>
      <div className="flex min-h-screen flex-col gap-6 p-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[#084C61]">
              Welcome back,{' '}
              {session?.user?.email
                ? session.user.email.split('@')[0]
                : session?.user?.name || 'User'}{' '}
              👋
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s what&apos;s happening with your restaurants today.
            </p>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Restaurants"
            value={totalRestaurants}
            description="Active restaurants in system"
            icon={<Users className="h-4 w-4" />}
            isLoading={isLoadingRestaurants}
          />
          <MetricCard
            title="Total Orders"
            value={totalOrders}
            description="Total orders processed"
            icon={<ShoppingBag className="h-4 w-4" />}
            isLoading={isLoadingOrders}
          />
          <MetricCard
            title="Average Order Value"
            value={`$${averageOrderValue.toFixed(2)}`}
            description="Per order average"
            icon={<TrendingUp className="h-4 w-4" />}
            isLoading={isLoadingOrders}
          />
          <MetricCard
            title="Conversion Rate"
            value={`${conversionRate}%`}
            description="Orders per restaurant"
            icon={<TrendingUp className="h-4 w-4" />}
            isLoading={isLoadingOrders || isLoadingRestaurants}
          />
        </div>

        {/* Analytics and Activity Section */}
        <div className="grid gap-6 lg:grid-cols-7  ">
          {/* Graph Section */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Restaurant Performance</CardTitle>
              <CardDescription>Monthly order analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <BarGraph />
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card className="col-span-4 lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Non-Performing Restaurants</CardTitle>
              <Badge variant="destructive" className="p-2 text-xs">
                Requires Attention
              </Badge>
            </CardHeader>
            <CardContent>
              <NonPerformingRestaurants />
            </CardContent>
          </Card>
        </div>

        {/* Today's Calls Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Today&apos;s Call Schedule</CardTitle>
                <CardDescription>Restaurants to contact today</CardDescription>
              </div>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <TodayCalls />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}


