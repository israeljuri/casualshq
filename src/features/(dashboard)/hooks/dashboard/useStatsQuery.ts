import { useQuery, ApolloError } from '@apollo/client';
import { STATS_QUERY } from '@/features/(dashboard)/graphql/queries/staff/stats.query';

export const useStatsQuery = () => {
  const { data, loading, error } = useQuery(STATS_QUERY, {
    // Skip cache for demo purposes
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.stats.summary,
    isLoading: loading,
    error: error as ApolloError | undefined,
  };
};
 