import { useQuery, ApolloError } from '@apollo/client';
import { STATS_QUERY } from '@/features/(dashboard)/graphql/queries/stats';

export const useStatsData = () => {
  const { data, loading, error } = useQuery(STATS_QUERY, {
    fetchPolicy: 'network-only',
  });



  return {
    data: data?.stats.summary,
    isLoading: loading,
    error: error as ApolloError | undefined,
  };
};

export interface StatsHookData {
  totalActiveStaff: {
    value: {
      value: number;
      percentageChange?: number;
      positiveChange?: boolean;
    };
    key: string;
  };
  hoursWorkedThisPeriod: {
    value: {
      value: number;
      percentageChange?: number;
      positiveChange?: boolean;
    };
    key: string;
  };
  grossWagesThisPeriod: {
    value: {
      value: number;
      percentageChange?: number;
      positiveChange?: boolean;
    };
    key: string;
  };
  pendingAdjustments: {
    value: {
      value: number;
      percentageChange?: number;
      positiveChange?: boolean;
    };
    key: string;
  };
}
