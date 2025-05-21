import { gql } from '@apollo/client';
// import { PieChartDataItem } from '@/features/(dashboard)/types';

// GraphQL query for wage distribution data
export const WAGE_DISTRIBUTION_QUERY = gql`
 query GetWageDistribution($filter: WageDistributionFilterInput!) {
  wageDistributionData(filter: $filter) {
    data {
      name # Typically team name
      value # Total wages for that team in the period
    }
  }
}
`;

// Response type for the query
// export interface WageDistributionResponse {
//   wageDistributionData: {
//     data: PieChartDataItem[];
//   };
// }
