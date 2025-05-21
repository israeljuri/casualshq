import { useQuery } from '@apollo/client';
import { HOURS_WORKED_QUERY } from '../graphql/queries/hoursWorked';

export const useHoursWorkedData = ({
  filter,
}: {
  filter: {
    // startDate: string;
    // endDate: string;
    teams?: Record<string, boolean>;
    roles?: Record<string, boolean>;
  };
}) => {
  const { data, loading, error } = useQuery(HOURS_WORKED_QUERY, {
    variables: {
      // filter: {
        // startDate: filter.startDate,
        // endDate: filter.endDate,
        // teams: filter.teams,
        // roles: filter.roles,
      // },
    },
    // Skip cache for demo purposes
    fetchPolicy: 'network-only',
  });

  console.log({ data, filter});
  return {
    data: data?.hoursWorkedData || {},
    isLoading: loading,
    error,
  };
};
