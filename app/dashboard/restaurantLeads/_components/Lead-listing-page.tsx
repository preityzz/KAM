'use client';

import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Plus, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRestaurants } from '@/app/queries/restaurants';
import { RestaurantLead } from '@/types/restaurant-type';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import RestaurantLeadTable from './table';

export default function RestaurantLeadListingPage() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const { data: rawLeads, isLoading, error } = useRestaurants(userId);

  if (status === 'unauthenticated') {
    redirect('/signin');
  }

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex min-h-screen items-center justify-center">
          <Loader className="h-8 w-8 animate-spin  text-[#084C61]" />
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <div className="flex min-h-screen items-center justify-center text-destructive">
          Error loading data
        </div>
      </PageContainer>
    );
  }

  const restaurants: RestaurantLead[] =
    rawLeads?.map((lead) => ({
      ...lead,
      email: (lead as any).email || '',
      contacts: (lead as any).contacts || [],
      assignedKAM: (lead as any).assignedKAM || ''
    })) || [];

  const totalLeads = restaurants.length;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Restaurant Leads (${totalLeads})`}
            description="Manage restaurant leads and track their status"
          />
          <Link
            href="/dashboard/restaurantLeads/new"
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Button
              variant="default"
              className="bg-[#084C61] text-white transition-colors hover:bg-[#084C61]/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Lead
            </Button>
          </Link>
        </div>
        <Separator />
        <RestaurantLeadTable data={restaurants} totalData={totalLeads} />
      </div>
    </PageContainer>
  );
}
