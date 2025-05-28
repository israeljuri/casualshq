'use client';
import React, { useState } from 'react';
import { Button } from '@/components/molecules/Button';
import { AdjustmentModalData } from '@/features/(dashboard)/types/dashboard.type';
import { format } from 'date-fns';
import Image from 'next/image';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/atoms/dialog';

interface AdjustmentRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AdjustmentModalData | null;
  onApprove: (data: AdjustmentModalData) => void; // Placeholder
  onDeny: (data: AdjustmentModalData) => void; // Placeholder
}

export const AdjustmentRequestModal: React.FC<AdjustmentRequestModalProps> = ({
  isOpen,
  onClose,
  data,
  onApprove,
  onDeny,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState<'approve' | 'deny' | null>(
    null
  );

  if (!isOpen || !data) return null;
  const handleApproveAction = () => {
    setIsConfirmOpen('approve');
  };

  const handleDenyAction = () => {
    setIsConfirmOpen('deny');
  };

  const handleApprove = () => {
    setIsConfirmOpen(null);
    onApprove(data);
  };

  const handleDeny = () => {
    setIsConfirmOpen(null);
    onDeny(data);
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

      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-lg bg-white p-4 flex flex-col items-stretch justify-stretch h-[calc(100vh-50px)]">
          <DialogHeader className="px-4 pt-4">
            <DialogTitle className="text-2xl font-medium text-slate-800">
              Adjustment Request
            </DialogTitle>
          </DialogHeader>

          {/* Content */}
          <ul className="px-4 py-6 space-y-5 overflow-y-auto flex-grow">
            <InfoItem
              label="Name"
              value={data.name}
              image="/adjustment-request/name.svg"
            />
            <InfoItem
              label="Email address"
              value={data.email}
              image="/adjustment-request/email.svg"
            />
            <InfoItem
              label="Date"
              value={format(data.date, 'PP')}
              image="/adjustment-request/calendar.svg"
            />
            <InfoItem
              label="Overtime"
              value={data.overtime}
              image="/adjustment-request/overtime.svg"
            />
            <InfoItem
              label="Reason for request"
              value={data.reason}
              image="/adjustment-request/reason.svg"
            />
          </ul>

          <DialogFooter className="grid grid-cols-2 px-6 py-4">
            <Button
              variant="secondary"
              className="w-full border-red-900 text-red-900"
              onClick={handleDenyAction}
              leftIcon={
                <img
                  src="/admin-dashboard/red-close-circle.svg"
                  alt="Close icon"
                />
              }
            >
              Deny
            </Button>
            <Button
              variant="primary" // Primary action
              // className="w-full bg-slate-800 hover:bg-slate-700 text-white"
              onClick={handleApproveAction}
              leftIcon={
                <img
                  src="/admin-dashboard/white-check-circle.svg"
                  alt="Close icon"
                />
              }
            >
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

interface InfoItemProps {
  label: string;
  value: string;
  image: string;
}
const InfoItem: React.FC<InfoItemProps> = ({ label, value, image }) => (
  <li className="grid grid-cols-[1.5fr_2fr] items-start">
    <span className="flex items-center gap-2">
      <Image src={image} alt="" width={22} height={22} />
      <span className="text-[#98A2B3]">{label}</span>
    </span>
    <span>{value}</span>
  </li>
);
