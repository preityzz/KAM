// 'use client';

// import {
//   Bar,
//   BarChart,
//   ResponsiveContainer,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid
// } from 'recharts';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// interface Restaurant {
//   name: string;
//   revenue: number;
//   orders: number;
// }

// const data: Restaurant[] = [
//   { name: 'Restaurant A', revenue: 45000, orders: 150 },
//   { name: 'Restaurant B', revenue: 38000, orders: 120 },
//   { name: 'Restaurant C', revenue: 35000, orders: 110 },
//   { name: 'Restaurant D', revenue: 32000, orders: 100 },
//   { name: 'Restaurant E', revenue: 28000, orders: 90 }
// ];

// export default function BarGraph() {
//   return (
//     <Card className="col-span-4">
//       <CardHeader>
//         <CardTitle>Top Performing Restaurants</CardTitle>
//       </CardHeader>
//       <CardContent className="pl-2">
//         <ResponsiveContainer width="100%" height={350}>
//           <BarChart data={data}>
//             <XAxis
//               dataKey="name"
//               stroke="#888888"
//               fontSize={12}
//               tickLine={false}
//               axisLine={false}
//             />
//             <YAxis
//               stroke="#888888"
//               fontSize={12}
//               tickLine={false}
//               axisLine={false}
//               tickFormatter={(value) => `$${value}`}
//             />
//             <CartesianGrid
//               strokeDasharray="3 3"
//               vertical={false}
//               className="stroke-muted"
//             />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: '#fff',
//                 border: '1px solid #ccc',
//                 borderRadius: '4px'
//               }}
//               formatter={(value: number) => [`$${value}`, 'Revenue']}
//             />
//             <Bar
//               dataKey="revenue"
//               fill="#2563eb"
//               radius={[4, 4, 0, 0]}
//               className="fill-primary"
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }
'use client';

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useOrders } from '@/app/queries/order';

export default function BarGraph() {
  const { data: orders } = useOrders();

  // Group orders by restaurant and count them
  const restaurantOrderCounts =
    orders?.reduce(
      (acc, order) => {
        const restaurantName = order.restaurant?.name || 'Unknown';
        acc[restaurantName] = (acc[restaurantName] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ) || {};

  // Convert to array and sort by order count
  const sortedData = Object.entries(restaurantOrderCounts)
    .map(([name, orders]) => ({
      name,
      orders
    }))
    .sort((a, b) => b.orders - a.orders)
    .slice(0, 5); // Take top 5

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Top Performing Restaurants</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={sortedData}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value} orders`}
            />
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              className="stroke-muted"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
              formatter={(value: number) => [`${value} orders`, 'Orders']}
            />
            <Bar
              dataKey="orders"
              fill="#2563eb"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
