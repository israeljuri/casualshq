'use client';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/molecules/Table';
import { Button } from '@/components/molecules/Button';
import { AdjustmentModalData } from '@/features/(dashboard)/types/dashboard.type';

import Image from 'next/image';
import { format } from 'date-fns';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';
import { AdjustmentRequestModal } from '@/features/(dashboard)/components/modals/AdjustmentRequestModal';
import { getAdjustmentsMockData } from '@/lib/mockData';
import { PaginationControls } from '../tables/PaginationControls';

export const AdjustmentsRequestTab = () => {
  const [adjustmentPage, setAdjustmentPage] = useState(1);
  const adjustmentPageSize = 2; // Show 2 items per page as requested

  const [isConfirmOpen, setIsConfirmOpen] = useState<'approve' | 'deny' | null>(
    null
  );
  const [modalData, setModalData] = useState<AdjustmentModalData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get mock data
  const { data: adjustments } = getAdjustmentsMockData();

  // Pagination
  const totalItems = adjustments.length;
  const totalPages = Math.ceil(totalItems / adjustmentPageSize);
  const startIndex = (adjustmentPage - 1) * adjustmentPageSize;
  const endIndex = Math.min(startIndex + adjustmentPageSize, totalItems);
  const paginatedAdjustments = adjustments.slice(startIndex, endIndex);

  const handleApproveAction = () => {
    setIsConfirmOpen('approve');
  };

  const handleDenyAction = () => {
    setIsConfirmOpen('deny');
  };

  const handleApprove = () => {
    setIsConfirmOpen(null);
  };

  const handleDeny = () => {
    setIsConfirmOpen(null);
  };

  const handleCancel = () => {
    setIsConfirmOpen(null);
  };

  const handleOpenModal = (data: AdjustmentModalData) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const handleModalApprove = (data: AdjustmentModalData) => {
    // Find the staff ID associated with this data
    const adjustment = adjustments.find(
      (item) => item.staffName === data.name && item.email === data.email
    );
    if (adjustment) {
      console.log(adjustment);
    }
    setIsModalOpen(false);
  };

  const handleModalDeny = (data: AdjustmentModalData) => {
    // Find the staff ID associated with this data
    const adjustment = adjustments.find(
      (item) => item.staffName === data.name && item.email === data.email
    );
    if (adjustment) {
      console.log(adjustment);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <AdjustmentRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={modalData}
        onApprove={handleModalApprove}
        onDeny={handleModalDeny}
      />

      <ConfirmDialog
        open={!!isConfirmOpen}
        onOpenChange={(open) => setIsConfirmOpen(open ? 'approve' : 'deny')}
        content={
          <article className="p-5 bg-white rounded-2xl">
            <article className="space-y-3">
              <h4 className="font-medium text-2xl text-black">
                {isConfirmOpen === 'approve' ? 'Approve' : 'Deny'}
              </h4>
              <p className="text-base text-custom-gray">
                {isConfirmOpen === 'approve'
                  ? 'Are you sure you want to approve this adjustment request?'
                  : 'Are you sure you want to deny this adjustment request?'}
              </p>
            </article>
            <div className="grid grid-cols-2 gap-4 w-full mt-4">
              <Button
                variant="secondary"
                size="md"
                onClick={handleCancel}
                className="w-full"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={
                  isConfirmOpen === 'approve' ? handleApprove : handleDeny
                }
              >
                {isConfirmOpen === 'approve' ? 'Approve' : 'Deny'}
              </Button>
            </div>
          </article>
        }
      />

      {paginatedAdjustments.length > 0 ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Overtime</TableHead>
                <TableHead className="">Reason</TableHead>
                <TableHead className=""></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAdjustments.map((item) => (
                <TableRow key={item.id} className="hover:bg-slate-50">
                  <TableCell
                    onClick={() => {
                      handleOpenModal({
                        name: item.staffName,
                        email: item.email,
                        date: item.date,
                        overtime: item.overtime,
                        reason: item.reason,
                      });
                    }}
                    className="font-medium cursor-pointer"
                  >
                    {item.staffName}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      handleOpenModal({
                        name: item.staffName,
                        email: item.email,
                        date: item.date,
                        overtime: item.overtime,
                        reason: item.reason,
                      });
                    }}
                    className="cursor-pointer"
                  >
                    {format(new Date(item.date), 'PP')}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      handleOpenModal({
                        name: item.staffName,
                        email: item.email,
                        date: item.date,
                        overtime: item.overtime,
                        reason: item.reason,
                      });
                    }}
                    className="cursor-pointer"
                  >
                    {item.overtime}
                  </TableCell>

                  <TableCell
                    onClick={() => {
                      handleOpenModal({
                        name: item.staffName,
                        email: item.email,
                        date: item.date,
                        overtime: item.overtime,
                        reason: item.reason,
                      });
                    }}
                    className="cursor-pointer max-w-[25ch] truncate ..."
                    title={item.reason}
                  >
                    {item.reason}
                  </TableCell>
                  <TableCell className="flex items-center justify-between">
                    <Button
                      variant="secondary"
                      className="text-green-800"
                      size="md"
                      onClick={handleApproveAction}
                      leftIcon={
                        <Image
                          width={15}
                          height={15}
                          alt="Approve"
                          src="/admin-dashboard/green-check.svg"
                        />
                      }
                    >
                      Approve
                    </Button>
                    <Button
                      size="md"
                      variant="secondary"
                      className="text-red-800"
                      onClick={handleDenyAction}
                      leftIcon={
                        <Image
                          width={10}
                          height={10}
                          alt="Deny"
                          src="/admin-dashboard/red-close.svg"
                        />
                      }
                    >
                      Deny
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <PaginationControls
              totalPages={totalPages}
              currentPage={adjustmentPage}
              onPageChange={setAdjustmentPage}
              totalItems={totalItems}
              pageSize={adjustmentPageSize}
            />
          )}
        </>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Overtime</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead></TableHead>
            </TableRow>
            <TableCaption aria-label="empty" className="py-10 text-base">
              <div className="flex flex-col items-center justify-center h-[calc(100vh-400px)] text-center ">
                <Image
                  src="/table/empty-table.svg"
                  alt="No adjustment requests available yet."
                  width={90}
                  height={90}
                />

                <p className="font-medium mt-6 mb-1.5 text-lg text-black">
                  No adjustment requests available yet.
                </p>
              </div>
            </TableCaption>
          </TableHeader>
        </Table>
      )}
    </>
  );
};
