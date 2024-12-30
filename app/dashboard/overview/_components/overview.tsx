'use client';
import BarGraph from './bar-graph';

import PageContainer from '@/components/layout/page-container';
import RecentSales from './non-performing';
import { useRestaurants } from '@/app/queries/restaurants';
import { useInteractions } from '@/app/queries/interaction';
import { useOrders } from '@/app/queries/order';
import { Users, Phone, ShoppingBag, TrendingUp } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';

export default function OverViewPage() {
  const { data: restaurants, isLoading: isLoadingLeads } = useRestaurants();
  const { data: interactions, isLoading: isLoadingCalls } = useInteractions();
  const { data: orders, isLoading: isLoadingOrders } = useOrders();

  const totalLeads = restaurants?.length || 0;
  const totalCalls =
    interactions?.filter((i) => i.interactionType === 'call').length || 0;
  const totalOrders = orders?.length || 0;
  const conversionRate = totalLeads
    ? ((totalOrders / totalLeads) * 100).toFixed(1)
    : 0;
  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Leads
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {isLoadingLeads ? (
                    <div className="h-8 w-24 animate-pulse rounded bg-muted" />
                  ) : (
                    <>
                      <div className="text-2xl font-bold">{totalLeads}</div>
                      <p className="text-xs text-muted-foreground">
                        Total restaurants in system
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Calls
                  </CardTitle>
                  <Phone className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {isLoadingCalls ? (
                    <div className="h-8 w-24 animate-pulse rounded bg-muted" />
                  ) : (
                    <>
                      <div className="text-2xl font-bold">{totalCalls}</div>
                      <p className="text-xs text-muted-foreground">
                        Total call interactions
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Orders
                  </CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {isLoadingOrders ? (
                    <div className="h-8 w-24 animate-pulse rounded bg-muted" />
                  ) : (
                    <>
                      <div className="text-2xl font-bold">{totalOrders}</div>
                      <p className="text-xs text-muted-foreground">
                        Total orders processed
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Conversion Rate
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {isLoadingLeads || isLoadingOrders ? (
                    <div className="h-8 w-24 animate-pulse rounded bg-muted" />
                  ) : (
                    <>
                      <div className="text-2xl font-bold">
                        {conversionRate}%
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Orders to leads ratio
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4">
                <BarGraph />
              </div>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Non-Performing Restaurants</CardTitle>
                  <CardDescription>
                    Restaurants with the least amount of orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
