'use client';

import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useInteractions } from '@/app/queries/interaction';
import { Loader } from 'lucide-react';
import InteractionTable from './interaction-table';

export default function InteractionListingPage() {
  const { data: interactions, isLoading } = useInteractions();

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex min-h-screen items-center justify-center">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <Heading
          title={`Interactions (${interactions?.length || 0})`}
          description="View restaurant interactions"
        />
        <Separator />
        <InteractionTable data={interactions || []} totalData={interactions?.length || 0} />
      </div>
    </PageContainer>
  );
}
