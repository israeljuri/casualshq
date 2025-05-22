'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface StaffNameDropdownProps {
  name: string;
}

export const StaffNameDropdown: React.FC<StaffNameDropdownProps> = ({
  name,
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Actions for ${name}`}
        className="flex items-center gap-2 text-gray-300"
      >
        <Image
          src="/admin-staff/warning.svg"
          alt="Pending onboarding"
          width={16}
          height={16}
          className="text-yellow-500"
          title="Pending onboarding"
        />
        {name}
      </button>

      {isOpen && (
        <article className="absolute p-4 left-0 mt-1  bg-white border border-slate-200 rounded-xl shadow-lg z-20">
          <p className="max-w-60">
            This staff member has not <br /> accepted the invite to <br /> Casual&apos;s HQ.
          </p>
        </article>
      )}
    </div>
  );
};
