'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { Sidebar } from '@/features/(dashboard)/components/Sidebar';

import { Button } from '@/components/molecules/Button';
import Image from 'next/image';

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/molecules/Form';
import { Input } from '@/components/molecules/Input';
import { Select } from '@/components/molecules/Select';
import { Controller, useForm } from 'react-hook-form';

import { RadioGroup, RadioGroupItem } from '@/components/atoms/radio-group';
import { WAGE_TYPE_OPTIONS_FORM } from '@/features/(dashboard)/config/constants';
import { Label } from '@radix-ui/react-label';

import { zodResolver } from '@hookform/resolvers/zod';
import { staffsMockData } from '@/lib/mockData';

import { convertStaffToCSV } from '@/lib/convertToCSV';
import { Staff, StaffFormData } from '@/features/(dashboard)/types/staff.type';
import { staffFormSchema } from '@/features/(dashboard)/types/staff.schema';

export default function FullStaffDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const staffId = params.staff as string;

  const [staffMember] = useState<Staff | null>(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<StaffFormData>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: Omit<StaffFormData, 'timeLogs'>) => {
    if (staffMember) {
      // TODO: Implement update staff from api
      console.log(data);
    }
  };

  useEffect(() => {
    if (staffId) {
      //  TODO: Implement fetch staff details from api
      const staff = staffsMockData.find((staff) => staff.id === staffId);
      if (!staff) return;

      form.reset(staff as Omit<StaffFormData, 'timeLogs'>);
    }
  }, [staffId]);

  const handleDelete = async () => {
    if (staffMember) {
      // TODO: Implement delete staff from api
      router.push('/staff'); // Navigate back to staff list
    }
  };

  const handleExport = () => {
    let data = form.getValues();
    data = { ...data, ...staffMember };
    const csvString = convertStaffToCSV(data as Staff);

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'staff-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const renderPersonalInformation = () => (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <header className="flex gap-4 flex-wrap items-start md:items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            Personal Information
          </h3>
          <div className="flex flex-wrap items-center gap-4 justify-between">
            {!isEditing && (
              <Button
                leftIcon={
                  <Image
                    src="/admin-staff/edit.svg"
                    width={15}
                    height={15}
                    alt=""
                  />
                }
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            )}

            {isEditing && (
              <div className="flex items-center gap-4 justify-center">
                <Button
                  variant="secondary"
                  leftIcon={
                    <Image
                      src="/admin-staff/cancel.svg"
                      width={18}
                      height={18}
                      alt=""
                    />
                  }
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  leftIcon={
                    <Image
                      src="/admin-staff/save-white.svg"
                      width={15}
                      height={15}
                      alt=""
                    />
                  }
                >
                  Save changes
                </Button>
              </div>
            )}
            <Button
              type="button"
              variant="secondary"
              className="text-red-800"
              onClick={handleDelete}
              leftIcon={
                <Image
                  src="/admin-staff/staff-delete.svg"
                  alt="Delete staff"
                  width={15}
                  height={15}
                />
              }
            >
              Delete staff
            </Button>
          </div>
        </header>

        {/* Details */}
        <section className="border border-olive-100 p-6 rounded-2xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <span>Title</span>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Select
                      disabled={!isEditing}
                      placeholder="Select title"
                      options={[
                        { value: 'mr', label: 'Mr' },
                        { value: 'mrs', label: 'Mrs' },
                        { value: 'ms', label: 'Ms' },
                        { value: 'dr', label: 'Dr' },
                        { value: 'prof', label: 'Prof' },
                        { value: 'others', label: 'Others' }
                      ]}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <span>First Name</span>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input
                      disabled={!isEditing}
                      placeholder="First Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <span>Other Name(s)</span>
            <FormField
              control={form.control}
              name="otherNames"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input
                      disabled={!isEditing}
                      placeholder="Other Name(s)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <span>Last Name</span>
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input
                      disabled={!isEditing}
                      placeholder="Last Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <span>Email address</span>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input
                      disabled={!isEditing}
                      placeholder="Email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <span>Contact phone number</span>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input
                      disabled={!isEditing}
                      placeholder="Contact phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* Home Address */}
        <section className="border border-olive-100 p-6 rounded-2xl space-y-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Home Address
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <span>Line 1</span>
            <FormField
              control={form.control}
              name="homeAddress.line"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input
                      disabled={!isEditing}
                      placeholder="Address Line 1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <span>Street Name</span>
            <FormField
              control={form.control}
              name="homeAddress.streetName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input
                      disabled={!isEditing}
                      placeholder="Street Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <span>City</span>
            <FormField
              control={form.control}
              name="homeAddress.city"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input
                      disabled={!isEditing}
                      placeholder="City"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <span>Postcode</span>
            <FormField
              control={form.control}
              name="homeAddress.postcode"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input
                      disabled={!isEditing}
                      placeholder="Postcode"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* Emergency Contact Information */}
        <section className="border border-olive-100 p-6 rounded-2xl space-y-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Emergency contact information
          </h3>{' '}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <span>Relationship</span>
            <FormField
              control={form.control}
              name="emergencyContactInformation.relationship"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Select
                      disabled={!isEditing}
                      placeholder="Select relationship"
                      options={[
                        { value: 'mother', label: 'Mother' },
                        { value: 'father', label: 'Father' },
                        { value: 'brother', label: 'Brother' },
                        { value: 'sister', label: 'Sister' },
                        { value: 'spouse', label: 'Spouse' },
                        { value: 'others', label: 'Others' },
                      ]}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <span>Name</span>
            <FormField
              control={form.control}
              name="emergencyContactInformation.name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input
                      disabled={!isEditing}
                      placeholder="Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <span>Phone number</span>
            <FormField
              control={form.control}
              name="emergencyContactInformation.phoneNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input
                      disabled={!isEditing}
                      placeholder="Phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <span>Address</span>
            <FormField
              control={form.control}
              name="emergencyContactInformation.address"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input
                      disabled={!isEditing}
                      placeholder="Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>
      </form>
    </Form>
  );

  const renderFinancialInformation = () => (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <header className="flex gap-4 flex-wrap items-start md:items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Financial Information
          </h3>

          {!isEditing && (
            <Button
              leftIcon={
                <Image
                  src="/admin-staff/edit.svg"
                  width={15}
                  height={15}
                  alt=""
                />
              }
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}

          {isEditing && (
            <div className="flex items-center gap-4 justify-center">
              <Button
                variant="secondary"
                leftIcon={
                  <Image
                    src="/admin-staff/cancel.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                }
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                leftIcon={
                  <Image
                    src="/admin-staff/save-white.svg"
                    width={15}
                    height={15}
                    alt=""
                  />
                }
              >
                Save changes
              </Button>
            </div>
          )}
        </header>
        <section className="border border-olive-100 p-6 rounded-2xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <span>Tax file number</span>
            <FormField
              control={form.control}
              name="financialInformation.taxFileNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input
                      disabled={!isEditing}
                      placeholder="Tax file number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <span>Bank BSB</span>
            <FormField
              control={form.control}
              name="financialInformation.bankBSB"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input
                      disabled={!isEditing}
                      placeholder="Bank BSB"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <span>Account name</span>
            <FormField
              control={form.control}
              name="financialInformation.accountName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input
                      disabled={!isEditing}
                      placeholder="Account name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <span>Account number</span>
            <FormField
              control={form.control}
              name="financialInformation.accountNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input
                      disabled={!isEditing}
                      placeholder="Bank Account Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <span>Super fund name</span>
            <FormField
              control={form.control}
              name="financialInformation.superFundName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input
                      disabled={!isEditing}
                      placeholder="Super fund name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <span>Fund ABN</span>
            <FormField
              control={form.control}
              name="financialInformation.fundABN"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input
                      disabled={!isEditing}
                      placeholder="Fund ABN"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <span>Member number</span>
            <FormField
              control={form.control}
              name="financialInformation.memberNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input
                      disabled={!isEditing}
                      placeholder="Member number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>
      </form>
    </Form>
  );

  const renderOthersInformation = () => (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <header className="flex gap-4 flex-wrap items-start md:items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Others</h3>

          {!isEditing && (
            <Button
              leftIcon={
                <Image
                  src="/admin-staff/edit.svg"
                  width={15}
                  height={15}
                  alt=""
                />
              }
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}

          {isEditing && (
            <div className="flex items-center gap-4 justify-center">
              <Button
                variant="secondary"
                leftIcon={
                  <Image
                    src="/admin-staff/cancel.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                }
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                leftIcon={
                  <Image
                    src="/admin-staff/save-white.svg"
                    width={15}
                    height={15}
                    alt=""
                  />
                }
              >
                Save changes
              </Button>
            </div>
          )}
        </header>

        <section className="border border-olive-100 p-6 rounded-2xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_max-content] gap-4 justify-between items-center">
            <span>Wage</span>

            <div className="space-y-2">
              <Controller
                name="wageType"
                control={form.control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="grid grid-cols-1 md:grid-cols-[max-content_max-content_max-content] gap-2"
                    disabled={!isEditing}
                    value={field.value}
                  >
                    {WAGE_TYPE_OPTIONS_FORM.map((option) => (
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
                        {option.value === 'manual' &&
                          field.value === 'manual' && (
                            <FormField
                              control={form.control}
                              name="manualRatePerHour"
                              render={({ field }) => (
                                <FormItem className="w-full">
                                  <FormControl className="w-[8rem]">
                                    <Input
                                      step="0.01"
                                      placeholder="e.g. 50"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                      </Label>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            {form.formState.errors.wageType && (
              <p className="text-xs text-red-500 mt-1">
                {form.formState.errors.wageType.message}
              </p>
            )}
          </div>
        </section>
      </form>
    </Form>
  );

  return (
    <div className="flex h-[screen] overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activePath={`/staff`}
      />

      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header with back button */}
        <div className="border-gray-200 bg-white px-6 pt-10 py-2">
          <section className="container mx-auto">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-lg font-medium"
                  onClick={() => router.back()}
                  leftIcon={
                    <Image
                      src="/admin-dashboard/move-right.svg"
                      alt="Move right"
                      width={20}
                      height={20}
                    />
                  }
                >
                  Staff Information
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="primary"
                  onClick={handleExport}
                  leftIcon={
                    <Image
                      src="/admin-dashboard/export.svg"
                      alt="Export"
                      width={15}
                      height={15}
                    />
                  }
                >
                  Export staff data
                </Button>
              </div>
            </div>
          </section>
        </div>

        <section className="container mx-auto">
          <div className="flex-1 p-6">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex flex-wrap space-x-8">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'personal'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Personal Information
                </button>
                <button
                  onClick={() => setActiveTab('financial')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'financial'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Financial Information
                </button>
                <button
                  onClick={() => setActiveTab('others')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'others'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Others
                </button>
              </nav>
            </div>

            <div className="">
              {activeTab === 'personal' && renderPersonalInformation()}
              {activeTab === 'financial' && renderFinancialInformation()}
              {activeTab === 'others' && renderOthersInformation()}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
