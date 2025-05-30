'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { Sidebar } from '@/features/(dashboard)/components/Sidebar';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  awardRateSchema,
  SettingsSchema,
} from '@/features/(dashboard)/types/settings.schema';
import {
  AwardRateData,
  BreakTimeData,
  SettingsData,
} from '@/features/(dashboard)/types/settings.type';
import { Button } from '@/components/molecules/Button';
import Image from 'next/image';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/molecules/Form';
import { SubmitHandler } from 'react-hook-form';

import { Select } from '@/components/molecules/Select';
import {
  PAYMENT_FREQUENCY_OPTIONS,
  PAYMENT_START_DAY_OPTIONS,
  TIMEZONE_OPTIONS,
} from '@/features/(dashboard)/config/constants';
import { Switch } from '@/components/atoms/switch';
import { Input } from '@/components/molecules/Input';
import { RadioGroup, RadioGroupItem } from '@/components/atoms/radio-group';
import { Label } from '@/components/atoms/label';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/molecules/Table';
import { Header } from '@/features/(dashboard)/components/Header';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/atoms/dialog';
import { Badge } from '@/components/atoms/badge';
import { Checkbox } from '@/components/atoms/checkbox';

export default function SettingsPage() {
  const pageTitle = 'Settings';
  const pageDescription =
    'Customize TimerX to align with your company’s needs.';

  const [activeTab, setActiveTab] = useState('general');
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [awardRates, setAwardRates] = useState<AwardRateData[]>([]);
  const [breakTimes, setBreakTimes] = useState<BreakTimeData[]>([]);
  const [isSettingRules, setIsSettingRules] = useState(
    Boolean(awardRates.length)
  );

  const [isBreakTimesModalOpen, setIsBreakTimesModalOpen] = useState(false);

  const form = useForm<SettingsData>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      defaultTimezone: '',
      enableNotifications: false,
      company: {
        name: '',
        logo: '',
        address: '',
      },
      overTimeWeekdaysRateType: 'amount',
      overTimeWeekdaysAmount: undefined,
      overTimeWeekdaysPercentage: undefined,
      weekendRate: false,
      overTimeSaturdayRateType: 'amount',
      overTimeSaturdayAmount: undefined,
      overTimeSaturdayPercentage: undefined,
      overTimeSundayRateType: 'amount',
      overTimeSundayAmount: undefined,
      overTimeSundayPercentage: undefined,
      awardRates: [],
      standardWorkHoursPerDay: 8,
      enableDailyFixedRate: false,
      dailyFixedRate: undefined,
      paymentFrequency: 'weekly',
      paymentStartDay: 'sunday',
      breakTimes: [],
    },
  });

  const onSubmit: SubmitHandler<SettingsData> = (data) => {
    const completeData = {
      ...data,
      awardRates,
      breakTimes,
    };
    console.log(completeData);
  };

  useEffect(() => {
    setIsSettingRules(Boolean(awardRates.length));
  }, [awardRates]);

  const renderGeneralTab = () => (
    <section className="space-y-6">
      <header className="flex gap-4 flex-wrap items-start md:items-center justify-between">
        <h2 className="text-xl font-medium text-slate-900">General</h2>

        {!isEditing && (
          <Button
            leftIcon={
              <Image
                src="/admin-settings/edit.svg"
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
                  src="/admin-settings/cancel.svg"
                  width={15}
                  height={15}
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
                  src="/admin-settings/check-white.svg"
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <div className="p-5 rounded-2xl border border-olive-100 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <article>
              <h3 className="text-base font-medium">Enable notifications</h3>
              <p className="text-sm text-slate-500">
                Send staff updates for clock-in/out reminders and policy changes
              </p>
            </article>

            <div className="w-full flex justify-start md:justify-end items-center">
              <FormField
                control={form.control}
                disabled={!isEditing}
                name="enableNotifications"
                render={({ field }) => (
                  <FormItem className="w-auto">
                    <FormControl className="">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!isEditing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-olive-100 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <article>
              <h3 className="text-base font-medium">Default timezone</h3>
              <p className="text-sm text-slate-500">
                Set the company’s primary timezone for accurate time tracking.
              </p>
            </article>

            <FormField
              control={form.control}
              disabled={!isEditing}
              name="defaultTimezone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Select
                      placeholder="Select a timezone"
                      options={TIMEZONE_OPTIONS}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </section>
  );

  const companyInformationTab = () => (
    <section className="space-y-6">
      <header className="flex gap-4 flex-wrap items-start md:items-center justify-between">
        <h2 className="text-xl font-medium text-slate-900">
          Company Information
        </h2>

        {!isEditing && (
          <Button
            leftIcon={
              <Image
                src="/admin-settings/edit.svg"
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
                  src="/admin-settings/cancel.svg"
                  width={15}
                  height={15}
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
                  src="/admin-settings/check-white.svg"
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <div className="p-5 rounded-2xl border border-olive-100 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <article>
              <h3 className="text-base font-medium">Company logo</h3>
              <p className="text-sm text-slate-500">
                Upload your company logo to personalize your TimerX experience.
              </p>
            </article>

            <FormField
              control={form.control}
              disabled={!isEditing}
              name="company.logo"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input placeholder="Upload logo" type="file" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="p-5 rounded-2xl border border-olive-100 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <article>
              <h3 className="text-base font-medium">Company name</h3>
              <p className="text-sm text-slate-500">
                Update your company name as it will appear on all reports and
                logs.
              </p>
            </article>

            <FormField
              control={form.control}
              disabled={!isEditing}
              name="company.name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input
                      disabled={!isEditing}
                      placeholder="Enter company name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="p-5 rounded-2xl border border-olive-100 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <article>
              <h3 className="text-base font-medium">Company address</h3>
              <p className="text-sm text-slate-500">
                Ensure the correct address is displayed on payment summaries and
                reports.
              </p>
            </article>

            <FormField
              control={form.control}
              disabled={!isEditing}
              name="company.address"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input placeholder="Enter company address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </section>
  );

  const wagesAndOverTimeTab = () => (
    <section className="space-y-6">
      <header className="flex gap-4 flex-wrap items-start md:items-center justify-between">
        <h2 className="text-xl font-medium text-slate-900">
          Wages and Overtime
        </h2>

        {!isEditing && (
          <Button
            leftIcon={
              <Image
                src="/admin-settings/edit.svg"
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
                  src="/admin-settings/cancel.svg"
                  width={15}
                  height={15}
                  alt=""
                />
              }
              onClick={() => {
                setIsEditing(false);
                setIsSettingRules(false);
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              leftIcon={
                <Image
                  src="/admin-settings/check-white.svg"
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <div className="p-5 rounded-2xl border border-olive-100 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
              <article>
                <h3 className="text-base font-medium">Award rates</h3>
                <p className="text-sm text-slate-500">
                  Set the rules governing your company&apos;s award rates.
                </p>
              </article>

              <div className="w-full flex justify-start md:justify-end items-center">
                {isSettingRules ? (
                  <Button
                    variant="ghost"
                    disabled={!isEditing}
                    onClick={() => setIsSettingRules(false)}
                    className="text-primary"
                  >
                    Done
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    disabled={!isEditing}
                    onClick={() => setIsSettingRules(true)}
                    className="text-primary"
                  >
                    Set rules
                  </Button>
                )}
              </div>
            </div>

            {isEditing && isSettingRules && (
              <div className="grid grid-cols-1 gap-4">
                <EditRulesTable
                  initialAwardRates={awardRates}
                  saveAwardRates={(data) =>
                    setAwardRates((prev) => [...prev, ...data])
                  }
                />
              </div>
            )}

            {!isSettingRules && Boolean(awardRates.length) && (
              <DisplayRulesTable awardRates={awardRates} />
            )}
          </div>

          <div className="p-5 rounded-2xl border border-olive-100 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <article>
              <h3 className="text-base font-medium">
                Overtime rate for weekdays
              </h3>
              <p className="text-sm text-slate-500">
                Set the multiplier for wages after the standard work hours are
                exceeded.
              </p>
            </article>

            <div className="space-y-2 flex justify-start md:justify-end items-center">
              <Controller
                name="overTimeWeekdaysRateType"
                control={form.control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="grid grid-cols-1 md:grid-cols-[max-content_max-content_max-content] gap-2"
                  >
                    <Label
                      htmlFor="rateType-amount"
                      className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-slate-50 text-sm"
                    >
                      <RadioGroupItem
                        disabled={!isEditing}
                        value={'amount'}
                        id="rateType-amount"
                      />
                      <span>Amount</span>

                      <FormField
                        control={form.control}
                        name="overTimeWeekdaysAmount"
                        render={({ field: fieldTwo }) => (
                          <FormItem className="w-full">
                            <FormControl className="w-full md:w-[8rem]">
                              <Input
                                type="number"
                                step="0.01"
                                disabled={!isEditing}
                                {...fieldTwo}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </Label>

                    <Label
                      htmlFor="rateType-percentage"
                      className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-slate-50 text-sm"
                    >
                      <RadioGroupItem
                        disabled={!isEditing}
                        value={'percentage'}
                        id="rateType-percentage"
                      />
                      <span>Percentage</span>
                      <FormField
                        control={form.control}
                        name="overTimeWeekdaysPercentage"
                        render={({ field: fieldTwo }) => (
                          <FormItem className="w-full">
                            <FormControl className="w-full md:w-[8rem]">
                              <Input
                                type="number"
                                step="0.01"
                                disabled={!isEditing}
                                {...fieldTwo}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </Label>
                  </RadioGroup>
                )}
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-olive-100 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <article>
              <h3 className="text-base font-medium">Set weekend rates</h3>
              <p className="text-sm text-slate-500">
                Set weekend rates for staff that work during the weekends.
              </p>
            </article>

            <div className="w-full flex justify-start md:justify-end items-center">
              <FormField
                control={form.control}
                disabled={!isEditing}
                name="weekendRate"
                render={({ field }) => (
                  <FormItem className="w-auto">
                    <FormControl className="">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!isEditing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {form.watch('weekendRate') && (
            <div className="p-5 rounded-2xl border border-olive-100 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
              <article>
                <h3 className="text-base font-medium">
                  Overtime rate for Saturdays
                </h3>
                <p className="text-sm text-slate-500">
                  Set the overtime multiplier for Saturday wages.
                </p>
              </article>

              <div className="space-y-2 flex justify-end items-center">
                <Controller
                  name="overTimeSaturdayRateType"
                  control={form.control}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      className="grid grid-cols-1 md:grid-cols-[max-content_max-content_max-content] gap-2"
                    >
                      <Label
                        htmlFor="rateType-amount"
                        className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-slate-50 text-sm"
                      >
                        <RadioGroupItem
                          disabled={!isEditing}
                          value={'amount'}
                          id="rateType-amount"
                        />
                        <span>Amount</span>

                        <FormField
                          control={form.control}
                          name="overTimeSaturdayAmount"
                          render={({ field: fieldTwo }) => (
                            <FormItem className="w-full">
                              <FormControl className="w-[8rem]">
                                <Input
                                  type="number"
                                  step="0.01"
                                  disabled={!isEditing}
                                  {...fieldTwo}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </Label>

                      <Label
                        htmlFor="rateType-percentage"
                        className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-slate-50 text-sm"
                      >
                        <RadioGroupItem
                          disabled={!isEditing}
                          value={'percentage'}
                          id="rateType-percentage"
                        />
                        <span>Percentage</span>
                        <FormField
                          control={form.control}
                          name="overTimeSaturdayPercentage"
                          render={({ field: fieldTwo }) => (
                            <FormItem className="w-full">
                              <FormControl className="w-[8rem]">
                                <Input
                                  type="number"
                                  step="0.01"
                                  disabled={!isEditing}
                                  {...fieldTwo}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </Label>
                    </RadioGroup>
                  )}
                />
              </div>
            </div>
          )}

          {form.watch('weekendRate') && (
            <div className="p-5 rounded-2xl border border-olive-100 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
              <article>
                <h3 className="text-base font-medium">
                  Overtime rate for Sundays
                </h3>
                <p className="text-sm text-slate-500">
                  Set the overtime multiplier for Sunday wages.
                </p>
              </article>

              <div className="space-y-2 flex justify-end items-center">
                <Controller
                  name="overTimeSundayRateType"
                  control={form.control}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      className="grid grid-cols-1 md:grid-cols-[max-content_max-content_max-content] gap-2"
                    >
                      <Label
                        htmlFor="rateType-amount"
                        className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-slate-50 text-sm"
                      >
                        <RadioGroupItem
                          disabled={!isEditing}
                          value={'amount'}
                          id="rateType-amount"
                        />
                        <span>Amount</span>

                        <FormField
                          control={form.control}
                          name="overTimeSundayAmount"
                          render={({ field: fieldTwo }) => (
                            <FormItem className="w-full">
                              <FormControl className="w-[8rem]">
                                <Input
                                  type="number"
                                  step="0.01"
                                  disabled={!isEditing}
                                  {...fieldTwo}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </Label>

                      <Label
                        htmlFor="rateType-percentage"
                        className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-slate-50 text-sm"
                      >
                        <RadioGroupItem
                          disabled={!isEditing}
                          value={'percentage'}
                          id="rateType-percentage"
                        />
                        <span>Percentage</span>
                        <FormField
                          control={form.control}
                          name="overTimeSundayPercentage"
                          render={({ field: fieldTwo }) => (
                            <FormItem className="w-full">
                              <FormControl className="w-[8rem]">
                                <Input
                                  type="number"
                                  step="0.01"
                                  disabled={!isEditing}
                                  {...fieldTwo}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </Label>
                    </RadioGroup>
                  )}
                />
              </div>
            </div>
          )}
        </form>
      </Form>
    </section>
  );

  const workPolicyTab = () => (
    <section className="space-y-6">
      <header className="flex gap-4 flex-wrap items-start md:items-center justify-between">
        <h2 className="text-xl font-medium text-slate-900">Work Policies</h2>

        {!isEditing && (
          <Button
            leftIcon={
              <Image
                src="/admin-settings/edit.svg"
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
                  src="/admin-settings/cancel.svg"
                  width={15}
                  height={15}
                  alt=""
                />
              }
              onClick={() => {
                setIsEditing(false);
                setIsSettingRules(false);
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              leftIcon={
                <Image
                  src="/admin-settings/check-white.svg"
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <div className="p-5 rounded-2xl border border-olive-100 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <article>
              <h3 className="text-base font-medium">
                Standard work hours per day
              </h3>
              <p className="text-sm text-slate-500">
                Define the total number of hours in a workday before overtime
                applies
              </p>
            </article>

            <FormField
              control={form.control}
              name="standardWorkHoursPerDay"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={!isEditing}
                      type="number"
                      placeholder="Enter work hours"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Allotted break times */}
          <div className="p-5 rounded-2xl border border-olive-100 grid grid-cols-1 gap-4 justify-between items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
              <article>
                <h3 className="text-base font-medium">Allotted break times</h3>
                <p className="text-sm text-slate-500">
                  Specify the type of break and the time allotted during a
                  workday.
                </p>
              </article>

              <div className="w-full flex justify-start md:justify-end items-center">
                <Button
                  variant="ghost"
                  disabled={!isEditing}
                  onClick={() => setIsBreakTimesModalOpen(true)}
                  className="text-primary"
                >
                  Set break times
                </Button>
              </div>
            </div>

            {breakTimes.length > 0 && (
              <div className="col-span-2 mt-4">
                {breakTimes.map((breakTime, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 items-center justify-between py-2 border-b border-gray-100"
                  >
                    <div className="flex items-center gap-1">
                      <span className="capitalize font-medium">
                        {breakTime.type}
                      </span>
                      <Badge className="px-1 py-1 capitalize rounded-sm bg-[#F0F2F5] border border-[#E4E7EC] text-custom-gray">
                        {breakTime.isPaid ? 'Paid' : 'Unpaid'}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <Input type="number" value={breakTime.timeInMinutes} readOnly />
                      {isEditing && (
                        <Button
                          variant="ghost"
                          className="text-red-500"
                          onClick={() => {
                            const newBreakTimes = [...breakTimes];
                            newBreakTimes.splice(index, 1);
                            setBreakTimes(newBreakTimes);
                          }}
                        >
                          <Image
                            src="/admin-settings/trash.svg"
                            alt="Delete"
                            width={16}
                            height={16}
                          />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-5 rounded-2xl border border-olive-100 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <article>
              <h3 className="text-base font-medium">Enable daily fixed rate</h3>
              <p className="text-sm text-slate-500">
                For staff on daily fixed rates, enable this option to set their
                payment rules
              </p>
            </article>

            <div className="w-full flex justify-start md:justify-end items-center">
              <FormField
                control={form.control}
                disabled={!isEditing}
                name="enableDailyFixedRate"
                render={({ field }) => (
                  <FormItem className="w-auto">
                    <FormControl className="">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!isEditing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {form.watch('enableDailyFixedRate') && (
            <div className="p-5 rounded-2xl border border-olive-100 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
              <article>
                <h3 className="text-base font-medium">Daily fixed rate</h3>
                <p className="text-sm text-slate-500">
                  Set the daily rate for staff who are not on hourly pay.
                </p>
              </article>

              <FormField
                control={form.control}
                name="dailyFixedRate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={!isEditing}
                        type="number"
                        placeholder="Enter rate"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <div className="p-5 rounded-2xl border border-olive-100 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <article>
              <h3 className="text-base font-medium">Payment frequency</h3>
              <p className="text-sm text-slate-500">
                Define when your team gets paid.
              </p>
            </article>
            <div className="space-y-2 flex justify-start md:justify-end items-center">
              <Controller
                name="paymentFrequency"
                control={form.control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="grid grid-cols-1 md:grid-cols-[max-content_max-content_max-content] gap-2"
                  >
                    {PAYMENT_FREQUENCY_OPTIONS.map((frequency) => (
                      <Label
                        key={frequency.value}
                        htmlFor={`paymentFrequency-${frequency.value}`}
                        className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-slate-50 text-sm"
                      >
                        <RadioGroupItem
                          disabled={!isEditing}
                          value={frequency.value}
                          id={`paymentFrequency-${frequency.value}`}
                        />
                        <span>{frequency.label}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-olive-100 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
            <article>
              <h3 className="text-base font-medium">Payment start day</h3>
              <p className="text-sm text-slate-500">
                Set the day from which TimerX will start tracking payments and
                generating reports.
              </p>
            </article>

            <div className="space-y-2 flex justify-end items-center">
              <FormField
                control={form.control}
                name="paymentStartDay"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl className="w-full">
                      <Select
                        disabled={!isEditing}
                        options={PAYMENT_START_DAY_OPTIONS}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </section>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activePath={pathname}
      />

      <main className="flex-1 flex flex-col overflow-y-auto">
        <Header
          organizationName="Organization Name"
          pageTitle={pageTitle}
          pageDescription={pageDescription}
          showDatePicker={false}
          showFilter={false}
          showSearch={false}
          onSidebarOpen={() => setIsSidebarOpen(true)}
        />

        <section className="container mx-auto px-4 md:px-8">
          <div className="flex-1">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex flex-wrap space-x-8">
                <button
                  onClick={() => setActiveTab('general')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'general'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  General
                </button>
                <button
                  onClick={() => setActiveTab('companyInformation')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'companyInformation'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Company Information
                </button>
                <button
                  onClick={() => setActiveTab('wagesAndOverTime')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'wagesAndOverTime'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Wages & Overtime
                </button>
                <button
                  onClick={() => setActiveTab('workPolicy')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'workPolicy'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Work Policy
                </button>
              </nav>
            </div>

            <div>
              {activeTab === 'general' && renderGeneralTab()}
              {activeTab === 'companyInformation' && companyInformationTab()}
              {activeTab === 'wagesAndOverTime' && wagesAndOverTimeTab()}
              {activeTab === 'workPolicy' && workPolicyTab()}
            </div>
          </div>
        </section>

        <SetBreakTimesModal
          isOpen={isBreakTimesModalOpen}
          onClose={() => setIsBreakTimesModalOpen(false)}
          breakTimes={breakTimes}
          setBreakTimes={setBreakTimes}
        />
      </main>
    </div>
  );
}

// --- Start For editing and displaying rules ---

const EditRulesTable = ({
  saveAwardRates,
  initialAwardRates,
}: {
  saveAwardRates: (data: AwardRateData[]) => void;
  initialAwardRates: AwardRateData[];
}) => {
  const [awardRates, setAwardRates] =
    useState<AwardRateData[]>(initialAwardRates);

  const awardRatesForm = useForm<AwardRateData>({
    resolver: zodResolver(awardRateSchema),
    defaultValues: {
      age: '',
      rate: 0,
      minimumTenure: '',
    },
  });

  const handleSaveAwardRates = (data: AwardRateData) => {
    const updatedAwardRates = [...awardRates, data];
    setAwardRates(updatedAwardRates);
    saveAwardRates(updatedAwardRates);

    // Reset form after saving
    awardRatesForm.reset({
      age: '',
      rate: 0,
      minimumTenure: '',
    });
  };

  const renderRow = () => {
    return (
      <TableRow className="w-full">
        <TableCell>
          <FormField
            control={awardRatesForm.control}
            name="age"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="w-full">
                  <Input
                    placeholder="eg. 18 or <18  (less than 18)"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TableCell>
        <TableCell>
          <FormField
            control={awardRatesForm.control}
            name="rate"
            render={({ field: { onChange, ...rest } }) => (
              <FormItem className="w-full">
                <FormControl className="w-full">
                  <Input
                    placeholder="Rate"
                    type="number"
                    onChange={(e) => onChange(Number(e.target.value))}
                    {...rest}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TableCell>
        <TableCell>
          <FormField
            control={awardRatesForm.control}
            name="minimumTenure"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="w-full">
                  <Input placeholder="eg. 3 or <2  (less than 2)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Table className="w-max">
      <TableHeader>
        <TableRow>
          <TableHead>Age</TableHead>
          <TableHead>Rate ($/hour)</TableHead>
          <TableHead className="flex items-center gap-2">
            Minimum Tenure
            <Image
              src="/admin-settings/info.svg"
              alt="Info"
              width={16}
              height={16}
            />
          </TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {awardRates.map((rate, index) => (
          <TableRow key={index}>
            <TableCell>{rate.age}</TableCell>
            <TableCell>${rate.rate}/hour</TableCell>
            <TableCell>{rate.minimumTenure}</TableCell>
            <TableCell>
              <Button
                variant="ghost"
                leftIcon={
                  <Image
                    src="/admin-settings/trash.svg"
                    alt="Delete"
                    width={25}
                    height={25}
                  />
                }
                onClick={() => {
                  const updatedRates = [...awardRates];
                  updatedRates.splice(index, 1);
                  setAwardRates(updatedRates);
                  saveAwardRates(updatedRates);
                }}
              ></Button>
            </TableCell>
          </TableRow>
        ))}
        {renderRow()}
      </TableBody>

      <TableCaption className="flex py-6 px-6">
        <Button
          variant="ghost"
          type="button"
          size="md"
          leftIcon={
            <Image
              src="/admin-settings/add.svg"
              alt="Add"
              width={12}
              height={12}
            />
          }
          onClick={awardRatesForm.handleSubmit(handleSaveAwardRates)}
        >
          Add new entry
        </Button>
      </TableCaption>
    </Table>
  );
};

const DisplayRulesTable = ({ awardRates }: { awardRates: AwardRateData[] }) => {
  return (
    <Table className="w-max">
      <TableHeader>
        <TableRow>
          <TableHead>Age</TableHead>
          <TableHead>Rate ($/hour)</TableHead>
          <TableHead className="flex items-center gap-2">
            Minimum Tenure
            <Image
              src="/admin-settings/info.svg"
              alt="Info"
              width={16}
              height={16}
            />
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {awardRates.map((awardRate, index) => (
          <TableRow key={index}>
            <TableCell>{awardRate.age}</TableCell>
            <TableCell>{awardRate.rate}</TableCell>
            <TableCell>{awardRate.minimumTenure}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

// --- Set break time modal ---

const SetBreakTimesModal = ({
  isOpen,
  onClose,
  breakTimes,
  setBreakTimes,
}: {
  isOpen: boolean;
  onClose: () => void;
  breakTimes: BreakTimeData[];
  setBreakTimes: React.Dispatch<React.SetStateAction<BreakTimeData[]>>;
}) => {
  const [localBreakTimes, setLocalBreakTimes] = useState<
    {
      type: string;
      timeInMinutes: number | string;
      id: string;
      isPaid: boolean;
    }[]
  >([]);

  useEffect(() => {
    // Initialize local state with current break times or a default empty one
    if (breakTimes.length > 0) {
      setLocalBreakTimes(
        breakTimes.map((breakTime) => ({
          ...breakTime,
          id: Math.random().toString(),
        }))
      );
    } else {
      setLocalBreakTimes([
        {
          type: '',
          timeInMinutes: '',
          id: Math.random().toString(),
          isPaid: false,
        },
      ]);
    }
  }, [breakTimes, isOpen]);

  const handleAddBreakType = () => {
    setLocalBreakTimes([
      ...localBreakTimes,
      {
        type: '',
        timeInMinutes: '',
        id: Math.random().toString(),
        isPaid: false,
      },
    ]);
  };

  const handleRemoveBreakType = (id: string) => {
    setLocalBreakTimes(
      localBreakTimes.filter((breakTime) => breakTime.id !== id)
    );
  };

  const handleInputChange = (
    id: string,
    field: 'type' | 'timeInMinutes' | 'isPaid',
    value?: string,
    isPaid?: boolean
  ) => {
    setLocalBreakTimes(
      localBreakTimes.map((breakTime) => {
        if (breakTime.id === id) {
          if (field === 'isPaid') {
            return {
              ...breakTime,
              isPaid: isPaid || false,
            };
          }
          return {
            ...breakTime,
            [field]: value || '',
          };
        }
        return breakTime;
      })
    );
  };

  const handleSaveChanges = () => {
    // Validate inputs
    const isValid = localBreakTimes.every(
      (breakTime) => breakTime.type && breakTime.timeInMinutes !== ''
    );

    if (!isValid) {
      // Show error or handle invalid inputs
      return;
    }

    // Convert to proper BreakTimeData format
    const formattedBreakTimes = localBreakTimes.map((breakTime) => ({
      type: breakTime.type,
      timeInMinutes: Number(breakTime.timeInMinutes),
      isPaid: breakTime.isPaid,
    }));

    setBreakTimes(formattedBreakTimes);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="px-6 sm:max-w-lg flex flex-col bg-white h-[calc(100vh-50px)]">
        <DialogHeader className="pt-2">
          <DialogTitle className="text-xl font-medium">
            Set break times
          </DialogTitle>
        </DialogHeader>

        <section className="h-[calc(100vh-10rem)] flex flex-col justify-between">
          <div className="space-y-6 overflow-y-auto">
            {localBreakTimes.map((breakTime, index) => (
              <div key={breakTime.id} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Type of break
                  </label>
                  <Input
                    value={breakTime.type}
                    onChange={(e) =>
                      handleInputChange(breakTime.id, 'type', e.target.value)
                    }
                    placeholder="Enter name of break"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Allotted break time (in minutes)
                  </label>
                  <Input
                    type="number"
                    value={breakTime.timeInMinutes}
                    onChange={(e) =>
                      handleInputChange(
                        breakTime.id,
                        'timeInMinutes',
                        e.target.value
                      )
                    }
                    placeholder="Enter allotted break time"
                  />
                </div>

                <div>
                  <Label>
                    <Checkbox
                      checked={breakTime.isPaid}
                      onCheckedChange={(checked) =>
                        handleInputChange(
                          breakTime.id,
                          'isPaid',
                          '',
                          checked ? true : false
                        )
                      }
                    />
                    Mark break as paid
                  </Label>
                </div>

                {index > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500"
                    onClick={() => handleRemoveBreakType(breakTime.id)}
                  >
                    <Image
                      src="/admin-settings/trash.svg"
                      alt="Remove"
                      width={16}
                      height={16}
                      className="mr-1"
                    />{' '}
                    Remove
                  </Button>
                )}

                {index < localBreakTimes.length - 1 && <hr className="my-4" />}
              </div>
            ))}

            <Button
              variant="ghost"
              className="text-primary"
              onClick={handleAddBreakType}
              leftIcon={
                <Image
                  src="/admin-settings/add.svg"
                  alt="Add"
                  width={15}
                  height={15}
                />
              }
            >
              Add new break type
            </Button>
          </div>

          <DialogFooter className="grid grid-cols-1 md:grid-cols-2 mt-4">
            <Button
              variant="secondary"
              onClick={onClose}
              leftIcon={
                <Image
                  src="/admin-settings/cancel.svg"
                  alt="Cancel"
                  width={16}
                  height={16}
                />
              }
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveChanges}
              leftIcon={
                <Image
                  src="/admin-settings/check-white.svg"
                  alt="Save"
                  width={16}
                  height={16}
                />
              }
            >
              Save changes
            </Button>
          </DialogFooter>
        </section>
      </DialogContent>
    </Dialog>
  );
};
