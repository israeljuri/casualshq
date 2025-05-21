import { gql } from '@apollo/client';

export const STATS_QUERY = gql`
  query GetGlobalStats {
    stats {
      summary {
        totalActiveStaff {
          value
          percentageChange
          positiveChange
        }
        hoursWorkedThisPeriod {
          value
          percentageChange
          positiveChange
        }
        grossWagesThisPeriod {
          value
          percentageChange
          positiveChange
        }
        pendingAdjustments {
          # Count of adjustments in "This Period" vs "Previous Period"
          value
          percentageChange
          positiveChange
        }
      }
      staffStats {
        # Lists staff who logged hours in "This Period" (e.g., last 7 days from MOCK_NOW)
        staffId
        totalHours
        totalWages
      }
    }
  }
`;

export interface StatValue {
  value: string;
  percentageChange?: number | null;
  positiveChange?: boolean | null;
}
