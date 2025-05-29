'use client';

import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/molecules/Table';
import { Checkbox } from '@/components/atoms/checkbox';
import { PaymentPeriod } from '@/features/(dashboard)/types/payments.type';
import { useRouter } from 'next/navigation';
import { PaginationControls } from '../tables/PaginationControls';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

interface PaymentsTableClientProps {
  data: PaymentPeriod[];
  selectedRows: Record<string, boolean>;
  allSelected: boolean;

  handleSelectAll: (checked: boolean) => void;
  handleSelectRow: (id: string, checked: boolean) => void;
  
  // Pagination props
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  pageSize: number;
}

export function PaymentsTableClient({
  data,
  selectedRows,
  allSelected,
  handleSelectAll,
  handleSelectRow,
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}: PaymentsTableClientProps) {
  const router = useRouter();

  return (
    <div className="w-full">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead>
              <Checkbox
                className="border-olive-100"
                checked={allSelected}
                onCheckedChange={(checked) => handleSelectAll(Boolean(checked))}
                aria-label="Select all rows"
              />
            </TableHead>
            <TableHead>Period</TableHead>
            <TableHead>Total hours worked</TableHead>
            <TableHead>Total gross pay</TableHead>
            <TableHead>Total staff members</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((period) => (
            <TableRow key={period.id}>
              <TableCell>
                <Checkbox
                  className="border-olive-100"
                  checked={selectedRows[period.id] || false}
                  onCheckedChange={(checked) =>
                    handleSelectRow(period.id, Boolean(checked))
                  }
                  aria-label={`Select row ${period.id}`}
                />
              </TableCell>
              <TableCell
                onClick={() => router.push(`/payments/${period.id}`)}
                className="cursor-pointer"
              >
                Week ending in {period.periodEndDate}
              </TableCell>
              <TableCell
                onClick={() => router.push(`/payments/${period.id}`)}
                className="cursor-pointer"
              >
                {period.totalHoursWorked}
              </TableCell>
              <TableCell
                onClick={() => router.push(`/payments/${period.id}`)}
                className="cursor-pointer"
              >
                ${formatCurrency(period.totalGrossPay)}
              </TableCell>
              <TableCell
                onClick={() => router.push(`/payments/${period.id}`)}
                className="cursor-pointer"
              >
                {period.totalStaffMembers}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalItems > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          totalItems={totalItems}
          pageSize={pageSize}
        />
      )}
    </div>
  );
}
