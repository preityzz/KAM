// 'use client';

// import { useCallPlans } from '@/app/queries/callPlans';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { useSession } from 'next-auth/react';
// import { format, isSameDay, parse } from 'date-fns';
// import { Phone, Loader2 } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';

// export function TodayCalls() {
//   const { data: session } = useSession();
//   const userId = session?.user?.id;

//   // Fetch call plans data
//   const { data: callPlans = [], isLoading } = useCallPlans(userId || '');

//   // Get today's date and normalize it to midnight for comparison
//   const today = new Date();
//   today.setHours(0, 0, 0, 0); // Normalize time to midnight

//   // Debugging: Log today's date for reference
//   console.log('Today:', today);

//   // Filter call plans where nextCallDue is today's date
//   const todayCalls = callPlans.filter((plan) => {
//     if (!plan.nextCallDate) return false;

//     // Attempt to parse nextCallDate if it's in a non-ISO format like 'January 4th, 2025'
//     let nextCallDate: Date;
//     try {
//       nextCallDate = new Date(plan.nextCallDate); // Attempt to parse automatically
//       if (isNaN(nextCallDate.getTime())) {
//         // If the date parsing fails, handle it with a custom parse
//         nextCallDate = parse(plan.nextCallDate, 'MMMM dd, yyyy', new Date());
//       }
//     } catch (error) {
//       console.error('Error parsing nextCallDate:', error);
//       return false; // If there's an issue with the date format, skip the plan
//     }

//     // Normalize the parsed nextCallDate to midnight
//     nextCallDate.setHours(0, 0, 0, 0);

//     // Debugging: Log the parsed nextCallDate for comparison
//     console.log('Parsed Next Call Due:', nextCallDate);

//     // Check if the nextCallDate matches today's date
//     return isSameDay(nextCallDate, today);
//   });

//   if (isLoading) {
//     return (
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between pb-2">
//           <CardTitle className="text-sm font-medium">
//             Today&apos;s Calls
//           </CardTitle>
//           <Phone className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent className="flex h-[200px] items-center justify-center">
//           <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between pb-2">
//         <CardTitle className="text-sm font-medium">
//           Today&apos;s Calls
//         </CardTitle>
//         <Badge variant="outline" className="bg-[#084C61] text-[#f7f7f7]">
//           {todayCalls.length} Scheduled
//         </Badge>
//       </CardHeader>
//       <CardContent>
//         {todayCalls.length === 0 ? (
//           <p className="text-center text-sm text-muted-foreground">
//             No calls scheduled for today
//           </p>
//         ) : (
//           <div className="space-y-4">
//             {todayCalls.map((call) => (
//               <div
//                 key={call.id}
//                 className="flex items-center justify-between border-b pb-2 last:border-0"
//               >
//                 <div>
//                   <p className="font-medium">
//                     {call.restaurant?.name || 'Unknown Restaurant'}
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     Last called:{' '}
//                     {call.lastCallDate
//                       ? format(new Date(call.lastCallDate), 'PP')
//                       : 'Never'}
//                   </p>
//                 </div>
//                 <Badge className="bg-[#442B1C] text-white">Due Today</Badge>
//               </div>
//             ))}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }
'use client';

import { useCallPlans } from '@/app/queries/callPlans';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { format, isSameDay, parseISO } from 'date-fns';
import { Phone, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function TodayCalls() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // Fetch call plans data
  const { data: callPlans = [], isLoading } = useCallPlans(userId || '');

  // Get today's date and normalize it to midnight for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize time to midnight

  // Debugging: Log today's date for reference

  // Filter call plans where nextCallDue is today's date
  const todayCalls = callPlans.filter((plan) => {
    if (!plan.nextCallDate) return false;

    // Parse nextCallDate as ISO string
    const nextCallDate = parseISO(plan.nextCallDate);

    // Normalize the parsed nextCallDate to midnight
    nextCallDate.setHours(0, 0, 0, 0);

    // Debugging: Log the parsed nextCallDate for comparison

    // Check if the nextCallDate matches today's date
    return isSameDay(nextCallDate, today);
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Today&apos;s Calls
          </CardTitle>
          <Phone className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="flex h-[200px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          Today&apos;s Calls
        </CardTitle>
        <Badge variant="outline" className="bg-[#084C61] text-[#f7f7f7]">
          {todayCalls.length} Scheduled
        </Badge>
      </CardHeader>
      <CardContent>
        {todayCalls.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            No calls scheduled for today
          </p>
        ) : (
          <div className="space-y-4">
            {todayCalls.map((call) => (
              <div
                key={call.id}
                className="flex items-center justify-between border-b pb-2 last:border-0"
              >
                <div>
                  <p className="font-medium">
                    {call.restaurant?.name || 'Unknown Restaurant'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Last called:{' '}
                    {call.lastCallDate
                      ? format(parseISO(call.lastCallDate), 'PP')
                      : 'Never'}
                  </p>
                </div>
                <Badge className="bg-[#442B1C] text-white">Due Today</Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
