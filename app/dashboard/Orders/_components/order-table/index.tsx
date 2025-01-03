'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { columns, Order } from './columns';

interface OrderTableProps {
  data: Order[];
  totalData: number;
}

export default function OrderTable({ data, totalData }: OrderTableProps) {
  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}
