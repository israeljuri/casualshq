import React from 'react';
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/molecules/Table';

import Image from 'next/image';

export function EmptyStatePaymentDetails() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Total hours worked</TableHead>
          <TableHead>Total gross pay</TableHead>
        </TableRow>
      </TableHeader>

      <TableCaption aria-label="empty">
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center min-h-[30rem]">
          <Image
            src="/table/empty-table.svg"
            alt="Empty state"
            width={100}
            height={100}
          />

          <h2 className="text-xl font-semibold text-gray-700 my-2">
            No payments processed yet.
          </h2>
        </div>
      </TableCaption>
    </Table>
  );
}
