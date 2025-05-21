import { gql } from '@apollo/client';

// GraphQL query for hours worked data
export const HOURS_WORKED_QUERY = gql`
  query GetHoursWorked($filter: HoursWorkedFilterInput) {
    # filter argument is optional
    hoursWorkedData(filter: $filter) {
      last24Hours {
        totalHoursWorked
        dataPoints {
          label # e.g., "1PM", "2PM" (chronological for the last 24 hours from MOCK_NOW)
          value
        }
      }
      last7Days {
        totalHoursWorked
        dataPoints {
          label # e.g., "May 15", "May 16" (chronological for the last 7 days from MOCK_NOW)
          value
        }
      }
      last30Days {
        totalHoursWorked
        dataPoints {
          label # e.g., "Apr 22", "Apr 23" (chronological for the last 30 days from MOCK_NOW)
          value
        }
      }
      last12Months {
        totalHoursWorked
        dataPoints {
          label # e.g., "Jun 24", "Jul 24" (chronological, format "MMM yy")
          value
        }
      }
    }
  }
`;
