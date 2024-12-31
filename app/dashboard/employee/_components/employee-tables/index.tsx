'use client';
import { DataTable } from '@/components/ui/table/data-table';
import { columns } from '../employee-tables/columns';
import { RestaurantLead } from '@/types/restaurant-type';

export default function EmployeeTable({
  data,
  totalData
}: {
  data: RestaurantLead[];
  totalData: number;
}) {
  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}
