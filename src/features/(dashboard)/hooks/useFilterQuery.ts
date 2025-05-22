import { useQuery } from '@apollo/client';
import {
  FILTER_QUERY,
  FilterQueryResponse,
} from '@/features/(dashboard)/graphql/queries/dashboard/filter.query';

export const useFilterQuery = () => {
  const { data, loading, error } = useQuery<FilterQueryResponse>(FILTER_QUERY);

  return {
    roleOptions: data?.roles || [],
    teamOptions: data?.teams || [],
    isLoading: loading,
    error,
  };
};
