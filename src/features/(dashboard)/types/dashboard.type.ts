// Dashboard - Request Adjustment Table Type
export interface AdjustmentItem {
  id: string;
  staffId: string;
  staffName: string;
  date: string;
  overtime: string;
  reason: string;
  email: string;
}

// Dashboard - Stats Data Type
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

// Dashboard - Bar Chart Filter Period Type
export type BarChartFilterPeriod = '12m' | '30d' | '7d' | '24h'; 

// Dashboard - Adjustment Modal Data Type
export interface AdjustmentModalData {
  name: string;
  email: string;
  date: string;
  overtime: string;
  reason: string;
}


// Dashboard - Stat Item Type
export interface StatItem {
  value: string;
  percentageChange?: string | null;
  changeDirection?: string | null;  
}

// Dashboard - Bar Chart Data Item Type
export interface BarChartDataItem {
  name: string;
  hours: number;
}

// Dashboard - Pie Chart Data Item Type
export interface PieChartDataItem {
  name: string;
  value: number;
}

// Dashboard - Hours Worked Chart Props Type
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

// Dashboard - Data Point Type
export interface DataPoint {
  name?: string;
  label: string;
  value: number;
}
