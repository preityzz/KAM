'use client';

import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useCallPlans } from '@/app/queries/callPlans';
import { Loader } from 'lucide-react';
import CallPlanTable from './callPlans-table';
import { CallPlan } from './callPlans-table/columns';
import { useSession } from 'next-auth/react';

export default function CallPlanListingPage() {
  const { data: session } = useSession();
  const { data: callPlansData, isLoading } = useCallPlans(
    session?.user?.id as string
  );

  const formattedCallPlans: CallPlan[] =
    callPlansData?.map((plan) => ({
      id: plan.id,
      restaurant: {
        name: plan.restaurant?.name || 'N/A'
      },
      frequency: plan.frequency || 7,
      lastCallDate: plan.lastCallDate,
      nextCallDate: plan.nextCallDate
    })) || [];

  const totalCallPlans = formattedCallPlans.length;

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex min-h-screen items-center justify-center">
          <Loader className="h-8 w-8 animate-spin text-[#084C61]" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Call Plans (${totalCallPlans})`}
            description="View all restaurant call plans and their schedules"
          />
        </div>
        <Separator />
        <CallPlanTable data={formattedCallPlans} totalData={totalCallPlans} />
      </div>
    </PageContainer>
  );
}
