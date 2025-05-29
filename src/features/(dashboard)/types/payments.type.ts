export interface StaffPaymentSummary {
    id: string; // staff id
    name: string;
    totalHoursWorked: string;
    totalGrossPay: number;
    status?: 'Approved' | 'Pending' | 'Issue'; // Status for the summary line
  }
  
  export interface PaymentPeriod {
    id: string;
    periodEndDate: string;
    totalHoursWorked: string;
    totalGrossPay: number;
    totalStaffMembers: number;
    status?: 'pending_approval' | 'approved' | 'exported' | 'processing'; // Overall status of the period
  }
  
  export interface PaymentPeriodWithDetails extends PaymentPeriod {
    staffPayments: StaffPaymentSummary[];
  }
  
  export interface StaffPaymentDetail {
    id: string; // staff id, or a unique ID for the payment record if staff can have multiple entries
    name: string;
    emailAddress: string;
    role: string;
    team?: string;
    status: 'Approved' | 'Pending' | 'Rejected' | 'Issue'; // Payment status for this staff member in this period
    wage: string;
    payFrequency?: string;
    staffType?: string;
    totalHoursWorked: string;
    totalGrossPay: number;
    deductions?: number;
    paymentHistory?: Array<{
      period: string;
      totalHoursWorked: string;
      totalGrossPay: number;
    }>;
  }