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
import { Button } from '@/components/molecules/Button';
import { StaffMember, AdjustmentModalData } from '@/features/(dashboard)/types';
import { Card } from '@/components/atoms/card';
import { Skeleton } from '@/components/atoms/skeleton';

interface RecentAdjustmentsTableProps {
  staffMembers: StaffMember[];
  onOpenModal: (data: AdjustmentModalData) => void;
  onApprove: (staffId: string) => void; // Placeholder for actual approval logic
  onDeny: (staffId: string) => void; // Placeholder for actual denial logic
  isLoading: boolean;
}

export const RecentAdjustmentsTable: React.FC<RecentAdjustmentsTableProps> = ({
  staffMembers,
  onOpenModal,
  onApprove,
  onDeny,
  isLoading,
}) => {
  const adjustmentsDisplayData = staffMembers
    .filter((staff) => !!staff.latestAdjustment)
    .slice(0, 5); // Show top 5 or fewer

  if (isLoading) {
    return <Skeleton className="h-[30rem] rounded-2xl"></Skeleton>;
  }

  return (
    <section className="space-y-4">
      <h3 className="text-xl font-medium">Recent adjustment requests</h3>
      {adjustmentsDisplayData.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Overtime</TableHead>
              <TableHead className="max-w-[250px]">Reason</TableHead>
              <TableHead className=""></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adjustmentsDisplayData.map((staff) => (
              <TableRow
                key={staff.id}
                className="hover:bg-slate-50 cursor-pointer"
                onClick={() => {
                  if (staff.latestAdjustment) {
                    onOpenModal({
                      name: `${staff.firstName} ${staff.lastName}`,
                      email: staff.email,
                      date: staff.latestAdjustment.date,
                      overtime: staff.latestAdjustment.overtime,
                      reason: staff.latestAdjustment.reason,
                    });
                  }
                }}
              >
                <TableCell className="font-medium">
                  {staff.firstName} {staff.lastName}
                </TableCell>
                <TableCell>{staff.latestAdjustment?.date}</TableCell>
                <TableCell>{staff.latestAdjustment?.overtime}</TableCell>
                <TableCell
                  className="truncate max-w-[25ch]"
                  title={staff.latestAdjustment?.reason}
                >
                  {staff.latestAdjustment?.reason}
                </TableCell>
                <TableCell className="">
                  <div className="flex items-center justify-between gap-4">
                    <Button
                      variant="secondary"
                      size="md"
                      className="text-xs h-auto py-1 px-2 text-green-600 border-green-500 hover:bg-green-50 hover:text-green-700"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click
                        onApprove(staff.id);
                      }}
                      leftIcon={
                        <img src="/admin-dashboard/green-check.svg" alt="" />
                      }
                    >
                      Approve
                    </Button>
                    <Button
                      variant="secondary"
                      size="md"
                      className="text-xs h-auto py-1 px-2 text-red-600 border-red-500 hover:bg-red-50 hover:text-red-700"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click
                        onDeny(staff.id);
                      }}
                      leftIcon={
                        <img src="/admin-dashboard/red-close.svg" alt="" />
                      }
                    >
                      Deny
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Card className="shadow-none border-olive-100 p-6 text-center min-h-[30rem] flex flex-col items-center justify-center">
          <img src="/table/empty-table.svg" />
          <p className="font-medium">No metrics available yet.</p>
        </Card>
      )}
    </section>
  );
};
