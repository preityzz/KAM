
'use client';

import { useCallPlans } from '@/app/queries/callPlans';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { format, startOfDay, parseISO } from 'date-fns';
import { Phone, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';


export function TodayCalls() {
  const { data: session } = useSession();
  const userId = session?.user?.id;


  const { data: callPlans = [], isLoading } = useCallPlans(userId || '');

  
  const now = new Date();
  const todayUTC = startOfDay(now);


  const todayCalls = callPlans.filter((plan) => {
    if (!plan.nextCallDate) return false;
  
    const nextCallUTC = startOfDay(parseISO(plan.nextCallDate));
    // if (todayUTC.getTime() != nextCallUTC.getTime()) {
    //   console.log('Next Call Due:', nextCallUTC);
    //   console.log('restraunt', plan);
    // }
    return todayUTC.getTime() === nextCallUTC.getTime();
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
