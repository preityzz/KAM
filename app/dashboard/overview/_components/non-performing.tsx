'use client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useOrders } from '@/app/queries/order';
import { useRestaurants } from '@/app/queries/restaurants';
import { format } from 'date-fns';

export default function NonPerformingRestaurants() {
  const { data: orders } = useOrders();
  const { data: restaurants } = useRestaurants();

  const nonPerforming = restaurants
    ?.map((restaurant) => ({
      ...restaurant,
      lastOrderDate:
        orders?.find((order) => order.restaurant?.id === restaurant.id)
          ?.orderDate || null
    }))
    .filter((restaurant) => {
      const restaurantOrders =
        orders?.filter((order) => order.restaurant?.id === restaurant.id) || [];
      return restaurant.status === 'inactive' && restaurantOrders.length === 0;
    });

  return (
    <div className="space-y-4">
      {nonPerforming?.map((restaurant) => (
        <Alert key={restaurant.id} variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-semibold">{restaurant.name}</AlertTitle>
          <AlertDescription className="mt-2">
            <div className="flex flex-col space-y-1 text-sm">
              <span>Status: {restaurant.status}</span>
              <span>Total Orders: 0</span>
              <span>
                Last Activity:{' '}
                {restaurant.lastOrderDate
                  ? format(new Date(restaurant.lastOrderDate), 'PPP')
                  : 'No activity recorded'}
              </span>
            </div>
          </AlertDescription>
        </Alert>
      ))}
      {!nonPerforming?.length && (
        <div className="text-center text-muted-foreground">
          No non-performing restaurants found
        </div>
      )}
    </div>
  );
}
