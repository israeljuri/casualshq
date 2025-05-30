'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/molecules/Button';
import { Filters } from '@/features/(dashboard)/types';
import { Checkbox } from '@/components/atoms/checkbox';

interface FilterDropdownProps {
  appliedFilters: Filters;
  roleOptions: { value: string; label: string; id: string }[];
  teamOptions: { value: string; label: string; id: string }[];
  statusOptions?: { value: string; label: string }[];
  onApplyFilters: (filters: Filters) => void;
  onCancelFilters: () => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  appliedFilters,
  roleOptions,
  teamOptions,
  statusOptions = undefined,
  onApplyFilters,
  onCancelFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState({
    teams: appliedFilters.teams,
    roles: appliedFilters.roles,
    status: appliedFilters.status,
  });

  useEffect(() => {
    setFilters({
      teams: appliedFilters.teams,
      roles: appliedFilters.roles,
      status: appliedFilters.status,
    });
  }, [appliedFilters]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setFilters({
      teams: appliedFilters.teams,
      roles: appliedFilters.roles,
      status: appliedFilters.status,
    });
  };

  const handleCancel = () => {
    onCancelFilters();
    handleClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleCancel]);

  const handleApply = () => {
    onApplyFilters(filters);
    handleClose();
  };

  const activeFilterCount =
    Object.values(appliedFilters.teams).filter(Boolean).length +
    Object.values(appliedFilters.roles).filter(Boolean).length +
    (appliedFilters.status
      ? Object.values(appliedFilters.status).filter(Boolean).length
      : 0);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="secondary"
        className="w-full sm:w-auto border-slate-300"
        onClick={isOpen ? handleClose : handleOpen}
      >
        <img src="/admin-dashboard/filter.svg" alt="" />
        Filters
        {activeFilterCount > 0 && (
          <span className="bg-slate-700 text-white text-xs font-semibold px-1.5 rounded-full">
            {activeFilterCount}
          </span>
        )}
        <img
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          src="/admin-dashboard/chevron.svg"
          alt=""
        />
      </Button>
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-md shadow-xl z-30 animate-fadeIn" // Added a subtle
          role="dialog"
          aria-modal="true"
          aria-labelledby="filter-dropdown-heading"
        >
          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            {teamOptions && teamOptions.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 text-[#98A2B3]">
                  TEAM
                </h4>
                {teamOptions.map((team) => (
                  <label
                    key={team.id}
                    className="flex items-center justify-between space-x-2 text-sm text-slate-700 mb-1.5 py-2 rounded hover:bg-slate-50 cursor-pointer"
                  >
                    <span>{team.label.replace(/_/g, ' ')}</span>
                    <Checkbox
                      className="border-olive-100"
                      checked={filters.teams[team.value] || false}
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({
                          ...prev,
                          teams: {
                            ...prev.teams,
                            [team.value]: Boolean(checked),
                          },
                        }))
                      }
                    />
                  </label>
                ))}
              </div>
            )}

            {roleOptions && roleOptions.length > 0 && (
              <div className="border-t pt-8">
                <h4 className="text-sm font-medium mb-2 text-[#98A2B3]">
                  ROLE
                </h4>
                {roleOptions.map((role) => (
                  <label
                    key={role.id}
                    className="flex items-center justify-between space-x-2 text-sm text-slate-700 mb-1.5 py-2 rounded hover:bg-slate-50 cursor-pointer"
                  >
                    <span>{role.label.replace(/_/g, ' ')}</span>
                    <Checkbox
                      className="border-olive-100"
                      checked={filters.roles[role.value] || false}
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({
                          ...prev,
                          roles: {
                            ...prev.roles,
                            [role.value]: Boolean(checked),
                          },
                        }))
                      }
                    />
                  </label>
                ))}
              </div>
            )}

            {statusOptions && statusOptions.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 text-[#98A2B3]">
                  STATUS
                </h4>
                {statusOptions.map((status) => (
                  <label
                    key={status.value}
                    className="flex items-center justify-between space-x-2 text-sm text-slate-700 mb-1.5 py-2 rounded hover:bg-slate-50 cursor-pointer"
                  >
                    <span>{status.label}</span>
                    <Checkbox
                      className="border-olive-100"
                      checked={filters.status?.[status.value] || false}
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({
                          ...prev,
                          status: {
                            ...prev.status,
                            [status.value]: Boolean(checked),
                          },
                        }))
                      }
                    />
                    {/* <input
                      type="checkbox"
                      className="rounded border-slate-400 text-[#98A2B3] focus:ring-slate-500 h-4 w-4"
                      checked={filters.status?.[status.value] || false}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          status: {
                            ...prev.status,
                            [status.value]: e.target.checked,
                          },
                        }))
                      }
                    /> */}
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-2 px-4 py-3 grid">
            <Button
              variant="secondary"
              size="md"
              className="w-full"
              onClick={handleCancel}
            >
              Clear filters
            </Button>
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={handleApply}
            >
              Apply filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
