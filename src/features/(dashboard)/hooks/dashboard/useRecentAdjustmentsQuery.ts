import { useQuery } from '@apollo/client';
import {
  RECENT_ADJUSTMENTS_QUERY,
  RecentAdjustmentsResponse,
} from '@/features/(dashboard)/graphql/queries/dashboard/recentAdjustments.query';

export const useRecentAdjustmentsQuery = () => {
  const { data, loading, error } = useQuery<RecentAdjustmentsResponse>(
    RECENT_ADJUSTMENTS_QUERY,
    {
      fetchPolicy: 'network-only', // Don't use cache for this data
    }
  );

  return {
    adjustments: data?.recentAdjustments || [],
    isLoading: loading,
    error,
  };
};
