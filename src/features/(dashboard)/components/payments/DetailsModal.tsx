'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/atoms/dialog';
import { Button } from '@/components/molecules/Button';
import { StaffPaymentDetail } from '@/features/(dashboard)/types/payments.type';
import { Badge } from '@/components/atoms/badge'; // Assuming you have a Badge component
import Image from 'next/image';
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from '@/components/molecules/Table';
import { convertPaymentDetailToCSV } from '@/lib/convertToCSV';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

interface StaffPaymentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentDetail: StaffPaymentDetail | null;
}

const StatusBadge: React.FC<{ status: StaffPaymentDetail['status'] }> = ({
  status,
}) => {
  switch (status) {
    case 'Approved':
      return (
        <Badge className="bg-green-100 text-green-700 text-md rounded-full px-4">
          Approved
        </Badge>
      );
    case 'Pending':
      return (
        <Badge className="bg-yellow-100 text-yellow-700 text-md rounded-full px-4">
          Pending
        </Badge>
      );
    case 'Rejected':
      return (
        <Badge variant="destructive" className="text-md rounded-full px-4">
          Rejected
        </Badge>
      );
    case 'Issue':
      return (
        <Badge
          variant="destructive"
          className="bg-red-100 text-red-700 text-md rounded-full px-4"
        >
          Issue
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
};

export function StaffPaymentDetailModal({
  isOpen,
  onClose,
  paymentDetail,
}: StaffPaymentDetailModalProps) {
  if (!paymentDetail) return null;

  const handleExportReport = () => {
    const csvString = convertPaymentDetailToCSV(paymentDetail);

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${paymentDetail.name}-payment-report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex flex-col justify-stretch w-full items-start sm:max-w-2xl bg-white p-4 h-[calc(100vh-50px)]">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">
            Staff payment details
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6 flex-grow overflow-y-auto">
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 text-sm">
            <InfoItem
              label="Name"
              value={paymentDetail.name}
              image="/admin-payments/name.svg"
            />
            <InfoItem
              label="Email address"
              value={paymentDetail.emailAddress}
              image="/admin-payments/email.svg"
            />
            <InfoItem
              label="Role"
              value={paymentDetail.role}
              image="/admin-payments/role.svg"
            />
            <InfoItem
              label="Team"
              value={paymentDetail.team}
              image="/admin-payments/team.svg"
            />
            <InfoItem
              label="Status"
              value={null}
              others={<StatusBadge status={paymentDetail.status} />}
              image="/admin-payments/clock.svg"
            />
            <InfoItem
              label="Wage"
              value={paymentDetail.wage}
              image="/admin-payments/wage.svg"
            />
            <InfoItem
              label="Pay frequency"
              value={paymentDetail.payFrequency}
              image="/admin-payments/frequency.svg"
            />
            <InfoItem
              label="Staff type"
              value={paymentDetail.staffType}
              image="/admin-payments/staff-type.svg"
            />
          </div>

          {/* Payment History Section */}
          {paymentDetail.paymentHistory &&
            paymentDetail.paymentHistory.length > 0 && (
              <div>
                <h3 className="text-md font-semibold text-gray-700 mb-3 pt-4 border-t">
                  Payment History
                </h3>
                <div className="rounded-md overflow-hidden">
                  <Table className="w-max">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Period</TableHead>
                        <TableHead>Total hours worked</TableHead>
                        <TableHead>Total gross pay</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentDetail.paymentHistory.map(
                        (historyItem, index) => (
                          <TableRow key={index}>
                            <TableCell>{historyItem.period}</TableCell>
                            <TableCell>
                              {historyItem.totalHoursWorked}
                            </TableCell>
                            <TableCell>
                              ${formatCurrency(historyItem.totalGrossPay)}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
        </div>

        <DialogFooter className="flex w-full">
          <Button
            onClick={handleExportReport}
            className="w-full"
            leftIcon={
              <Image
                src="/admin-payments/Export.svg"
                alt=""
                width={20}
                height={20}
              />
            }
          >
            Export report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface InfoItemProps {
  label: string;
  value: string | number | React.ReactNode;
  image: string;
  others?: React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value, image, others }) => (
  <li className="grid grid-cols-[1.5fr_2fr] gap-4 items-start">
    <span className="flex items-center gap-2">
      {image && <Image src={image} alt="" width={22} height={22} />}
      <span className="text-[#98A2B3]">{label}</span>
    </span>
    <div className="flex items-center justify-start">
      <span>{value}</span>
      {others}
    </div>
  </li>
);
