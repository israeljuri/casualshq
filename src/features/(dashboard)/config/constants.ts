import { StaffStatus, WageType } from '../types/staff.type';

export const PIE_CHART_COLORS = [
  '#D8E0DD',
  '#9DB2AA',
  '#8AA399',
  '#738880',
  '#5C6D66',
];

export const DEFAULT_DATE_RANGE_MONTHS = '12m';

export const STAFF_STATUS_OPTIONS: { value: StaffStatus; label: string }[] = [
  { value: 'clocked_in', label: 'Clocked In' },
  { value: 'clocked_out', label: 'Clocked Out' },
  { value: 'pending_onboarding', label: 'Pending Onboarding' },
];

export const WAGE_TYPE_OPTIONS: { value: WageType; label: string }[] = [
  { value: 'manual', label: 'Manual' },
  { value: 'team_based', label: 'From team' },
  { value: 'award_rate', label: 'From award rate' },
];

export const WAGE_TYPE_OPTIONS_FORM: { value: WageType; label: string }[] = [
  { value: 'manual', label: 'Manual' },
  { value: 'team_based', label: 'Team' },
  { value: 'award_rate', label: 'Award rate' },
];

export const RATE_OPTIONS_FORM: { value: string; label: string }[] = [
  { value: 'amount', label: 'Amount' },
  { value: 'percentage', label: 'Percentage' },
];

export const PAYMENT_FREQUENCY_OPTIONS: { value: string; label: string }[] = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Biweekly' },
  { value: 'monthly', label: 'Monthly' },
];

export const PAYMENT_START_DAY_OPTIONS: { value: string; label: string }[] = [
  { value: 'sunday', label: 'Sunday' },
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
];

export const TIMEZONE_OPTIONS: { value: string; label: string }[] = [
  { value: 'Pacific/Midway', label: '(GMT-11:00) Midway Island' },
  { value: 'America/Adak', label: '(GMT-10:00) Hawaii-Aleutian' },
  { value: 'Pacific/Honolulu', label: '(GMT-10:00) Hawaii' },
  { value: 'America/Anchorage', label: '(GMT-09:00) Alaska' },
  {
    value: 'America/Los_Angeles',
    label: '(GMT-08:00) Pacific Time (US & Canada)',
  },
  { value: 'America/Denver', label: '(GMT-07:00) Mountain Time (US & Canada)' },
  { value: 'America/Chicago', label: '(GMT-06:00) Central Time (US & Canada)' },
  {
    value: 'America/New_York',
    label: '(GMT-05:00) Eastern Time (US & Canada)',
  },
  { value: 'America/Caracas', label: '(GMT-04:00) Caracas' },
  { value: 'America/Santiago', label: '(GMT-04:00) Santiago' },
  { value: 'America/Halifax', label: '(GMT-04:00) Atlantic Time (Canada)' },
  { value: 'America/St_Johns', label: '(GMT-03:30) Newfoundland' },
  {
    value: 'America/Argentina/Buenos_Aires',
    label: '(GMT-03:00) Buenos Aires',
  },
  { value: 'America/Sao_Paulo', label: '(GMT-03:00) Brasilia' },
  { value: 'Atlantic/South_Georgia', label: '(GMT-02:00) Mid-Atlantic' },
  { value: 'Atlantic/Azores', label: '(GMT-01:00) Azores' },
  { value: 'Europe/London', label: '(GMT+00:00) London' },
  { value: 'UTC', label: '(GMT+00:00) UTC' },
  { value: 'Europe/Berlin', label: '(GMT+01:00) Berlin' },
  { value: 'Europe/Paris', label: '(GMT+01:00) Paris' },
  { value: 'Africa/Lagos', label: '(GMT+01:00) Lagos' },
  { value: 'Europe/Athens', label: '(GMT+02:00) Athens' },
  { value: 'Africa/Cairo', label: '(GMT+02:00) Cairo' },
  { value: 'Africa/Johannesburg', label: '(GMT+02:00) Johannesburg' },
  { value: 'Europe/Moscow', label: '(GMT+03:00) Moscow' },
  { value: 'Asia/Baghdad', label: '(GMT+03:00) Baghdad' },
  { value: 'Asia/Tehran', label: '(GMT+03:30) Tehran' },
  { value: 'Asia/Dubai', label: '(GMT+04:00) Dubai' },
  { value: 'Asia/Baku', label: '(GMT+04:00) Baku' },
  { value: 'Asia/Kabul', label: '(GMT+04:30) Kabul' },
  { value: 'Asia/Karachi', label: '(GMT+05:00) Karachi' },
  { value: 'Asia/Tashkent', label: '(GMT+05:00) Tashkent' },
  { value: 'Asia/Kolkata', label: '(GMT+05:30) India Standard Time' },
  { value: 'Asia/Kathmandu', label: '(GMT+05:45) Kathmandu' },
  { value: 'Asia/Dhaka', label: '(GMT+06:00) Dhaka' },
  { value: 'Asia/Yekaterinburg', label: '(GMT+05:00) Yekaterinburg' },
  { value: 'Asia/Bangkok', label: '(GMT+07:00) Bangkok' },
  { value: 'Asia/Jakarta', label: '(GMT+07:00) Jakarta' },
  { value: 'Asia/Shanghai', label: '(GMT+08:00) China Standard Time' },
  { value: 'Asia/Singapore', label: '(GMT+08:00) Singapore' },
  { value: 'Asia/Tokyo', label: '(GMT+09:00) Tokyo' },
  { value: 'Asia/Seoul', label: '(GMT+09:00) Seoul' },
  { value: 'Australia/Adelaide', label: '(GMT+09:30) Adelaide' },
  { value: 'Australia/Sydney', label: '(GMT+10:00) Sydney' },
  { value: 'Pacific/Guam', label: '(GMT+10:00) Guam' },
  { value: 'Asia/Vladivostok', label: '(GMT+10:00) Vladivostok' },
  { value: 'Asia/Magadan', label: '(GMT+11:00) Magadan' },
  { value: 'Pacific/Auckland', label: '(GMT+12:00) Auckland' },
  { value: 'Pacific/Fiji', label: '(GMT+12:00) Fiji' },
];
