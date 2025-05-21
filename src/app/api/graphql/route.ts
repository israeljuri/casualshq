/* eslint-disable @typescript-eslint/no-explicit-any */
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { StaffMember, StaffStatus } from '@/features/(dashboard)/types';
import { AdjustmentItem } from '@/features/(dashboard)/graphql/queries/recentAdjustments';
import {
  differenceInMinutes,
  parseISO,
  eachDayOfInterval,
  format,
  subMonths,
  subDays,
  subHours,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  eachMonthOfInterval,
  getYear,
  isWithinInterval,
} from 'date-fns';

// Define interfaces for our modular data structure
interface Role {
  id: string;
  name: string;
  baseHourlyRate: number;
}

interface Team {
  id: string;
  name: string;
  roles: string[]; // Array of role IDs associated with this team
}

interface Staff {
  id: string;
  title?: string;
  firstName: string;
  lastName: string;
  otherNames?: string;
  email: string;
  phoneNumber?: string;
  roleId: string; // Reference to a role
  teamId: string; // Reference to a team
  status: StaffStatus; // 'active', 'inactive', etc.
  homeAddress?: any;
  emergencyContact?: any;
  financialInformation?: any;
  wageDetails?: any;
  latestAdjustment?: any;
}

interface Timelog {
  id: string;
  staffId: string;
  date: string;
  clockInTime: string;
  clockOutTime: string;
  breaks: {
    startTime: string;
    endTime: string;
    type: string;
  }[];
}

// Mock data - Roles
const mockRoles: Role[] = [
  { id: 'R001', name: 'Senior_Developer', baseHourlyRate: 55.75 },
  { id: 'R002', name: 'Marketing_Manager', baseHourlyRate: 48.5 },
  { id: 'R003', name: 'Sales_Representative', baseHourlyRate: 42.25 },
  { id: 'R004', name: 'Data_Scientist', baseHourlyRate: 62.0 },
  { id: 'R005', name: 'IT_Support_Specialist', baseHourlyRate: 38.5 },
];

// Mock data - Teams
const mockTeams: Team[] = [
  { id: 'T001', name: 'Engineering', roles: ['R001', 'R004'] },
  { id: 'T002', name: 'Marketing', roles: ['R002'] },
  { id: 'T003', name: 'Sales', roles: ['R003'] },
  { id: 'T004', name: 'Analytics', roles: ['R004'] },
  { id: 'T005', name: 'IT_Operations', roles: ['R005'] },
];

// Mock data - Adjustmets Requests
const adjustmentRequestsDataStore: AdjustmentItem[] = [
  {
    id: 'ADJ001',
    staffId: 'SM001',
    staffName: 'John Michael Smith',
    date: '2025-05-18',
    overtime: '2 hours',
    reason: 'Client deadline.',
    email: 'john.smith@example.com',
  },
  {
    id: 'ADJ002',
    staffId: 'SM002',
    staffName: 'Sarah Jones',
    date: '2025-05-19',
    overtime: '1 hour 45 minutes',
    reason: 'System updates.',
    email: 'sarah.jones@example.com',
  },
  {
    id: 'ADJ003',
    staffId: 'SM003',
    staffName: 'David Lee',
    date: '2025-05-20',
    overtime: '52 minutes',
    reason: 'Customer issue.',
    email: 'david.lee@example.com',
  },
  {
    id: 'ADJ004',
    staffId: 'SM001',
    staffName: 'John Michael Smith',
    date: '2025-05-10',
    overtime: '3 hours',
    reason: 'Old request.',
    email: 'john.smith@example.com',
  },
];

// Mock data - Staff members
const mockStaff: Staff[] = [
  {
    id: 'SM001',
    title: 'Mr',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    roleId: 'R001',
    teamId: 'T001',
    status: 'active',
    wageDetails: { type: 'manual', manualRatePerHour: 55.75 },
  },
  {
    id: 'SM002',
    title: 'Ms',
    firstName: 'Sarah',
    lastName: 'Jones',
    email: 'sarah.jones@example.com',
    roleId: 'R002',
    teamId: 'T002',
    status: 'active',
    wageDetails: { type: 'award_rate' },
  },
  {
    id: 'SM003',
    firstName: 'David',
    lastName: 'Lee',
    email: 'david.lee@example.com',
    roleId: 'R003',
    teamId: 'T003',
    status: 'active',
    wageDetails: { type: 'team_based' },
  },
  {
    id: 'SM004',
    firstName: 'Emily',
    lastName: 'Wang',
    email: 'emily.wang@example.com',
    roleId: 'R004',
    teamId: 'T004',
    status: 'active',
    wageDetails: { type: 'manual', manualRatePerHour: 62.0 },
  },
  {
    id: 'SM005',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@example.com',
    roleId: 'R005',
    teamId: 'T005',
    status: 'active',
    wageDetails: { type: 'award_rate' },
  },
  {
    id: 'SM006',
    firstName: 'Jessica',
    lastName: 'Davis',
    email: 'jessica.davis@example.com',
    roleId: 'R001',
    teamId: 'T001',
    status: 'active',
    wageDetails: { type: 'award_rate' },
  },
];

// Mock data - Timelogs - Ensure dates are varied to test relative periods
const MOCK_NOW = new Date('2025-05-21T12:00:00Z'); // Fixed "now" for consistent mock data

const timelogs = [
  // Recent logs for SM001 (Engineering, Senior Dev)
  {
    id: 'log-SM001-curr1',
    staffId: 'SM001',
    date: format(subDays(MOCK_NOW, 1), 'yyyy-MM-dd'),
    clockInTime: subDays(MOCK_NOW, 1)
      .toISOString()
      .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '09:00:00Z'),
    clockOutTime: subDays(MOCK_NOW, 1)
      .toISOString()
      .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '17:30:00Z'),
    breaks: [
      {
        startTime: subDays(MOCK_NOW, 1)
          .toISOString()
          .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '12:30:00Z'),
        endTime: subDays(MOCK_NOW, 1)
          .toISOString()
          .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '13:00:00Z'),
        type: 'Lunch',
      },
    ],
  },
  {
    id: 'log-SM001-curr2',
    staffId: 'SM001',
    date: format(subDays(MOCK_NOW, 2), 'yyyy-MM-dd'),
    clockInTime: subDays(MOCK_NOW, 2)
      .toISOString()
      .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '09:00:00Z'),
    clockOutTime: subDays(MOCK_NOW, 2)
      .toISOString()
      .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '17:00:00Z'),
    breaks: [
      {
        startTime: subDays(MOCK_NOW, 2)
          .toISOString()
          .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '12:30:00Z'),
        endTime: subDays(MOCK_NOW, 2)
          .toISOString()
          .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '13:00:00Z'),
        type: 'Lunch',
      },
    ],
  },
  {
    id: 'log-SM001-prev1',
    staffId: 'SM001',
    date: format(subDays(MOCK_NOW, 8), 'yyyy-MM-dd'),
    clockInTime: subDays(MOCK_NOW, 8)
      .toISOString()
      .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '09:00:00Z'),
    clockOutTime: subDays(MOCK_NOW, 8)
      .toISOString()
      .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '17:00:00Z'),
    breaks: [
      {
        startTime: subDays(MOCK_NOW, 8)
          .toISOString()
          .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '12:30:00Z'),
        endTime: subDays(MOCK_NOW, 8)
          .toISOString()
          .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '13:00:00Z'),
        type: 'Lunch',
      },
    ],
  },
  {
    id: 'log-SM003-curr1',
    staffId: 'SM003',
    date: format(subDays(MOCK_NOW, 3), 'yyyy-MM-dd'),
    clockInTime: subDays(MOCK_NOW, 3)
      .toISOString()
      .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '10:00:00Z'),
    clockOutTime: subDays(MOCK_NOW, 3)
      .toISOString()
      .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '18:00:00Z'),
    breaks: [
      {
        startTime: subDays(MOCK_NOW, 3)
          .toISOString()
          .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '13:00:00Z'),
        endTime: subDays(MOCK_NOW, 3)
          .toISOString()
          .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '13:45:00Z'),
        type: 'Lunch',
      },
    ],
  },
  {
    id: 'log-SM004-month1',
    staffId: 'SM004',
    date: format(subMonths(MOCK_NOW, 1), 'yyyy-MM-dd'),
    clockInTime: subMonths(MOCK_NOW, 1)
      .toISOString()
      .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '08:30:00Z'),
    clockOutTime: subMonths(MOCK_NOW, 1)
      .toISOString()
      .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '16:30:00Z'),
    breaks: [
      {
        startTime: subMonths(MOCK_NOW, 1)
          .toISOString()
          .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '12:00:00Z'),
        endTime: subMonths(MOCK_NOW, 1)
          .toISOString()
          .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '12:30:00Z'),
        type: 'Lunch',
      },
    ],
  },
  {
    id: 'log-SM006-curr1',
    staffId: 'SM006',
    date: format(subDays(MOCK_NOW, 0), 'yyyy-MM-dd'),
    clockInTime: subDays(MOCK_NOW, 0)
      .toISOString()
      .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '10:00:00Z'),
    clockOutTime: subDays(MOCK_NOW, 0)
      .toISOString()
      .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '14:00:00Z'),
    breaks: [],
  },
  {
    id: 'log-SM006-curr2',
    staffId: 'SM006',
    date: format(subDays(MOCK_NOW, 6), 'yyyy-MM-dd'),
    clockInTime: subDays(MOCK_NOW, 6)
      .toISOString()
      .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '09:00:00Z'),
    clockOutTime: subDays(MOCK_NOW, 6)
      .toISOString()
      .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '17:00:00Z'),
    breaks: [
      {
        type: 'Lunch',
        startTime: subDays(MOCK_NOW, 6)
          .toISOString()
          .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '12:00:00Z'),
        endTime: subDays(MOCK_NOW, 6)
          .toISOString()
          .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '12:30:00Z'),
      },
    ],
  },
  ...Array.from({ length: 50 }).map((_, i) => ({
    id: `log-SM001-hist-${i}`,
    staffId: 'SM001',
    date: format(subDays(MOCK_NOW, 10 + i * 3), 'yyyy-MM-dd'),
    clockInTime: subDays(MOCK_NOW, 10 + i * 3)
      .toISOString()
      .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '09:00:00Z'),
    clockOutTime: subDays(MOCK_NOW, 10 + i * 3)
      .toISOString()
      .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, `${16 + (i % 3)}:00:00Z`),
    breaks: [
      {
        type: 'Lunch',
        startTime: subDays(MOCK_NOW, 10 + i * 3)
          .toISOString()
          .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '12:00:00Z'),
        endTime: subDays(MOCK_NOW, 10 + i * 3)
          .toISOString()
          .replace(/\d{2}:\d{2}:\d{2}\.\d{3}Z$/, '12:30:00Z'),
      },
    ],
  })),
];

const staffDataStore: Staff[] = [...mockStaff];
const rolesDataStore: Role[] = [...mockRoles];
const teamsDataStore: Team[] = [...mockTeams];
const timelogsDataStore: Timelog[] = [...timelogs];

const convertToStaffMember = (staff: Staff): StaffMember => {
  const role = rolesDataStore.find((r) => r.id === staff.roleId);
  const team = teamsDataStore.find((t) => t.id === staff.teamId);
  return {
    id: staff.id,
    title: staff.title,
    firstName: staff.firstName,
    lastName: staff.lastName,
    otherNames: staff.otherNames,
    email: staff.email,
    phoneNumber: staff.phoneNumber,
    role: role?.name || 'Unknown Role',
    team: team?.name || 'Unknown Team',
    status: staff.status,
    homeAddress: staff.homeAddress,
    emergencyContact: staff.emergencyContact,
    financialInformation: staff.financialInformation,
    wageDetails: staff.wageDetails,
  };
};
const getStaffMemberStore = (): StaffMember[] =>
  staffDataStore.map(convertToStaffMember);
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getStaffHourlyRate = (staffId: string): number => {
  const staff = staffDataStore.find((s) => s.id === staffId);
  if (!staff) return 0;
  const role = rolesDataStore.find((r) => r.id === staff.roleId);
  const baseRate = role?.baseHourlyRate || 0;
  if (staff.wageDetails) {
    switch (staff.wageDetails.type) {
      case 'manual':
        return staff.wageDetails.manualRatePerHour || baseRate;
      case 'award_rate':
        return baseRate * 0.8;
      case 'team_based':
        return baseRate;
      default:
        return baseRate;
    }
  }
  return baseRate;
};

// GraphQL schema
const typeDefs = `#graphql
  type Query {
    staffRoles: [String!]!
    staffTeams: [String!]!
    staffs(page: Int, pageSize: Int, filters: StaffFilterInput): StaffPaginatedResponse!
    staff(id: ID!): StaffMember
    recentAdjustments: [AdjustmentItem!]!
    hoursWorkedData(filter: HoursWorkedFilterInput): HoursWorkedCollection # Filter is now optional for team/role
    wageDistributionData(filter: WageDistributionFilterInput!): WageDistributionResponse!# Still requires date filters
    search(query: String!): SearchResults!
    stats: StatsResult! # No filter for stats query
  }
  
  type SearchResults {
    staff: [StaffMember!]!
    teams: [Team!]!
  }
  
  type Team {
    id: ID!
    name: String!
    description: String
  }

  type WageDistributionResponse {
    data: [WageDistributionItem!]!
  }

  type WageDistributionItem {
    name: String! 
    value: Float!
  }

  type HoursWorkedTimeSpan {
    totalHoursWorked: Float!
    dataPoints: [HoursWorkedDataPoint!]!
  }

  type HoursWorkedDataPoint {
    label: String! 
    value: Float! 
  }

  # Collection for the different relative time periods for hours worked
  type HoursWorkedCollection {
    last12Months: HoursWorkedTimeSpan
    last30Days: HoursWorkedTimeSpan
    last7Days: HoursWorkedTimeSpan
    last24Hours: HoursWorkedTimeSpan
  }

  input StaffFilterInput { 
    team: String
    role: String
    status: String
  }

  # Filter for hoursWorkedData, now optional and only for team/role
  input HoursWorkedFilterInput {
    teamId: ID
    roleId: ID
  }

  input TeamSelectionInput {
    Engineering: Boolean
    Marketing: Boolean
    Sales: Boolean
    Analytics: Boolean
    IT_Operations: Boolean 
  }

  input RoleSelectionInput {
    Senior_Developer: Boolean
    Marketing_Manager: Boolean
    Sales_Representative: Boolean
    Data_Scientist: Boolean
    IT_Support_Specialist: Boolean
  }

  # Filter for wageDistributionData remains, requiring date range
  input WageDistributionFilterInput {
    startDate: String!
    endDate: String!
    teams: TeamSelectionInput
    roles: RoleSelectionInput
  }
  
  type Address { 
    line1: String
    streetName: String 
    city: String 
    postcode: String 
    state: String 
    country: String 
  }
  type EmergencyContact { 
    relationship: String
    name: String 
    phoneNumber: String 
    address: String 
  }
  type FinancialInformation { 
    taxFileNumber: String 
    bankBSB: String 
    accountName: String 
    accountNumber: String 
    superFundName: String 
    fundABN: String 
    memberNumber: String 
  }
  type WageDetails { 
    type: String 
    manualRatePerHour: Float 
  }
  type AdjustmentItem { 
    id: ID! 
    staffId: String! 
    staffName: String! 
    date: String! 
    overtime: String! 
    reason: String! 
    email: String! 
  }

  type StaffMember { 
    id: ID! 
    title: String 
    firstName: String! 
    lastName: String! 
    otherNames: String 
    email: String! 
    phoneNumber: String 
    role: String! 
    team: String 
    status: String 
    profileImageUrl: String 
    hireDate: String 
    employmentType: String 
    homeAddress: Address 
    emergencyContact: EmergencyContact 
    financialInformation: FinancialInformation 
    wageDetails: WageDetails 
  }

  type StaffPaginatedResponse { 
    data: [StaffMember!]!
    totalCount: Int!
    page: Int!
    pageSize: Int!
    totalPages: Int!
  }

  # StatValue for individual metrics with change tracking
  type StatValue {
    value: Float!
    percentageChange: Float 
    positiveChange: Boolean 
  }

  # Summary of stats with change tracking
  type StatsSummary {
    totalActiveStaff: StatValue!
    hoursWorkedThisPeriod: StatValue! 
    grossWagesThisPeriod: StatValue!
    pendingAdjustments: StatValue! # Added pending adjustments
  }

  # Stats for individual staff members for the defined "ThisPeriod"
  type StaffStat { 
    staffId: String!
    totalHours: Float!
    totalWages: Float!
  }

  # Overall result for the stats query
  type StatsResult {
    staffStats: [StaffStat!]! 
    summary: StatsSummary!
  }
`;

// Helper function to calculate StatValue

// Helper to get staff details including names
const getStaffDetails = (
  staff: Staff
): { teamName?: string; roleName?: string; status: StaffStatus } => {
  const team = teamsDataStore.find((t) => t.id === staff.teamId);
  const role = rolesDataStore.find((r) => r.id === staff.roleId);
  return { teamName: team?.name, roleName: role?.name, status: staff.status };
};

// Helper to get timelogs and calculate hours/wages for a period
const getPeriodMetrics = (
  periodStart: Date,
  periodEnd: Date,
  staffIdsToConsider?: Set<string> // Optional: only consider these staff
): { totalHours: number; totalWages: number; activeStaffIds: Set<string> } => {
  let totalHours = 0;
  let totalWages = 0;
  const activeStaffIds = new Set<string>();

  const relevantLogs = timelogs.filter((log) => {
    const staffMember = staffDataStore.find((s) => s.id === log.staffId);
    if (!staffMember || staffMember.status !== 'active') return false; // Staff must be active

    const staffOk = staffIdsToConsider
      ? staffIdsToConsider.has(log.staffId)
      : true;
    if (!staffOk) return false;

    const logDate = parseISO(log.date);
    return isWithinInterval(logDate, { start: periodStart, end: periodEnd });
  });

  relevantLogs.forEach((log) => {
    activeStaffIds.add(log.staffId);
    const clockIn = parseISO(log.clockInTime);
    const clockOut = parseISO(log.clockOutTime);
    let minutesWorked = differenceInMinutes(clockOut, clockIn);
    log.breaks.forEach((brk) => {
      minutesWorked -= differenceInMinutes(
        parseISO(brk.endTime),
        parseISO(brk.startTime)
      );
    });
    const hours = minutesWorked > 0 ? minutesWorked / 60 : 0;
    totalHours += hours;
    totalWages += hours * getStaffHourlyRate(log.staffId);
  });

  return {
    totalHours: parseFloat(totalHours.toFixed(2)),
    totalWages: parseFloat(totalWages.toFixed(2)),
    activeStaffIds: activeStaffIds,
  };
};

const calculateStatValue = (
  currentValue: number,
  previousValue: number
): {
  value: number;
  percentageChange: number | null;
  positiveChange: boolean | null;
} => {
  let pC: number | null = null;
  let posC: boolean | null = null;
  if (previousValue !== 0) {
    pC = ((currentValue - previousValue) / previousValue) * 100;
    pC = parseFloat(pC.toFixed(2));
  } else if (currentValue > 0 && previousValue === 0) {
    pC = 100;
  } else if (currentValue === 0 && previousValue === 0) {
    pC = 0;
  }
  if (pC !== null) {
    posC = currentValue > previousValue;
    if (currentValue === previousValue) posC = null;
  }
  return {
    value: parseFloat(currentValue.toFixed(2)),
    percentageChange: pC,
    positiveChange: posC,
  };
};

const mapGraphQlNameToOriginal = (graphqlName: string): string => {
  return graphqlName.replace(/_/g, ' ');
};

// Resolvers
const resolvers = {
  Query: {
    staffs: async (
      _: any,
      {
        page = 1,
        pageSize = 10,
        filters = {},
      }: { page?: number; pageSize?: number; filters?: any }
    ) => {
      await delay(100);
      const staffMembers = getStaffMemberStore();
      let f = [...staffMembers];
      if (filters.team) f = f.filter((s) => s.team === filters.team);
      if (filters.role) f = f.filter((s) => s.role === filters.role);
      if (filters.status) f = f.filter((s) => s.status === filters.status);
      const sI = (page - 1) * pageSize;
      const eI = sI + pageSize;
      return {
        data: f.slice(sI, eI),
        totalCount: f.length,
        page,
        pageSize,
        totalPages: Math.ceil(f.length / pageSize),
      };
    },
    staff: async (_: any, { id }: { id: string }) => {
      await delay(100);
      const s = staffDataStore.find((staff) => staff.id === id);
      return s ? convertToStaffMember(s) : null;
    },
    staffRoles: async () => {
      await delay(50);
      return rolesDataStore.map((r) => r.name);
    },
    staffTeams: async () => {
      await delay(50);
      return teamsDataStore.map((t) => t.name);
    },
    search: async (_: any, { query }: { query: string }) => {
      await delay(100);
      const sq = query.toLowerCase();
      const sm = getStaffMemberStore();
      const ms = sm.filter(
        (s) =>
          `${s.firstName} ${s.lastName}`.toLowerCase().includes(sq) ||
          s.email.toLowerCase().includes(sq) ||
          s.role.toLowerCase().includes(sq) ||
          (s.team || '').toLowerCase().includes(sq)
      );
      const mt = teamsDataStore
        .filter((t) => t.name.toLowerCase().includes(sq))
        .map((t) => ({ id: t.id, name: t.name }));
      return { staff: ms, teams: mt };
    },
    recentAdjustments: async () => {
      await delay(100);
      return adjustmentRequestsDataStore.slice(0, 5);
    },

    // ----- STATS ----- (No filters)
    stats: async () => {
      await delay(400);
      const today = MOCK_NOW;

      // Define "This Period" and "Previous Period" (last 7 days vs. 7 days before that)
      const thisPeriodEnd = endOfDay(today);
      const thisPeriodStart = startOfDay(subDays(today, 6));

      const prevPeriodEnd = endOfDay(subDays(thisPeriodStart, 1));
      const prevPeriodStart = startOfDay(subDays(prevPeriodEnd, 6));

      // Get metrics for all active staff for these periods
      const allActiveStaffIds = new Set(
        staffDataStore.filter((s) => s.status === 'active').map((s) => s.id)
      );
      const thisPeriodMetrics = getPeriodMetrics(
        thisPeriodStart,
        thisPeriodEnd,
        allActiveStaffIds
      );
      const prevPeriodMetrics = getPeriodMetrics(
        prevPeriodStart,
        prevPeriodEnd,
        allActiveStaffIds
      );

      const totalActiveStaffStat = calculateStatValue(
        thisPeriodMetrics.activeStaffIds.size,
        prevPeriodMetrics.activeStaffIds.size
      );
      const hoursWorkedStat = calculateStatValue(
        thisPeriodMetrics.totalHours,
        prevPeriodMetrics.totalHours
      );
      const grossWagesStat = calculateStatValue(
        thisPeriodMetrics.totalWages,
        prevPeriodMetrics.totalWages
      );

      // Pending Adjustments: count adjustments whose date falls in "This Period" vs "Previous Period"
      const currentPendingAdjustmentsCount = adjustmentRequestsDataStore.filter(
        (adj) =>
          isWithinInterval(parseISO(adj.date), {
            start: thisPeriodStart,
            end: thisPeriodEnd,
          })
      ).length;
      const previousPendingAdjustmentsCount =
        adjustmentRequestsDataStore.filter((adj) =>
          isWithinInterval(parseISO(adj.date), {
            start: prevPeriodStart,
            end: prevPeriodEnd,
          })
        ).length;
      const pendingAdjustmentsStat = calculateStatValue(
        currentPendingAdjustmentsCount,
        previousPendingAdjustmentsCount
      );

      // StaffStats for "This Period" (only for staff who actually worked in this period)
      const staffStatsResult: {
        staffId: string;
        totalHours: number;
        totalWages: number;
      }[] = [];
      for (const staffId of thisPeriodMetrics.activeStaffIds) {
        // Iterate over staff who had logs in this period
        const staffLogsThisPeriod = timelogs.filter(
          (log) =>
            log.staffId === staffId &&
            isWithinInterval(parseISO(log.date), {
              start: thisPeriodStart,
              end: thisPeriodEnd,
            })
        );
        let staffTotalMinutes = 0;
        staffLogsThisPeriod.forEach((log) => {
          let minutes = differenceInMinutes(
            parseISO(log.clockOutTime),
            parseISO(log.clockInTime)
          );
          log.breaks.forEach((brk) => {
            minutes -= differenceInMinutes(
              parseISO(brk.endTime),
              parseISO(brk.startTime)
            );
          });
          staffTotalMinutes += minutes > 0 ? minutes : 0;
        });
        const staffTotalHours = parseFloat((staffTotalMinutes / 60).toFixed(2));
        if (staffTotalHours > 0) {
          const staffTotalWages = parseFloat(
            (staffTotalHours * getStaffHourlyRate(staffId)).toFixed(2)
          );
          staffStatsResult.push({
            staffId,
            totalHours: staffTotalHours,
            totalWages: staffTotalWages,
          });
        }
      }

      return {
        summary: {
          totalActiveStaff: totalActiveStaffStat,
          hoursWorkedThisPeriod: hoursWorkedStat,
          grossWagesThisPeriod: grossWagesStat,
          pendingAdjustments: pendingAdjustmentsStat,
        },
        staffStats: staffStatsResult,
      };
    },

    hoursWorkedData: async (
      _: any,
      {
        filter,
      }: {
        filter?: {
          teams?: Record<string, boolean>;
          roles?: Record<string, boolean>;
        };
      }
    ) => {
      await delay(350);
      const refDate = MOCK_NOW;

      const selectedTeamNames = filter?.teams
        ? Object.entries(filter.teams)
            .filter(([, isSelected]) => isSelected)
            .map(([gqlTeamName]) => mapGraphQlNameToOriginal(gqlTeamName))
        : [];
      const selectedRoleNames = filter?.roles
        ? Object.entries(filter.roles)
            .filter(([, isSelected]) => isSelected)
            .map(([gqlRoleName]) => mapGraphQlNameToOriginal(gqlRoleName))
        : [];

      const staffIdsToFilterBy: Set<string> = new Set( // Initialize as Set
        staffDataStore
          .filter((s) => {
            if (s.status !== 'active') return false;
            const details = getStaffDetails(s);
            const teamMatch =
              selectedTeamNames.length > 0
                ? selectedTeamNames.includes(details.teamName || '')
                : true;
            const roleMatch =
              selectedRoleNames.length > 0
                ? selectedRoleNames.includes(details.roleName || '')
                : true;
            return teamMatch && roleMatch;
          })
          .map((s) => s.id)
      );

      const calculateTimeSpan = (
        periodStart: Date,
        periodEnd: Date,
        granularity: 'hourly' | 'daily' | 'monthly',
        staffSet: Set<string>
      ): {
        totalHoursWorked: number;
        dataPoints: { label: string; value: number }[];
      } => {
        const pts: Record<string, number> = {};
        let tM = 0;
        if (granularity === 'hourly') {
          for (let i = 0; i < 24; i++) {
            pts[format(subHours(periodEnd, i), 'ha')] = 0;
          }
        } else if (granularity === 'daily') {
          const ds = eachDayOfInterval({ start: periodStart, end: periodEnd });
          ds.forEach((d) => (pts[format(d, 'MMM d')] = 0));
        } else if (granularity === 'monthly') {
          const ms = eachMonthOfInterval({
            start: periodStart,
            end: periodEnd,
          });
          ms.forEach((m) => (pts[format(m, 'MMM yy')] = 0));
        }
        const rL = timelogsDataStore.filter((l) => {
          const sIC = staffSet.has(l.staffId);
          if (!sIC) return false;
          const lCD =
            granularity === 'hourly'
              ? parseISO(l.clockInTime)
              : parseISO(l.date);
          return isWithinInterval(lCD, { start: periodStart, end: periodEnd });
        });
        rL.forEach((l) => {
          const cI = parseISO(l.clockInTime);
          const cO = parseISO(l.clockOutTime);
          let lM = differenceInMinutes(cO, cI);
          l.breaks.forEach((b) => {
            lM -= differenceInMinutes(
              parseISO(b.endTime),
              parseISO(b.startTime)
            );
          });
          if (lM < 0) lM = 0;
          tM += lM;
          let k = '';
          if (granularity === 'hourly') k = format(cI, 'ha');
          else if (granularity === 'daily')
            k = format(parseISO(l.date), 'MMM d');
          else if (granularity === 'monthly')
            k = format(parseISO(l.date), 'MMM yy');
          if (pts[k] !== undefined) {
            pts[k] += lM / 60;
          } else {
            pts[k] = lM / 60;
          }
        });
        let dPs = Object.entries(pts).map(([lbl, hrs]) => ({
          label: lbl,
          value: parseFloat(hrs.toFixed(2)),
        }));
        if (granularity === 'hourly') {
          const pM = new Map(dPs.map((p) => [p.label, p.value]));
          const sHP: { label: string; value: number }[] = [];
          for (let i = 23; i >= 0; i--) {
            const hR = subHours(periodEnd, i);
            const lbl = format(hR, 'ha');
            sHP.push({ label: lbl, value: pM.get(lbl) || 0 });
          }
          dPs = sHP;
        } else if (granularity === 'daily') {
          dPs.sort(
            (a, b) =>
              parseISO(a.label + ' ' + getYear(periodStart)).getTime() -
              parseISO(b.label + ' ' + getYear(periodStart)).getTime()
          );
        } else if (granularity === 'monthly') {
          dPs.sort(
            (a, b) =>
              parseISO('01 ' + a.label).getTime() -
              parseISO('01 ' + b.label).getTime()
          );
        }
        return {
          totalHoursWorked: parseFloat((tM / 60).toFixed(2)),
          dataPoints: dPs,
        };
      };

      const last24HoursData = calculateTimeSpan(
        subHours(refDate, 23),
        refDate,
        'hourly',
        staffIdsToFilterBy
      );
      const last7DaysData = calculateTimeSpan(
        startOfDay(subDays(refDate, 6)),
        endOfDay(refDate),
        'daily',
        staffIdsToFilterBy
      );
      const last30DaysData = calculateTimeSpan(
        startOfDay(subDays(refDate, 29)),
        endOfDay(refDate),
        'daily',
        staffIdsToFilterBy
      );
      const last12MonthsData = calculateTimeSpan(
        startOfMonth(subMonths(refDate, 11)),
        endOfMonth(refDate),
        'monthly',
        staffIdsToFilterBy
      );

      return {
        last24Hours: last24HoursData,
        last7Days: last7DaysData,
        last30Days: last30DaysData,
        last12Months: last12MonthsData,
      };
    },

    wageDistributionData: async (
      _: any,
      {
        filter,
      }: {
        filter: {
          startDate: string;
          endDate: string;
          teams?: Record<string, boolean>;
          roles?: Record<string, boolean>;
        };
      }
    ) => {
      await delay(380);
      const { startDate, endDate, teams, roles } = filter;
      const start = parseISO(startDate);
      const end = parseISO(endDate);

      const selectedTeamNames = teams
        ? Object.entries(teams)
            .filter(([, isSelected]) => isSelected)
            .map(([gqlTeamName]) => mapGraphQlNameToOriginal(gqlTeamName))
        : [];
      const selectedRoleNames = roles
        ? Object.entries(roles)
            .filter(([, isSelected]) => isSelected)
            .map(([gqlRoleName]) => mapGraphQlNameToOriginal(gqlRoleName))
        : [];

      const targetStaff = staffDataStore.filter((s) => {
        if (s.status !== 'active') return false;
        const details = getStaffDetails(s);
        const teamMatch =
          selectedTeamNames.length > 0
            ? selectedTeamNames.includes(details.teamName || '')
            : true;
        const roleMatch =
          selectedRoleNames.length > 0
            ? selectedRoleNames.includes(details.roleName || '')
            : true;
        return teamMatch && roleMatch;
      });

      const relevantStaffIds = new Set(targetStaff.map((s) => s.id));
      const teamWages: Record<string, number> = {};

      for (const log of timelogsDataStore) {
        if (!relevantStaffIds.has(log.staffId)) continue;
        const logDate = parseISO(log.date);
        if (!isWithinInterval(logDate, { start, end })) continue;

        const staffDetails = staffDataStore.find((s) => s.id === log.staffId);
        if (!staffDetails) continue;
        const teamDetails = teamsDataStore.find(
          (t) => t.id === staffDetails.teamId
        );
        if (!teamDetails) continue;

        const clockIn = parseISO(log.clockInTime);
        const clockOut = parseISO(log.clockOutTime);
        let totalWorkedMinutes = differenceInMinutes(clockOut, clockIn);
        log.breaks.forEach((brk) => {
          totalWorkedMinutes -= differenceInMinutes(
            parseISO(brk.endTime),
            parseISO(brk.startTime)
          );
        });
        if (totalWorkedMinutes < 0) totalWorkedMinutes = 0;

        const hoursWorked = totalWorkedMinutes / 60;
        const wagesForLog = hoursWorked * getStaffHourlyRate(staffDetails.id);

        if (!teamWages[teamDetails.name]) teamWages[teamDetails.name] = 0;
        teamWages[teamDetails.name] += wagesForLog;
      }

      const data = Object.entries(teamWages)
        .map(([teamName, totalWagesVal]) => ({
          name: teamName,
          value: +totalWagesVal.toFixed(2),
        }))
        .sort((a, b) => b.value - a.value);
      return { data };
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = new ApolloServer({ schema, introspection: true });
const handler = startServerAndCreateNextHandler(server);
export const GET = handler;
export const POST = handler;
