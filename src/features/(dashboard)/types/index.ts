export type NavItem = {
  name: string;
  iconAlt: string;
  icon: string;
  href: string;
};

// ---- Dashboard ----

// Define the structure of an adjustment item
export interface AdjustmentItem {
  id: string;
  staffId: string;
  staffName: string;
  date: string;
  overtime: string;
  reason: string;
  email: string;
}

export interface StatsData {
  totalActiveStaff: {
    value: number;
    percentageChange?: number;
    positiveChange?: boolean;
  };
  hoursWorkedThisWeek: {
    value: number;
    percentageChange?: number;
    positiveChange?: boolean;
  };
  grossWagesThisWeek: {
    value: number;
    percentageChange?: number;
    positiveChange?: boolean;
  };
  pendingAdjustments: {
    value: number;
    percentageChange?: number;
    positiveChange?: boolean;
  };
}

export type BarChartFilterPeriod = '12m' | '30d' | '7d' | '24h'; // For dashboard hours worked chart

export interface AdjustmentModalData {
  // For the adjustment request modal in the dashboard
  name: string;
  email: string;
  date: string; // Display-formatted date string
  overtime: string; // e.g., "2 hours", "45 minutes"
  reason: string;
}

export interface Filters {
  // Used for filtering data in both Dashboard and Staff list
  teams: Record<string, boolean>; // Key: team name, Value: isSelected
  roles: Record<string, boolean>; // Key: role name, Value: isSelected
}

export interface StatItem {
  value: string;
  percentageChange?: string | null;
  changeDirection?: string | null; // "up" or "down"
}

export interface BarChartDataItem {
  // For dashboard bar chart
  name: string; // e.g., "Jan", "Mon"
  hours: number;
}

export interface PieChartDataItem {
  // For dashboard pie chart
  name: string; // e.g., "Engineering", "Sales"
  value: number; // e.g., wage amount
  // color: string; // Hex color code for the pie slice
}

export interface HoursWorkedChartProps {
  data: {
    last12Months: {
      totalHoursWorked: number;
      dataPoints: {
        label: string;
        name?: string;
        value: number;
      }[];
    };
    last30Days: {
      totalHoursWorked: number;
      dataPoints: {
        name?: string;
        label: string;
        value: number;
      }[];
    };
    last7Days: {
      totalHoursWorked: number;
      dataPoints: {
        name?: string;
        label: string;
        value: number;
      }[];
    };
    last24Hours: {
      totalHoursWorked: number;
      dataPoints: {
        name?: string;
        label: string;
        value: number;
      }[];
    };
  };
  isLoading: boolean;
}

export interface DataPoint {
  name?: string;
  label: string;
  value: number;
}

// ---- Staff ----
export type StaffStatus = 'active' | 'inactive';

export interface Break {
  id?: string;
  from: string; // ISO datetime string
  to: string; // ISO datetime string
  type?: string; // e.g., "lunch", "short_break"
}

export interface TimeLog {
  id: string;
  date: string; // ISO date string 'YYYY-MM-DD'
  clockInTime: string; // ISO datetime string
  clockOutTime: string | null; // ISO datetime string, null if currently clocked in
  breaks: Break[];
}

export interface Address {
  line1?: string;
  streetName?: string; // Could also be line2 or street
  city?: string;
  postcode?: string;
  state?: string; // e.g., VIC, NSW
  country?: string; // e.g., Australia
}

export interface EmergencyContact {
  relationship?: string; // e.g., Spouse, Parent, Sibling
  name?: string;
  phoneNumber?: string;
  address?: string; // As per UI, this is a single string field
}

export interface FinancialInformation {
  taxFileNumber?: string;
  bankBSB?: string; // Bank State Branch number
  accountName?: string;
  accountNumber?: string;
  superFundName?: string; // Superannuation fund name
  fundABN?: string; // Australian Business Number for the super fund
  memberNumber?: string; // Superannuation member number
}

export type WageType = 'manual' | 'team_based' | 'award_rate';

export interface WageDetails {
  type?: WageType;
  manualRatePerHour?: number | string; // Store as string for form input, convert to number for storage/calculation
  currency?: string; // e.g., "AUD", "USD", "NGN"
  // For 'team_based' or 'award_rate', the actual rate might be derived from other system settings or team configurations.
}

export interface StaffMember {
  id: string; // Unique identifier
  title?: string; // e.g., Mr, Ms, Mrs, Dr
  firstName: string;
  otherNames?: string; // Middle name(s)
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: string; // Job title or position
  team?: string; // Department or group
  status: StaffStatus; // Employment status

  // Detailed Information (often optional for list views, but present for detail/edit views)
  homeAddress?: Address;
  emergencyContact?: EmergencyContact;
  financialInformation?: FinancialInformation;
  wageDetails?: WageDetails;

  // Fields from Dashboard context, potentially part of a broader staff profile
  timeLogs?: TimeLog[]; // Array of time log entries
  latestAdjustment?: {
    // Example from dashboard, could be part of a payroll or adjustments module
    date: string;
    overtime: string;
    reason: string;
  };
  wageType?: WageType;
  manualRatePerHour?: number | undefined;
  teamBasedRate?: number | undefined;
  awardRate?: number | undefined;
}

// For API response when fetching a list of staff members (includes pagination info)
export interface StaffDataResponse {
  staffs: StaffMember[];
  totalCount: number; // Total number of staff members matching filters
  page: number; // Current page number
  pageSize: number; // Number of items per page
}

// For representing a row of data during CSV import review
export interface StaffImportRow {
  id: string; // Temporary client-side ID for the review table row
  name?: string; // Full name from CSV
  email?: string;
  team?: string; // Team from CSV
  status: 'new' | 'duplicate_email' | 'error'; // Status after initial validation
  errorMessage?: string; // Description of error if status is 'error' or 'duplicate_email'
}

// For Add/Edit Staff forms (typically a subset of StaffMember, without ID for new staff)
// This helps in defining form structures, especially with libraries like React Hook Form and Zod.
export type StaffFormData = Omit<
  StaffMember,
  'id' | 'timeLogs' | 'latestAdjustment' | 'status'
> & {
  // ID is usually generated by the backend or present for edits.
  // Status might be set separately or have a default during creation.
  // profileImageUrl is typically handled via a separate upload mechanism.
  // timeLogs and latestAdjustment are usually managed by other modules.
};
