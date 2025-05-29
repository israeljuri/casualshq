'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/molecules/Table';

import {
  StaffPaymentSummary,
  StaffPaymentDetail,
} from '@/features/(dashboard)/types/payments.type';
import { StaffPaymentDetailModal } from './DetailsModal';
import { getStaffPaymentDetail } from '@/features/(dashboard)/lib/payments.mockdata'; // Using the new mock data file
import { PaginationControls } from '../tables/PaginationControls';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

interface PaymentPeriodDetailsClientProps {
  staffPayments: StaffPaymentSummary[];
  periodId: string; // To help fetch specific staff detail
  
  // Pagination props
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  pageSize: number;
}

export function PaymentPeriodDetailsClient({
  staffPayments,
  periodId,
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}: PaymentPeriodDetailsClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaffPayment, setSelectedStaffPayment] =
    useState<StaffPaymentDetail | null>(null);

  const handleRowClick = (staffId: string) => {
    const detail = getStaffPaymentDetail(staffId, periodId); // Fetch/mock detail
    if (detail) {
      setSelectedStaffPayment(detail);
      setIsModalOpen(true);
    } else {
      console.error('Could not load staff payment details for', staffId);
      // Optionally show an error to the user
    }
  };

  return (
    <>
      <div>
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Total hours worked</TableHead>
              <TableHead> Total gross pay</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffPayments.map((staff) => (
              <TableRow className='cursor-pointer' onClick={() => handleRowClick(staff.id)} key={staff.id}>
                <TableCell>{staff.name}</TableCell>
                <TableCell>{staff.totalHoursWorked}</TableCell>
                <TableCell>{formatCurrency(staff.totalGrossPay)}</TableCell>
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

      <StaffPaymentDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        paymentDetail={selectedStaffPayment}
      />
    </>
  );
}
