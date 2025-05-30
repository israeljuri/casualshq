import React from 'react';
import { Button } from '@/components/molecules/Button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/molecules/Table';
import { Checkbox } from '@/components/atoms/checkbox';
import Image from 'next/image';

export function PaymentsEmptyState() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox className="border-olive-100" checked={false} />
          </TableHead>
          <TableHead>Period</TableHead>
          <TableHead>Total hours worked</TableHead>
          <TableHead>Total gross pay</TableHead>
          <TableHead>Total staff members</TableHead>
        </TableRow>
      </TableHeader>

      <TableCaption aria-label="empty">
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center h-[calc(100vh-400px)]">
          <Image
            src="/table/empty-table.svg"
            alt="Empty state"
            width={100}
            height={100}
          />

          <h2 className="text-xl font-semibold text-gray-700 my-2">
            No payments processed yet.
          </h2>
          <p className="text-gray-500 mb-6">
            Approve staff member&apos;s time information to process payments.
          </p>
          <Link href="/time">
            <Button>
              Go to Time <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </TableCaption>
    </Table>
  );
}
