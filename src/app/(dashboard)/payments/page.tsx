'use client';

import { PaymentsTableClient } from '@/features/(dashboard)/components/payments/TableClient';
import { PaymentsEmptyState } from '@/features/(dashboard)/components/payments/EmptyState';
import { paymentPeriodsMockData } from '@/features/(dashboard)/lib/payments.mockdata';
import { Sidebar } from '@/features/(dashboard)/components/Sidebar';
import { Header } from '@/features/(dashboard)/components/Header';
import { useState, useEffect } from 'react';
import { Button } from '@/components/molecules/Button';
 
import Image from 'next/image';

export default function PaymentsPage() {
  const pageTitle = 'Payments';
  const pageDescription = 'View payment histories and export reports.';

  //   const fetchedPaymentPeriods = [];
  const allPaymentPeriods = paymentPeriodsMockData;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  
  // Pagination state
  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [paginatedData, setPaginatedData] = useState<typeof paymentPeriodsMockData>([]);

  const numSelected = Object.values(selectedRows).filter(Boolean).length;
  const allSelected =
    numSelected === paginatedData.length &&
    paginatedData.length > 0;

  const handleSelectAll = (checked: boolean) => {
    const newSelectedRows: Record<string, boolean> = {};
    if (checked) {
      paginatedData.forEach(
        (period) => (newSelectedRows[period.id] = true)
      );
    }
    setSelectedRows(newSelectedRows);
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelectedRows((prev) => ({ ...prev, [id]: checked }));
  };

  const handleExport = () => {
    // TODO: export selected payments as CSV
    console.log('Exporting payments for selected rows:', numSelected);
  };

  const handleApprovePayments = () => {
    // TODO: Implement actual approval logic here
    console.log('Approving payments for selected rows:', numSelected);
  };
  
  // Pagination function
  const paginateData = (page: number) => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedItems = allPaymentPeriods.slice(start, end);
    
    setPaginatedData(paginatedItems);
    setTotalPages(Math.ceil(allPaymentPeriods.length / pageSize));
    setTotalItems(allPaymentPeriods.length);
  };
  
  // Fetch paginated data when currentPage changes
  useEffect(() => {
    paginateData(currentPage);
  }, [currentPage]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activePath={'/payments'}
      />
      <main className="flex-1 flex flex-col overflow-y-auto">
        <Header
          pageTitle={pageTitle}
          pageDescription={pageDescription}
          onSidebarOpen={() => setIsSidebarOpen(true)}
          showDatePicker={false}
          showFilter={false}
          showSearch={false}
          // Custom action buttons for Staff page
          customActions={
            <>
              {numSelected > 0 && (
                <div className="flex justify-end items-center mb-4 space-x-2">
                  <Button
                    variant="secondary"
                    onClick={handleExport}
                    leftIcon={
                      <Image
                        src="/admin-payments/export-black.svg"
                        alt="Export icon"
                        width={20}
                        height={20}
                      />
                    }
                  >
                    Export ({numSelected})
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleApprovePayments}
                    leftIcon={
                      <Image
                        src="/admin-payments/check-white.svg"
                        alt="Approve icon"
                        width={20}
                        height={20}
                      />
                    }
                  >
                    Approve payments ({numSelected})
                  </Button>
                </div>
              )}
            </>
          }
        />

        <section className="container mx-auto">
          <div className="px-4 sm:px-6 lg:px-8">
            {paginatedData && paginatedData.length > 0 ? (
              <PaymentsTableClient
                handleSelectAll={handleSelectAll}
                handleSelectRow={handleSelectRow}
                selectedRows={selectedRows}
                allSelected={allSelected}
                data={paginatedData}
                
                // Pagination props
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
                totalItems={totalItems}
                pageSize={pageSize}
              />
            ) : (
              <PaymentsEmptyState />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
