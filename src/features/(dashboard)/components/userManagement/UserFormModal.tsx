'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/atoms/dialog';
import { Button } from '@/components/molecules/Button';
import { Input } from '@/components/molecules/Input';
import Image from 'next/image';
import { Select } from '@/components/molecules/Select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/molecules/Form';
import {
  ManagedUser,
  UserFormValues,
  userFormSchema,
  UserRole,
} from '@/features/(dashboard)/types/userManagement.type';
 
interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: UserFormValues) => void;
  defaultValues?: Partial<ManagedUser>; // For editing
  mode: 'add' | 'edit';
}

const roleOptions: UserRole[] = ['Admin', 'Manager', 'Team Member'];

export function UserFormModal({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
  mode,
}: UserFormModalProps) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      id: defaultValues?.id,
      name: defaultValues?.name || '',
      email: defaultValues?.email || '',
      role: defaultValues?.role || undefined,
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      form.reset({
        id: defaultValues?.id,
        name: defaultValues?.name || '',
        email: defaultValues?.email || '',
        role: defaultValues?.role || undefined,
      });
    }
  }, [isOpen, defaultValues, form]);

  const handleFormSubmit = (values: UserFormValues) => {
    onSubmit(values);
    onClose(); // Close modal on successful submission
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg bg-white p-4 h-[calc(100vh-50px)] flex flex-col gap-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium pt-5">
            {mode === 'add' ? 'Add user' : 'Edit user'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="h-full flex flex-col gap-4 justify-between"
          >
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter staff name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      options={roleOptions.map((role) => ({
                        value: role,
                        label: role,
                      }))}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="grid grid-cols-2">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                leftIcon={
                  <Image
                    src="/admin-user-management/cancel.svg"
                    alt="Cancel"
                    width={18}
                    height={18}
                  />
                }
              >
                Cancel
              </Button>
              <Button
                type="submit"
                leftIcon={
                  <Image
                    src="/admin-user-management/save-white.svg"
                    alt="Save"
                    width={14}
                    height={14}
                  />
                }
              >
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
