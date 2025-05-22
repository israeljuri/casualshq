/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import useAlert from '@/hooks/useAlert';
import { GET_STAFF_LIST } from '@/features/(dashboard)/graphql/queries/staff/staffList.query';
import { useCallback } from 'react';

export const useStaffListQuery = ({
  page = 1,
  pageSize = 10,
  filters = {},
}: {
  page?: number;
  pageSize?: number;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  filters?: Record<string, any>;
}) => {
  const alert = useAlert();

  const {
    data: staffListData,
    loading: isLoadingStaffList,
    error: staffListError,
    refetch: refetchStaffList,
    fetchMore,
  } = useQuery(GET_STAFF_LIST, {
    variables: {
      page,
      pageSize,
      filters,
    },
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      console.error('Error fetching staff list:', error);
      alert.showAlert('Failed to fetch staff list', 'error', {
        subtext: error.message,
      });
    },
  });

  // Handler for pagination changes
  const handlePageChange = useCallback(
    async (page: number, pageSize: number, filters?: Record<string, any>) => {
      try {
        await refetchStaffList({
          page,
          pageSize,
          filters,
        });
      } catch (error) {
        console.error('Error changing page:', error);
        alert.showAlert('Failed to change page', 'error');
      }
    },
    [refetchStaffList, alert]
  );

  return {
    staffListData,
    isLoadingStaffList,
    staffListError,
    refetchStaffList,
    fetchMore,
    handlePageChange,
  };
};
