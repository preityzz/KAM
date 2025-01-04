
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
    useRestaurants(userId);
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
      <Alert className="bg-green-50 text-green-600">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>All Restaurants Active</AlertTitle>
        <AlertDescription>
          All restaurants are performing well.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {nonPerforming.map((restaurant) => (
        <Card
          key={restaurant.id}
          className="border-l-4 border-l-red-500 bg-red-50"
        >
          <CardContent className="flex items-center justify-between p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
                <p className="font-medium text-red-700">{restaurant.name}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-red-600">
                <Badge variant="outline" className="border-red-200 bg-red-100">
                  Inactive
                </Badge>
                <span>•</span>
                <span>No Orders</span>
                <span>•</span>
                <span>Last Activity: Never</span>
              </div>
            </div>
            <Badge variant="destructive" className="text-xs">
              Requires Attention
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
