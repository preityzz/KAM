'use client';

import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useInteractions } from '@/app/queries/interaction';
import { Loader } from 'lucide-react';
import InteractionTable from './table';
import { redirect } from 'next/navigation';
import { Interaction } from '@/types/interaction-type';

export default function InteractionListingPage() {
  const { data: rawInteractions, isLoading, error } = useInteractions();

  const interactions: Interaction[] =
    rawInteractions?.map((interaction) => ({
      ...interaction,
      restaurantName: interaction.restaurant?.name || 'Unknown Restaurant'
    })) || [];

  const totalInteractions = interactions.length;

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
          Error loading interactions
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <Heading
          title={`Interactions (${totalInteractions})`}
          description="View restaurant interactions"
        />
        <Separator />
        <InteractionTable data={interactions} totalData={totalInteractions} />
      </div>
    </PageContainer>
  );
}
