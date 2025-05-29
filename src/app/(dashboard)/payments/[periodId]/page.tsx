'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/molecules/Button';
import { PaymentPeriodDetailsClient } from '@/features/(dashboard)/components/payments/PeriodDetailsClient';
import { getPaymentPeriodById } from '@/features/(dashboard)/lib/payments.mockdata';
import { notFound } from 'next/navigation';
import { Sidebar } from '@/features/(dashboard)/components/Sidebar';
import { EmptyStatePaymentDetails } from '@/features/(dashboard)/components/payments/EmptyStatePaymentDetails';
import { StaffPaymentSummary } from '@/features/(dashboard)/types/payments.type';

interface PaymentPeriodDetailPageProps {
  params: { periodId: string };
}

function PaymentPeriodDetails({ periodId }: { periodId: string }) {
  const paymentPeriodDetails = getPaymentPeriodById(periodId); // In real app: await fetchPaymentPeriodDetails(periodId);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Pagination state
  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [paginatedStaffPayments, setPaginatedStaffPayments] = useState<
    StaffPaymentSummary[]
  >([]);

  // Pagination function
  const paginateData = (page: number) => {
    if (!paymentPeriodDetails) return;
    if (!paymentPeriodDetails.staffPayments) return;

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedItems = paymentPeriodDetails.staffPayments.slice(start, end);

    setPaginatedStaffPayments(paginatedItems);
    setTotalPages(
      Math.ceil(paymentPeriodDetails.staffPayments.length / pageSize)
    );
    setTotalItems(paymentPeriodDetails.staffPayments.length);
  };

  // Fetch paginated data when currentPage changes
  useEffect(() => {
    paginateData(currentPage);
  }, [currentPage]);

  if (!paymentPeriodDetails) {
    return notFound(); // Or some other error handling
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activePath={'/payments'}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/payments" className="-ml-4">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Payments
            </Button>
          </Link>
          <h1 className="text-2xl font-medium">
            Week ending in {paymentPeriodDetails.periodEndDate}
          </h1>
          {/* You can add more summary details here if needed, like total pay for this period etc. */}
        </div>

        {paymentPeriodDetails.staffPayments &&
        paymentPeriodDetails.staffPayments.length > 0 ? (
          <PaymentPeriodDetailsClient
            staffPayments={paginatedStaffPayments}
            periodId={periodId}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
            totalItems={totalItems}
            pageSize={pageSize}
          />
        ) : (
          <EmptyStatePaymentDetails />
        )}
      </div>
    </div>
  );
}

export default function PaymentPeriodDetailPage({
  params,
}: PaymentPeriodDetailPageProps) {
  // Extract periodId from params
  const { periodId } = params;
  // Return the details component with the extracted periodId
  return <PaymentPeriodDetails periodId={periodId} />;
}
