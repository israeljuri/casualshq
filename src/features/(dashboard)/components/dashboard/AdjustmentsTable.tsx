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
import { Button } from '@/components/molecules/Button';
import { AdjustmentModalData } from '@/features/(dashboard)/types';
import { Card } from '@/components/atoms/card';
import { Skeleton } from '@/components/atoms/skeleton';
import Image from 'next/image';
import { format } from 'date-fns';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';

// Define the structure of an adjustment item
interface AdjustmentItem {
  id: string;
  staffId: string;
  staffName: string;
  date: string;
  overtime: string;
  reason: string;
  email: string;
}

interface AdjustmentsTableProps {
  adjustments: AdjustmentItem[];
  onOpenModal: (data: AdjustmentModalData) => void;
  onApprove: (staffId: string) => void;
  onDeny: (staffId: string) => void;
  isLoading: boolean;
}

export const AdjustmentsTable: React.FC<AdjustmentsTableProps> = ({
  adjustments,
  onOpenModal,
  onApprove,
  onDeny,
  isLoading,
}) => {
  
  const [staffId, setStaffId] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState<'approve' | 'deny' | null>(
    null
  );
  if (isLoading) {
    return <Skeleton className="h-[30rem] rounded-2xl"></Skeleton>;
  }

  const handleApproveAction = () => {
    setIsConfirmOpen('approve');
  };

  const handleDenyAction = () => {
    setIsConfirmOpen('deny');
  };

  const handleApprove = () => {
    setIsConfirmOpen(null);
    onApprove(staffId!);
  };

  const handleDeny = () => {
    setIsConfirmOpen(null);
    onDeny(staffId!);
  };

  const handleCancel = () => {
    setIsConfirmOpen(null);
  };

  return (
    <>
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
      <section className="space-y-4">
        <h3 className="text-xl font-medium">Recent adjustment requests</h3>
        {adjustments.length > 0 ? (
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
              {adjustments.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-slate-50"
                >
                  <TableCell
                    onClick={() => {
                      onOpenModal({
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
                  <TableCell>{format(item.date, 'PP')}</TableCell>
                  <TableCell>{item.overtime}</TableCell>

                  <TableCell
                    className="max-w-[25ch] truncate ..."
                    title={item.reason}
                  >
                    {item.reason}
                  </TableCell>
                  <TableCell className="flex items-center justify-between">
                    <Button
                      variant="secondary"
                      className="text-green-800"
                      size="md"
                      onClick={() => {
                        setStaffId(item.staffId);
                        handleApproveAction();
                      }}
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
                      onClick={() => {
                        setStaffId(item.staffId);
                        handleDenyAction();
                      }}
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
        ) : (
          <Card className="shadow-none border-olive-100 p-6 text-center min-h-[30rem] flex flex-col items-center justify-center">
            <img src="/table/empty-table.svg" alt="No data" />
            <p className="font-medium">No adjustment requests available yet.</p>
          </Card>
        )}
      </section>
    </>
  );
};
