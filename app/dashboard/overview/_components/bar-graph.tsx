import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useOrders } from '@/app/queries/order';
import { useRestaurants } from '@/app/queries/restaurants';
import { useSession } from 'next-auth/react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarGraph() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { data: orders = [], isLoading: ordersLoading } = useOrders(
    userId || ''
  );
  const { data: restaurants = [], isLoading: restaurantsLoading } =
    useRestaurants(userId || '');

  if (ordersLoading || restaurantsLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Performance</CardTitle>
        </CardHeader>
        <CardContent className="flex h-[300px] items-center justify-center">
          Loading...
        </CardContent>
      </Card>
    );
  }

  const restaurantMetrics = restaurants
    .map((restaurant) => {
      const restaurantOrders = orders.filter(
        (order) => order.restaurantId === restaurant.id
      );
      const totalOrders = restaurantOrders.length;
      const totalValue = restaurantOrders.reduce(
        (sum, order) => sum + order.orderValue,
        0
      );

      return {
        name: restaurant.name,
        totalOrders,
        totalValue,
        averageOrderValue: totalOrders ? totalValue / totalOrders : 0,
        conversionRate: (totalOrders / (orders.length || 1)) * 100
      };
    })
    .sort((a, b) => b.conversionRate - a.conversionRate)
    .slice(0, 5);

  const chartData = {
    labels: restaurantMetrics.map((r) => r.name),
    datasets: [
      {
        label: 'Conversion Rate (%)',
        data: restaurantMetrics.map((r) => r.conversionRate.toFixed(1)),
        backgroundColor: '#4F6D7A',
        borderColor: '#4F6D7A',
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: 'rgba(8, 76, 97, 0.8)'
      },
      {
        label: 'Average Order Value ($)',
        data: restaurantMetrics.map((r) => r.averageOrderValue.toFixed(2)),
        backgroundColor: '#084C61',
        borderColor: '#084C61',
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: 'rgba(79, 109, 122, 0.8)'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Top 5 Performing Restaurants',
        color: '#442B1C',
        font: {
          size: 16,
          weight: 'bold' as 'bold'
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6'
        }
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Restaurant Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <Bar data={chartData} options={options} height={300} />
      </CardContent>
    </Card>
  );
}
