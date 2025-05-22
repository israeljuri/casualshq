import { useQuery } from '@apollo/client';
import { WAGE_DISTRIBUTION_QUERY } from '@/features/(dashboard)/graphql/queries/dashboard/wageDisribution.query';

export const useWageDistributionQuery = ({
  filter,
}: {  
  filter: {
    from: string;
    to: string;
    teams?: Record<string, boolean>;
    roles?: Record<string, boolean>;
  };
}) => {
  const { data, loading, error } = useQuery(WAGE_DISTRIBUTION_QUERY, {
    variables: {
      filter: {
        from: filter.from,
        to: filter.to,
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
