'use client';
import { DataTable } from '@/components/ui/table/data-table';
import { columns } from './columns';
import { RestaurantLead } from '@/types/restaurant-type';

interface RestaurantLeadTableProps {
  data: RestaurantLead[];
  totalData: number;
}

export default function RestaurantLeadTable({
  data,
  totalData
}: RestaurantLeadTableProps) {
 
  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}
