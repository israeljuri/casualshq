'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Image from 'next/image';
import { Button } from '@/components/molecules/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/atoms/dialog';
import { Input } from '@/components/molecules/Input';
import { Label } from '@/components/atoms/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select';
import { RadioGroup, RadioGroupItem } from '@/components/atoms/radio-group';
import { WAGE_TYPE_OPTIONS } from '../../config/constants';
import { staffFormSchema } from '../../types/staff.schema';
import { Staff, StaffFormData } from '../../types/staff.type';

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamOptions: { value: string; label: string; id: string }[];
}

export const AddStaffModal: React.FC<AddStaffModalProps> = ({
  isOpen,
  onClose,
  teamOptions,
}) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<StaffFormData>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      firstName: '',
      otherNames: '',
      lastName: '',
      email: '',
      team: '',
      role: '',
      wageType: 'manual',
      manualRatePerHour: undefined,
    },
  });

  const handleAddStaff = (data: Omit<Staff, 'id' | 'timeLogs' | 'status'>) => {
    // API Call to add
    console.log(data);
  };

  const selectedWageType = watch('wageType');

  const handleFormSubmit = (data: StaffFormData) => {
    handleAddStaff(data);
    onClose(); // The parent hook/page will typically call onClose after successful submission
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg bg-white p-4 h-[calc(100vh-50px)]">
        <DialogHeader className="px-4 pt-4">
          <DialogTitle className="text-2xl font-medium text-slate-800">
            Add staff
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="overflow-y-auto"
        >
          <div className="px-4 py-5 space-y-6">
            <div>
              <Input
                label="First Name"
                id="firstName"
                {...register('firstName')}
                placeholder="Enter staff frist name"
              />
              {errors.firstName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <Input
                label="Other Name(s)"
                id="otherNames"
                {...register('otherNames')}
                placeholder="Enter other name(s)..."
              />
              {errors.otherNames && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.otherNames.message}
                </p>
              )}
            </div>

            <div>
              <Input
                label="Last Name"
                id="lastName"
                {...register('lastName')}
                placeholder="Enter staff last name"
              />
              {errors.lastName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <Input
                label="Email Address"
                id="email"
                type="email"
                {...register('email')}
                placeholder="Enter staff email address"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* TODO: Add role select */}

            <div>
              <Label htmlFor="team" className="text-sm font-medium">
                Team (Optional)
              </Label>
              <Controller
                name="team"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full py-6 text-base">
                      <SelectValue placeholder="Select team..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="est">
                        <em>No team / Unassigned</em>
                      </SelectItem>
                      {teamOptions.map((team) => (
                        <SelectItem key={team.id} value={team.value}>
                          {team.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.team && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.team.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Wage</Label>
              <Controller
                name="wageType"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className=""
                  >
                    {WAGE_TYPE_OPTIONS.map((option) => (
                      <Label
                        key={option.value}
                        htmlFor={`wageType-${option.value}`}
                        className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-slate-50 text-sm"
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={`wageType-${option.value}`}
                        />
                        <span>{option.label}</span>

                        {selectedWageType === 'manual' &&
                          option.value === 'manual' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                              <div>
                                <Input
                                  id="manualRatePerHour"
                                  type="number"
                                  step="0.01"
                                  {...register('manualRatePerHour')}
                                  className="py-2"
                                  placeholder="e.g. 50"
                                />
                                {errors.manualRatePerHour && (
                                  <p className="text-xs text-red-500 mt-1">
                                    {errors.manualRatePerHour.message}
                                  </p>
                                )}
                                {/* Catch-all for the refine error */}
                                {errors.manualRatePerHour &&
                                  !errors.manualRatePerHour && (
                                    <p className="text-xs text-red-500 mt-1">
                                      {errors.manualRatePerHour}
                                    </p>
                                  )}
                              </div>
                            </div>
                          )}
                      </Label>
                    ))}
                  </RadioGroup>
                )}
              />
              {errors.wageType && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.wageType.message}
                </p>
              )}
            </div>
          </div>
        </form>

        <DialogFooter className="grid grid-cols-2 px-6 py-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isSubmitting}
            leftIcon={
              <Image
                src="/admin-staff/cancel.svg"
                alt="Cancel"
                width={20}
                height={20}
              />
            }
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            leftIcon={
              <Image
                src="/admin-staff/save-white.svg"
                alt="Save"
                width={15}
                height={15}
              />
            }
          >
            {isSubmitting ? 'Saving' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
