'use client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useOrders } from '@/app/queries/order';
import { useRestaurants } from '@/app/queries/restaurants';
import { useSession } from 'next-auth/react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function NonPerformingRestaurants() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data: restaurants = [], isLoading: restaurantsLoading } =
    useRestaurants({ userId: userId || '' });
  const { data: orders = [], isLoading: ordersLoading } = useOrders(
    userId || ''
  );

  if (restaurantsLoading || ordersLoading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const nonPerforming = restaurants
    .map((restaurant) => ({
      ...restaurant,
      lastOrderDate:
        orders.find((order) => order.restaurantId === restaurant.id)
          ?.orderDate || null
    }))
    .filter((restaurant) => !restaurant.lastOrderDate)
    .slice(0, 5);

  if (!nonPerforming?.length) {
    return (
      <Alert className="flex min-h-[200px] items-center justify-center bg-green-50 text-green-600 md:min-h-[300px] lg:min-h-[400px]">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>All Restaurants Active</AlertTitle>
        <AlertDescription>
          All restaurants are performing well.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className=" h-[400px] w-full space-y-2 overflow-y-auto px-1">
      {nonPerforming.map((restaurant) => (
        <Card
          key={restaurant.id}
          className="w-full border-l-4 border-l-red-500 bg-red-50"
        >
          <CardContent className="flex w-full items-center justify-between p-3">
            <div className="w-full space-y-2">
              <div className="flex items-center gap-2">
                <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
                <p className="fontsemibold text-sm text-gray-800">
                  {restaurant.name}
                </p>
              </div>
              <div className="flex w-full items-center gap-2 text-[11px] tracking-wide text-red-600">
                <Badge
                  variant="outline"
                  className="border-red-200 bg-red-100/80 px-2 py-0 text-[10px] font-medium tracking-wider transition-colors hover:bg-red-100"
                >
                  Inactive
                </Badge>
                <span className="text-red-400/70">•</span>
                <span className="font-medium ">No Orders</span>
                <span className="text-red-400/70">•</span>
                <span className="font-medium">Last Activity: Never</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
