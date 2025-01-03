
'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { columns } from './columns';
import { Interaction } from '@/types/interaction-type';

interface InteractionTableProps {
  data: Interaction[];
  totalData: number;
}

export default function InteractionTable({
  data,
  totalData
}: InteractionTableProps) {
  return (
    <div className="space-y-4">
      <DataTable
        columns={columns as ColumnDef<Interaction, unknown>[]}
        data={data}
        totalItems={totalData}
      />
    </div>
  );
}
