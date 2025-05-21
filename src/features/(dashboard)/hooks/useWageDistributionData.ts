import { useQuery } from '@apollo/client';
import { WAGE_DISTRIBUTION_QUERY } from '../graphql/queries/wageDistribution';

export const useWageDistributionData = ({
  filter,
}: {
  filter: {
    startDate: string;
    endDate: string;
    teams?: Record<string, boolean>;
    roles?: Record<string, boolean>;
  };
}) => {
  const { data, loading, error } = useQuery(WAGE_DISTRIBUTION_QUERY, {
    variables: {
      filter: {
        startDate: filter.startDate,
        endDate: filter.endDate,
        teams: filter.teams,
        roles: filter.roles,
      },
    },
    // Skip cache for demo purposes
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.wageDistributionData.data || [],
    isLoading: loading,
    error,
  };
};
