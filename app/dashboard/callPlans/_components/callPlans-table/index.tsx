
'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { columns } from './columns';
import { CallPlan } from './columns';

interface CallPlanTableProps {
  data: CallPlan[];
  totalData: number;
}

export default function CallPlanTable({ data, totalData }: CallPlanTableProps) {
  return (
    <div className="space-y-4">
      <DataTable
        columns={columns as ColumnDef<CallPlan, unknown>[]}
        data={data}
        totalItems={totalData}
      />
    </div>
  );
}