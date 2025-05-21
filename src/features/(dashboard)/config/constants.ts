import { StaffStatus } from '@/features/(dashboard)/types';

export const PIE_CHART_COLORS = [
  '#D8E0DD',
  '#9DB2AA',
  '#8AA399',
  '#738880',
  '#5C6D66',
];

export const DEFAULT_DATE_RANGE_MONTHS = 'year'; // For initial date range setting

export const STAFF_STATUS_OPTIONS: { value: StaffStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Pending Onboarding' },
];
