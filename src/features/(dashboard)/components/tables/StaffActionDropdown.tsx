'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/molecules/Button';
import { MoreHorizontal, Edit3, Trash2 } from 'lucide-react';
import { StaffMember } from '@/features/(dashboard)/types';

interface StaffActionDropdownProps {
  staff: StaffMember;
  onEdit: (staff: StaffMember) => void;
  onDelete: (staffId: string) => void;
  onViewDetails: (staffId: StaffMember) => void;
}

export const StaffActionDropdown: React.FC<StaffActionDropdownProps> = ({
  staff,
  onEdit,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="secondary"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Actions for ${staff.firstName} ${staff.lastName}`}
      >
        <MoreHorizontal size={18} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-200 rounded-md shadow-lg z-20 py-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAction(() => onEdit(staff));
            }}
            className="flex items-center w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
          >
            <Edit3 size={14} className="mr-2.5 text-slate-500" /> Edit
          </button>
          <div className="my-1 border-t border-slate-100"></div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAction(() => onDelete(staff.id));
            }}
            className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 size={14} className="mr-2.5" /> Delete
          </button>
        </div>
      )}
    </div>
  );
};
