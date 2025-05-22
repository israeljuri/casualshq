'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  staffFormSchema,
  StaffFormValues,
} from '@/features/(dashboard)/types/schema';
import {
  StaffMember,
  StaffFormData,
  WageType,
} from '@/features/(dashboard)/types';

import { Button } from '@/components/molecules/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
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

import { X } from 'lucide-react';

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<StaffMember, 'id' | 'timeLogs' | 'latestAdjustment' | 'status'>) => void; // Changed to StaffFormData
  initialData?: StaffMember | null; // For editing
  teamOptions:  { value: string; label: string; id: string; }[];
  isLoading?: boolean; // To disable form during submission
}

const WAGE_TYPE_OPTIONS: { value: WageType; label: string }[] = [
  { value: 'manual', label: 'Manual' },
  { value: 'team_based', label: 'From team' },
  { value: 'award_rate', label: 'From award rate' },
];

export const AddStaffModal: React.FC<AddStaffModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  teamOptions,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      team: '',
      role: '',
      wageType: 'manual',
      manualRatePerHour: undefined, // Ensure it's undefined initially for the placeholder
    },
  });

  const selectedWageType = watch('wageType');

  useEffect(() => {
    if (initialData) {
      reset({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        email: initialData.email || '',
        team: initialData.team || '',
        role: initialData.role || '',
        title: initialData.title || '',
        otherNames: initialData.otherNames || '',
        phoneNumber: initialData.phoneNumber || '',
        wageType: initialData.wageDetails?.type || 'manual',
        manualRatePerHour:
          initialData.wageDetails?.type === 'manual'
            ? Number(initialData.wageDetails?.manualRatePerHour) || undefined
            : undefined,
      });
    } else {
      reset({
        // Default values for new staff
        firstName: '',
        lastName: '',
        email: '',
        team: '',
        role: '',
        title: '',
        otherNames: '',
        phoneNumber: '',
        wageType: 'manual',
        manualRatePerHour: undefined,
      });
    }
  }, [initialData, reset, isOpen]); // Reset form when modal opens or initialData changes

  const handleFormSubmit = async (data: StaffFormValues) => {
    // Convert to StaffFormData structure expected by the service/hook
    const submissionData: StaffFormData = {
      ...data, // includes firstName, lastName, email, team, role, title, otherNames, phoneNumber
    };
    await onSubmit(submissionData);
    onClose(); // The parent hook/page will typically call onClose after successful submission
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg bg-white p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-xl font-semibold text-slate-800">
            {initialData ? 'Edit staff member' : 'Add new staff member'}
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500">
            {initialData
              ? 'Update the details below.'
              : 'Fill in the details to add a new staff member.'}
          </DialogDescription>
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

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="overflow-y-auto max-h-[calc(100vh-200px)]"
        >
          <div className="px-6 py-5 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="firstName"
                  className="text-sm font-medium text-slate-700"
                >
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  {...register('firstName')}
                  className="mt-1 h-10 border-slate-300"
                  placeholder="e.g. John"
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="lastName"
                  className="text-sm font-medium text-slate-700"
                >
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  {...register('lastName')}
                  className="mt-1 h-10 border-slate-300"
                  placeholder="e.g. Doe"
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-slate-700"
              >
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className="mt-1 h-10 border-slate-300"
                placeholder="e.g. john.doe@example.com"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="role"
                className="text-sm font-medium text-slate-700"
              >
                Role / Job Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="role"
                {...register('role')}
                className="mt-1 h-10 border-slate-300"
                placeholder="e.g. Sales Manager"
              />
              {errors.role && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="team"
                className="text-sm font-medium text-slate-700"
              >
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
                    <SelectTrigger className="mt-1 h-10 border-slate-300">
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
              <Label className="text-sm font-medium text-slate-700">
                Wage <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="wageType"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-2"
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

            {selectedWageType === 'manual' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                <div>
                  <Label
                    htmlFor="manualRatePerHour"
                    className="text-sm font-medium text-slate-700"
                  >
                    Manual Rate per Hour <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="manualRatePerHour"
                    type="number"
                    step="0.01"
                    {...register('manualRatePerHour')}
                    className="mt-1 h-10 border-slate-300"
                    placeholder="e.g. 25.50"
                  />
                  {errors.manualRatePerHour && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.manualRatePerHour.message}
                    </p>
                  )}
                  {/* Catch-all for the refine error */}
                  {errors.manualRatePerHour && !errors.manualRatePerHour && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.manualRatePerHour}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="px-6 py-4 border-t bg-slate-50">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="border-slate-300 hover:bg-slate-100"
              disabled={isSubmitting || isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-slate-800 hover:bg-slate-700 text-white"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading
                ? initialData
                  ? 'Saving...'
                  : 'Adding...'
                : initialData
                ? 'Save changes'
                : 'Add staff'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
