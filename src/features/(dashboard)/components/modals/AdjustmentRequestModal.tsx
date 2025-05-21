'use client';
import React, { useState } from 'react';
import { Button } from '@/components/molecules/Button';
import { AdjustmentModalData } from '@/features/(dashboard)/types';
import { format } from 'date-fns';
import Image from 'next/image';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';

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
      <section className="h-screen">
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 w-full h-full flex items-center justify-end bg-black/30 transition-opacity duration-300 ease-in-out p-4"
        ></div>
        <div className="z-50 absolute top-0 right-0 bg-white h-[95%] my-5 mr-5 w-full max-w-xl shadow-xl flex flex-col rounded-xl overflow-hidden">
          {/* Header */}
          <div className="p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-medium text-slate-800">
                Adjustment Request
              </h2>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
                aria-label="Close modal"
              >
                <Image
                  width={15}
                  height={15}
                  src="/admin-dashboard/close-icon.svg"
                  alt="Close icon"
                />
              </button>
            </div>
          </div>

          {/* Content */}
          <ul className="p-6 space-y-5 overflow-y-auto flex-grow">
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

          {/* Footer / Actions */}
          <div className="p-6 border-t bg-slate-50">
            <div className="grid grid-cols-2 gap-3">
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
            </div>
          </div>
        </div>
      </section>
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
