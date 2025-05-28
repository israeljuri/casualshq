'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/molecules/Button';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { Staff } from '@/features/(dashboard)/types/staff.type';
import Image from 'next/image';

interface TeamMemberActionDropdownProps {
  member: Staff;
  onEdit: (memberId: string) => void;
  onDelete: (memberId: string) => void;
}

export const TeamMemberActionDropdown: React.FC<TeamMemberActionDropdownProps> = ({
  member,
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
        aria-label={`Actions for ${member.firstName} ${member.lastName}`}
      >
        <MoreHorizontal size={18} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-200 rounded-md shadow-lg z-20 p-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAction(() => {
                if (member.id) onEdit(member.id);
              });
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-700 hover:text-slate-900"
          >
            <Image
              width={14}
              height={14}
              src="/admin-staff/staff-edit.svg"
              alt="Edit"
            />
            Edit
          </button>
          <div className="my-1 border-t border-slate-100"></div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAction(() => {
                if (member.id) onDelete(member.id);
              });
            }}
            className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:text-red-700"
          >
            <Trash2 size={14} className="mr-2" /> Delete
          </button>
        </div>
      )}
    </div>
  );
};
