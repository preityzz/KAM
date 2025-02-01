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

import { useSession } from 'next-auth/react';
import RestaurantLeadTable from '.';
import { useMemo } from 'react';

export default function RestaurantLeadListingPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { data: rawLeads, isLoading, error } = useRestaurants({ userId });

  const restaurants = useMemo(() => {
    return (
      rawLeads?.map((lead) => ({
        ...lead,
        email: (lead as any).email || '',
        contacts: (lead as any).contacts || [],
        assignedKAM: (lead as any).assignedKAM || ''
      })) || []
    );
  }, [rawLeads]);

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex min-h-screen items-center justify-center">
          <Loader className="h-8 w-8 animate-spin text-[#084C61]" />
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

  const totalLeads = restaurants.length;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Restaurant Leads (${totalLeads})`}
            description="Manage restaurant leads and track their status"
          />
          <Link href="/dashboard/restaurantLeads/addlead">
            <Button
              variant="default"
              className={cn(buttonVariants({ variant: 'default' }))}
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
