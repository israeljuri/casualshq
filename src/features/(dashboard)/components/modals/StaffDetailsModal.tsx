 
'use client';

import React from 'react';
import { StaffMember } from '@/features/(dashboard)/types';
import { Button } from '@/components/molecules/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/atoms/dialog';
 
import {
  Edit3,
  Trash2,
  UserCircle,
  Briefcase,
  DollarSign,
  ArrowRight,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation'; // For navigation to full details page

interface StaffDetailsModalProps {
  staffMember: StaffMember | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (staff: StaffMember) => void;
  onDelete: (staffId: string) => void;
}

const InfoRow: React.FC<{
  icon?: React.ElementType;
  label: string;
  value?: string | null;
}> = ({ icon: Icon, label, value }) => (
  <div className="flex items-start py-1.5">
    {Icon && (
      <Icon size={16} className="text-slate-500 mr-2.5 mt-0.5 shrink-0" />
    )}
    {!Icon && <div className="w-[16px] mr-2.5 shrink-0"></div>}{' '}
    {/* Placeholder for alignment */}
    <span className="text-sm text-slate-500 w-24 shrink-0">{label}</span>
    <span className="text-sm text-slate-700 font-medium break-words">
      {value || <span className="italic text-slate-400">N/A</span>}
    </span>
  </div>
);

export const StaffDetailsModal: React.FC<StaffDetailsModalProps> = ({
  staffMember,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  const router = useRouter();

  if (!staffMember) return null;

  // const getInitials = (firstName?: string, lastName?: string) => {
  //   return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || 'S';
  // };

  const handleViewFullInformation = () => {
    onClose(); // Close this modal
    router.push(`/staff/${staffMember.id}`); // Navigate to the full details page
  };

  const handleEdit = () => {
    // onClose(); // Keep this modal open, or close it based on desired UX
    onEdit(staffMember); // This will likely open the AddStaffModal
  };

  const handleDelete = () => {
    // Confirmation should ideally be handled by the parent or a dedicated confirmation modal
    // For now, assuming direct action or parent handles confirmation
    onDelete(staffMember.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-lg font-semibold text-slate-800">
            Staff Details
          </DialogTitle>
          <DialogClose asChild>
            <Button
              variant="ghost"
              className="absolute right-4 top-3 text-slate-500 hover:bg-slate-100 rounded-full"
              onClick={onClose}
            >
              <X size={20} />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="px-6 py-5 space-y-4">
   

          <div className="space-y-1">
            <InfoRow icon={UserCircle} label="Role" value={staffMember.role} />
            <InfoRow icon={Briefcase} label="Team" value={staffMember.team} />
            <InfoRow
              icon={DollarSign}
              label="Wage"
              value={
                staffMember.wageDetails?.type === 'manual'
                  ? `${staffMember.wageDetails.manualRatePerHour || 'N/A'} ${
                      staffMember.wageDetails.currency || ''
                    }`
                  : staffMember.wageDetails?.type
                      ?.split('_')
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(' ') || 'N/A'
              }
            />
          </div>

          <Button
            variant="secondary"
            className="w-full justify-center text-blue-600 border-blue-500 hover:bg-blue-50 hover:text-blue-700"
            onClick={handleViewFullInformation}
          >
            View full staff information{' '}
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>

        <DialogFooter className="px-6 py-4 border-t bg-slate-50 flex-row justify-between sm:justify-between">
          <Button
            variant="ghost" // More subtle delete button in a modal
            size="sm"
            onClick={handleDelete}
            className="text-red-600 hover:bg-red-100 hover:text-red-700 px-3"
          >
            <Trash2 size={14} className="mr-1.5" /> Delete staff
          </Button>
          <Button
            variant="secondary" // Primary action for edit
            size="sm"
            onClick={handleEdit}
            className="bg-slate-800 hover:bg-slate-700 text-white px-3"
          >
            <Edit3 size={14} className="mr-1.5" /> Edit information
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
