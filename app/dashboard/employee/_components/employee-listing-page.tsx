'use client';
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import EmployeeTable from './employee-tables';
import { useRestaurants } from '@/app/queries/restaurants';
import { RestaurantLead } from '@/types/restaurant-type';

type TEmployeeListingPage = {};

export default function EmployeeListingPage({}: TEmployeeListingPage) {
  const { data: leads } = useRestaurants();

  const totalUsers = leads?.length || 0;
  const restraunts: RestaurantLead[] = leads || [];

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Employee (${totalUsers})`}
            description="Manage employees (Server side table functionalities.)"
          />

          <Link
            href={'/dashboard/employee/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <EmployeeTable data={restraunts} totalData={totalUsers} />
      </div>
    </PageContainer>
  );
}
