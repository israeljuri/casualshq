import { useQuery } from '@apollo/client';
import { FILTER_OPTIONS_QUERY, FilterOptionsResponse } from '../graphql/queries/filters';

export const useFilterOptions = () => {
  const { data, loading, error } = useQuery<FilterOptionsResponse>(FILTER_OPTIONS_QUERY);

  return {
    roleOptions: data?.staffRoles || [],
    teamOptions: data?.staffTeams || [],
    isLoading: loading,
    error
  };
};
