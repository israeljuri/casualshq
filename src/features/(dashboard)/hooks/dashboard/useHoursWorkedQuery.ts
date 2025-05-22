import { useQuery } from '@apollo/client';
import { HOURS_WORKED_QUERY } from '@/features/(dashboard)/graphql/queries/dashboard/hoursWorkedQuery';

export const useHoursWorkedQuery = ({
  filter,
}: {
  filter: {
    from: string;
    to: string;
    teams?: Record<string, boolean>;
    roles?: Record<string, boolean>;
  };
}) => {
  const { data, loading, error } = useQuery(HOURS_WORKED_QUERY, {
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
    data: data?.hoursWorkedData || {},
    isLoading: loading,
    error,
  };
};
