'use client';
import { RestaurantLead } from '@/types/restaurant-type';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

// Define columns for RestaurantLead
export const columns: ColumnDef<RestaurantLead>[] = [
  {
    accessorKey: 'name',
    header: 'Restaurant Name'
  },
  {
    accessorKey: 'address',
    header: 'Address'
  },
  {
    accessorKey: 'phone',
    header: 'Phone Number'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <span
        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium 
        ${
          row.original.status === 'active'
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        {row.getValue('status')}
      </span>
    )
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const selectedRestaurant = row.original;

      const handleAction = () => {
        const filteredData = {
          id: selectedRestaurant.id,
          name: selectedRestaurant.name,
          address: selectedRestaurant.address,
          phone: selectedRestaurant.phone,
          status: selectedRestaurant.status,
          email: selectedRestaurant.email,
          assignedKAM: selectedRestaurant.assignedKAM,
          contacts: selectedRestaurant.contacts
        };
        return <CellAction data={filteredData} />;
      };

      return (
        <div onClick={handleAction}>
          <CellAction data={selectedRestaurant} />
        </div>
      );
    }
  }
];
