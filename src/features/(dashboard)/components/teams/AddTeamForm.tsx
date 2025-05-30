'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TeamSchema } from '@/features/(dashboard)/types/teams.schema';
import { TeamFormData } from '@/features/(dashboard)/types/teams.type';
import { Button } from '@/components/molecules/Button';
import { Input } from '@/components/molecules/Input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/molecules/Form';

import { getStaffOptionsForSelect } from '@/lib/mockData';
import { MultiSelectCombobox } from '@/components/molecules/MultiSelectCombobox';
import Image from 'next/image';

interface AddTeamFormProps {
  onSubmit: (data: TeamFormData) => void;
  initialData?: TeamFormData;
  isLoading?: boolean;
  submitButtonText?: string;
  onClose: () => void;
}

export function AddTeamForm({ onSubmit, initialData, onClose }: AddTeamFormProps) {
  const form = useForm<TeamFormData>({
    resolver: zodResolver(TeamSchema),
    defaultValues: initialData || {
      name: '',
      memberIds: [],
      teamWage: undefined,
    },
  });

  const staffOptions = getStaffOptionsForSelect();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-between h-full"
      >
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter team name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="memberIds" // Your form field name
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assign members</FormLabel>
                <MultiSelectCombobox
                  options={staffOptions} // Or fetched from your useGetStaffOptions hook
                  selected={field.value || []}
                  onChange={(newSelected) => field.onChange(newSelected)}
                  doneButtonText="Done"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="teamWage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Set team wage ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder=""
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ''
                          ? undefined
                          : Number(e.target.value)
                      )
                    }
                    value={field.value ?? ''}
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground pt-1">
                  Note: Setting a different staff wage will override the preset
                  team wage.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onClose()}
            leftIcon={
              <Image
                src="/admin-team/cancel.svg"
                alt="cancel"
                width={18}
                height={18}
              />
            }
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            leftIcon={
              <Image
                src="/admin-team/group-add.svg"
                alt="plus"
                width={16}
                height={16}
              />
            }
          >
            Create group
          </Button>
        </div>
      </form>
    </Form>
  );
}
