'use client';

import React, { useState } from 'react';
import { StaffMember } from '@/features/(dashboard)/types';
import { Button } from '@/components/molecules/Button';

import { useRouter } from 'next/navigation'; // For navigation to full details page
import Image from 'next/image';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';

interface StaffDetailsModalProps {
  staffMember: StaffMember | null;
  onClose: () => void;
  onDelete: (staffId: string) => void;
}

 

export const StaffDetailsModal: React.FC<StaffDetailsModalProps> = ({
  staffMember,
  onClose,
  onDelete,
}) => {
  const router = useRouter();
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  if (!staffMember) return null;

  const handleViewFullInformation = () => {
    onClose();
    router.push(`/staff/${staffMember.id}`);
  };

  const handleDelete = () => {
    onDelete(staffMember.id);
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

  const getWage = (staffMember: StaffMember): string | number => {
    if (staffMember.wageType === 'manual') {
      return staffMember.manualRatePerHour || 'N/A';
    } else if (staffMember.wageType === 'team_based') {
      return staffMember.teamBasedRate || 'N/A';
    } else if (staffMember.wageType === 'award_rate') {
      return staffMember.awardRate || 'N/A';
    }
    return 'N/A';
  };

  return (
    <>
      <ConfirmDialog
        open={!!isConfirmOpen}
        onOpenChange={(open) => setIsConfirmOpen(open)}
        content={
          <article className="p-5 bg-white rounded-2xl">
            <article className="space-y-3">
              <h4 className="font-medium text-2xl text-black">
                Delete Staff Member
              </h4>
              <p className="text-base text-custom-gray">
                Are you sure you want to delete this staff member?
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
                Staff Details
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
              label="Wage"
              value={getWage(staffMember)}
              image="/admin-staff/wage.svg"
            />
          </ul>

          {/* Footer / Actions */}
          <div className="p-6 border-t bg-slate-50">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                onClick={handleViewFullInformation}
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

interface InfoItemProps {
  label: string;
  value: string | number;
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
