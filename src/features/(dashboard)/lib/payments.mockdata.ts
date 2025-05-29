import {
  PaymentPeriod,
  PaymentPeriodWithDetails,
  StaffPaymentDetail,
  StaffPaymentSummary,
} from '@/features/(dashboard)/types/payments.type';

const mockStaffSummaries: StaffPaymentSummary[] = [
  {
    id: 'staff-1',
    name: 'Oluwaseun Adebayo',
    totalHoursWorked: '40 hours',
    totalGrossPay: 1250.0,
    status: 'Approved',
  },
  {
    id: 'staff-2',
    name: 'Chinwe Okeke',
    totalHoursWorked: '38 hours 52 minutes',
    totalGrossPay: 1258.9,
    status: 'Approved',
  },
  {
    id: 'staff-3',
    name: 'Folashade Ogunleye',
    totalHoursWorked: '39 hours',
    totalGrossPay: 1378.9,
    status: 'Pending',
  },
  {
    id: 'staff-4',
    name: 'Chinedu Nwankwo',
    totalHoursWorked: '39 hours 8 minutes',
    totalGrossPay: 1289.23,
    status: 'Approved',
  },
  {
    id: 'staff-5',
    name: 'Temitope Ige',
    totalHoursWorked: '39 hours 15 minutes',
    totalGrossPay: 1145.71,
    status: 'Issue',
  },
];

export const paymentPeriodsMockData: PaymentPeriod[] = [
  {
    id: 'period-2025-01-07',
    periodEndDate: '07/01/2025',
    totalHoursWorked: '400 hours',
    totalGrossPay: 125000.0,
    totalStaffMembers: 125,
    status: 'pending_approval',
  },
  {
    id: 'period-2024-12-31',
    periodEndDate: '31/12/2024',
    totalHoursWorked: '388 hours 52 minutes',
    totalGrossPay: 125890.0,
    totalStaffMembers: 158,
    status: 'approved',
  },
  {
    id: 'period-2024-12-24',
    periodEndDate: '24/12/2024',
    totalHoursWorked: '392 hours',
    totalGrossPay: 137890.0,
    totalStaffMembers: 137,
    status: 'exported',
  },
  {
    id: 'period-2024-12-17',
    periodEndDate: '17/12/2024',
    totalHoursWorked: '398 hours',
    totalGrossPay: 128923.0,
    totalStaffMembers: 125,
    status: 'approved',
  },
  {
    id: 'period-2024-12-10',
    periodEndDate: '10/12/2024',
    totalHoursWorked: '381 hours 45 minutes',
    totalGrossPay: 114571.0,
    totalStaffMembers: 114,
    status: 'exported',
  },
];

export const getPaymentPeriodById = (
  id: string
): PaymentPeriodWithDetails | undefined => {
  const period = paymentPeriodsMockData.find((p) => p.id === id);
  if (!period) return undefined;
  // In a real app, staffPayments would be fetched or associated differently.
  // Here, we'll just use a slice of the mockStaffSummaries for demonstration.
  return {
    ...period,
    staffPayments: mockStaffSummaries,
  };
};

export const staffPaymentDetailsMock: StaffPaymentDetail = {
  id: 'staff-1-period-2025-01-07', // Example unique ID
  name: 'Oluwaseun Adebayo',
  emailAddress: 'seunadebayo@gmail.com',
  role: 'Account Manager',
  team: 'Sales',
  status: 'Approved',
  wage: '$30/hr Rate card',
  payFrequency: 'Weekly',
  staffType: 'Hourly',
  totalHoursWorked: '40 hours',
  totalGrossPay: 1250.0,
  deductions: 50.0,
  paymentHistory: [
    {
      period: '07/01/2025',
      totalHoursWorked: '40 hours',
      totalGrossPay: 1250.0,
    },
    {
      period: '31/12/2024',
      totalHoursWorked: '39 hours 45 mins',
      totalGrossPay: 1158.9,
    },
  ],
};

// Function to get a specific staff payment detail, potentially varying by staffId
export const getStaffPaymentDetail = (
  staffId: string,
  periodId: string
): StaffPaymentDetail | undefined => {
  // Find the staff summary to get basic info
  const periodDetails = getPaymentPeriodById(periodId);
  const staffSummary = periodDetails?.staffPayments.find(
    (s) => s.id === staffId
  );

  if (!staffSummary) {
    // Fallback or if staffSummary doesn't have enough info
    // This is a generic fallback, ideally, you'd have unique details per staff
    if (staffId === 'staff-1')
      return { ...staffPaymentDetailsMock, id: `${staffId}-${periodId}` };
    return {
      ...staffPaymentDetailsMock, // Use base mock
      id: `${staffId}-${periodId}`, // Make ID unique
      name: `Staff Member ${staffId.slice(-1)}`, // Mock name
      emailAddress: `staff${staffId.slice(-1)}@example.com`,
      totalGrossPay: Math.random() * 1000 + 500, // Randomize some data
      deductions: Math.random() * 50 + 10,
    };
  }

  // Construct full detail from summary and base mock
  return {
    ...staffPaymentDetailsMock, // Base details
    id: `${staffId}-${periodId}`, // Unique ID for this specific payment record
    name: staffSummary.name,
    totalHoursWorked: staffSummary.totalHoursWorked,
    totalGrossPay: staffSummary.totalGrossPay,
    status: staffSummary.status || 'Pending', // Use summary status or default
    // You might want to fetch/mock more specific details like email, role, team for this staff member
    emailAddress: `${staffSummary.name
      .toLowerCase()
      .replace(' ', '.')}@example.com`,
    role: 'Team Member', // Generic role
    team: 'Various', // Generic team
  };
};
