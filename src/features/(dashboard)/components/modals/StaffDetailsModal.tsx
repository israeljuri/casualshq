'use client';

import React, { useState } from 'react';
import { Staff } from '@/features/(dashboard)/types/staff.type';
import { Button } from '@/components/molecules/Button';

import Image from 'next/image';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';
import { Dialog, DialogContent, DialogTitle } from '@/components/atoms/dialog';
import { DialogFooter, DialogHeader } from '@/components/atoms/dialog';
import { Status } from '@/components/molecules/Status';
import { getStaffTimeSummary } from '../../lib/utils';
import WageCard from '@/components/molecules/WageCard';

interface StaffDetailsModalProps {
  staffMember: Staff | null;
  onClose: () => void;
  onDelete: (staffId: string) => void;
  onEdit: (staffId: string) => void;
  isOpen: boolean;
}

export const StaffDetailsModal: React.FC<StaffDetailsModalProps> = ({
  staffMember,
  onClose,
  onDelete,
  onEdit,
  isOpen,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  if (!staffMember) return null;

  const handleDelete = () => {
    if (staffMember.id) onDelete(staffMember.id);
    onClose();
  };

  const handleApproveAction = () => {
    setIsConfirmOpen(true);
  };

  const handleApprove = () => {
    setIsConfirmOpen(false);
    handleDelete();
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
  };

  const getWage = (staffMember: Staff): string | number => {
    if (staffMember.wageType === 'manual') {
      if (staffMember.manualRatePerHour)
        return `$${staffMember.manualRatePerHour}/hr`;
      return 'N/A';
    } else if (staffMember.wageType === 'team_based') {
      if (staffMember.wageType === "team_based") return `$${staffMember.teamBasedRatePerHour}/hr`;
      return 'N/A';
    } else if (staffMember.wageType === 'award_rate') {
      if (staffMember.wageType === "award_rate") return `$${staffMember.awardBasedRatePerHour}/hr`;
      return 'N/A';
    }
    return 'N/A';
  };

  const staffTimeSummary = getStaffTimeSummary(staffMember);

  return (
    <>
      <ConfirmDialog
        open={!!isConfirmOpen}
        onOpenChange={(open) => setIsConfirmOpen(open)}
        content={
          <article className="p-5 bg-white rounded-2xl">
            <article className="space-y-3">
              <h4 className="font-medium text-2xl text-black">
                Delete Staff?
              </h4>
              <p className="text-base text-custom-gray">
                This action cannot be undone and will permanently remove this
                staff member&apos;s data.
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
                variant="secondary"
                className="w-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
                size="md"
                onClick={handleApprove}
              >
                Delete
              </Button>
            </div>
          </article>
        }
      />

      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="flex flex-col justify-stretch w-full items-start sm:max-w-lg bg-white p-4 h-[calc(100vh-50px)]">
          <DialogHeader className="px-4 pt-4">
            <DialogTitle className="text-2xl font-medium text-slate-800">
              Staff Details
            </DialogTitle>
          </DialogHeader>
          <ul className="px-4 py-6 space-y-5 overflow-y-auto flex-grow">
            <InfoItem
              label="Name"
              value={`${staffMember.firstName} ${staffMember.lastName}`}
              image="/adjustment-request/name.svg"
            />
            <InfoItem
              label="Email address"
              value={staffMember.email}
              image="/adjustment-request/email.svg"
            />
            <InfoItem
              label="Role"
              value={staffMember.role}
              image="/admin-staff/role.svg"
            />
            <InfoItem
              label="Team"
              value={staffMember.team || 'N/A'}
              image="/admin-staff/team.svg"
            />
            <InfoItem
              label="Status"
              value={<Status status={staffMember.status} />}
              image="/admin-staff/clock.svg"
            />
            <InfoItem
              label="Wage"
              value={getWage(staffMember)}
              image="/admin-staff/wage.svg"
              others={
                <>
                  <WageCard wageType={staffMember.wageType} />
                </>
              }
            />

            {staffTimeSummary.lastWorkDate && (
              <>
                <hr />
                <InfoItem
                  label="Last work date"
                  value={staffTimeSummary.lastWorkDate}
                  image=""
                />
                <InfoItem
                  label="Clock-out time"
                  value={staffTimeSummary.lastClockOut}
                  image=""
                />
                <InfoItem
                  label="Clock-in time"
                  value={staffTimeSummary.lastClockIn}
                  image=""
                />
                <InfoItem
                  label="Break taken"
                  value={staffTimeSummary.totalBreakTime}
                  image=""
                />
                <InfoItem
                  label="Hours worked"
                  value={staffTimeSummary.totalHoursWorked}
                  image=""
                />
              </>
            )}
          </ul>

          <DialogFooter className="w-full grid grid-cols-2 px-6 py-4">
            <Button
              variant="secondary"
              onClick={() => {
                if (staffMember.id) onEdit(staffMember?.id);
              }}
              leftIcon={
                <img src="/admin-staff/staff-edit.svg" alt="Edit icon" />
              }
            >
              Edit information
            </Button>
            <Button
              variant="secondary" // Primary action
              className="w-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
              onClick={handleApproveAction}
              leftIcon={
                <img
                  src="/admin-staff/staff-delete-white.svg"
                  alt="Delete icon"
                />
              }
            >
              Delete staff
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

interface InfoItemProps {
  label: string;
  value: string | number | React.ReactNode;
  image: string;
  others?: React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value, image, others }) => (
  <li className="grid grid-cols-1 md:grid-cols-[1.5fr_2fr] gap-4 items-start">
    <span className="flex items-center gap-2">
      {image && <Image src={image} alt="" width={22} height={22} />}
      <span className="text-[#98A2B3]">{label}</span>
    </span>
    <div className="flex items-center justify-start gap-2">
      <span>{value}</span>
      {others}
    </div>
  </li>
);
