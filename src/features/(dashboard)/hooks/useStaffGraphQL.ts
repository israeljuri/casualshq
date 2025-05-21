/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useQuery,
  useMutation,
  useLazyQuery,
  QueryResult,
  ApolloError,
} from '@apollo/client';
import { useCallback } from 'react';
import useAlert from '@/hooks/useAlert';
import { StaffMember, StaffFormData } from '../types';

// Import GraphQL operations
import {
  GET_STAFF_LIST,
  GET_STAFF_DETAILS,
  GET_STAFF_FILTER_OPTIONS,
} from '../graphql/queries/staffQueries';
import {
  CREATE_STAFF,
  UPDATE_STAFF,
  DELETE_STAFF,
  IMPORT_STAFF,
} from '../graphql/mutations/staffMutations';

// Types for our context
export interface StaffGraphQLContextType {
  // Data
  staffList: StaffMember[];
  staffDetails: StaffMember | null;
  filterOptions: {
    roles: string[];
    teams: string[];
  };

  // Loading states
  isLoading: {
    list: boolean;
    details: boolean;
    filterOptions: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    import: boolean;
  };

  // Errors
  errors: {
    list?: ApolloError;
    details?: ApolloError;
    filterOptions?: ApolloError;
    create?: ApolloError;
    update?: ApolloError;
    delete?: ApolloError;
    import?: ApolloError;
  };

  // Actions
  actions: {
    fetchStaffList: (variables?: {
      page?: number;
      pageSize?: number;
      filters?: Record<string, any>;
    }) => Promise<QueryResult>;
    fetchStaffDetails: (id: string) => Promise<void>;
    fetchFilterOptions: () => Promise<void>;
    createStaff: (
      input: Omit<StaffFormData, 'id'>
    ) => Promise<StaffMember | null>;
    updateStaff: (
      id: string,
      input: Partial<StaffFormData>
    ) => Promise<StaffMember | null>;
    deleteStaff: (id: string) => Promise<boolean>;
    importStaff: (
      input: Omit<StaffFormData, 'id'>[]
    ) => Promise<{ success: boolean; count: number }>;
    handlePageChange: (
      page: number,
      pageSize: number,
      filters: Record<string, any>
    ) => void;
  };

  // Pagination
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  } | null;
}

export const useStaffGraphQL = () => {
  const alert = useAlert();

  // Staff List Query
  const {
    data: staffListData,
    loading: isLoadingStaffList,
    error: staffListError,
    refetch: refetchStaffList,
    // fetchMore,
  } = useQuery(GET_STAFF_LIST, {
    variables: {
      page: 1,
      pageSize: 10,
      filters: {},
    },
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      console.error('Error fetching staff list:', error);
      alert.showAlert('Failed to fetch staff list', 'error', {
        subtext: error.message,
      });
    },
  });

  // Staff Details Query
  const [
    fetchStaffDetails,
    {
      data: staffDetailsData,
      loading: isLoadingStaffDetails,
      error: staffDetailsError,
    },
  ] = useLazyQuery(GET_STAFF_DETAILS, {
    onError: (error) => {
      console.error('Error fetching staff details:', error);
      alert.showAlert('Failed to fetch staff details', 'error', {
        subtext: error.message,
      });
    },
  });

  // Filter Options Query
  const {
    data: filterOptionsData,
    loading: isLoadingFilterOptions,
    error: filterOptionsError,
    refetch: refetchFilterOptions,
  } = useQuery(GET_STAFF_FILTER_OPTIONS, {
    onError: (error) => {
      console.error('Error fetching filter options:', error);
      alert.showAlert('Failed to fetch filter options', 'error', {
        subtext: error.message,
      });
    },
  });

  // Mutations
  const [createStaffMutation] = useMutation(CREATE_STAFF, {
    refetchQueries: [{ query: GET_STAFF_LIST }],
    onError: (error) => {
      console.error('Error creating staff:', error);
      alert.showAlert('Failed to create staff member', 'error', {
        subtext: error.message,
      });
    },
  });

  const [updateStaffMutation] = useMutation(UPDATE_STAFF, {
    refetchQueries: [
      { query: GET_STAFF_LIST },
      { query: GET_STAFF_DETAILS, variables: { id: '' } }, // ID will be set in the function
    ],
    onError: (error) => {
      console.error('Error updating staff:', error);
      alert.showAlert('Failed to update staff member', 'error', {
        subtext: error.message,
      });
    },
  });

  const [deleteStaffMutation] = useMutation(DELETE_STAFF, {
    refetchQueries: [{ query: GET_STAFF_LIST }],
    onError: (error) => {
      console.error('Error deleting staff:', error);
      alert.showAlert('Failed to delete staff member', 'error', {
        subtext: error.message,
      });
    },
  });

  const [importStaffMutation] = useMutation(IMPORT_STAFF, {
    refetchQueries: [{ query: GET_STAFF_LIST }],
    onError: (error) => {
      console.error('Error importing staff:', error);
      alert.showAlert('Failed to import staff members', 'error', {
        subtext: error.message,
      });
    },
  });

  // Handler for pagination changes
  const handlePageChange = useCallback(
    async (page: number, pageSize: number, filters: Record<string, any>) => {
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

  // Wrapper functions for mutations with proper typing
  const handleCreateStaff = useCallback(
    async (input: Omit<StaffFormData, 'id'>) => {
      try {
        const { data } = await createStaffMutation({
          variables: { input },
        });
        alert.showAlert('Staff Created', 'success', {
          subtext: 'Staff member created successfully',
        });
        return data?.addStaff || null;
      } catch (error) {
        console.error('Error in createStaff:', error);
        return null;
      }
    },
    [createStaffMutation, alert]
  );

  const handleUpdateStaff = useCallback(
    async (id: string, input: Partial<StaffFormData>) => {
      try {
        const { data } = await updateStaffMutation({
          variables: { id, input },
        });
        alert.showAlert('Staff Updated', 'success', {
          subtext: 'Staff member updated successfully',
        });
        return data?.updateStaff || null;
      } catch (error) {
        console.error('Error in updateStaff:', error);
        return null;
      }
    },
    [updateStaffMutation, alert]
  );

  const handleDeleteStaff = useCallback(
    async (id: string) => {
      try {
        const { data } = await deleteStaffMutation({
          variables: { id },
        });
        alert.showAlert('Staff Deleted', 'success', {
          subtext: 'Staff member deleted successfully',
        });
        return data?.deleteStaff?.success || false;
      } catch (error) {
        console.error('Error in deleteStaff:', error);
        return false;
      }
    },
    [deleteStaffMutation, alert]
  );

  const handleImportStaff = useCallback(
    async (input: Omit<StaffFormData, 'id'>[]) => {
      try {
        const { data } = await importStaffMutation({
          variables: { input },
        });
        alert.showAlert(
          `${
            data?.importStaff?.count || 0
          } staff members imported successfully`,
          'success'
        );
        return data?.importStaff || { success: false, count: 0 };
      } catch (error) {
        console.error('Error in importStaff:', error);
        return { success: false, count: 0 };
      }
    },
    [importStaffMutation, alert]
  );

  // Create the context value
  const contextValue: StaffGraphQLContextType = {
    // Data
    staffList: staffListData?.staffs?.data || [],
    staffDetails: staffDetailsData?.staff || null,
    filterOptions: {
      roles: filterOptionsData?.staffRoles || [],
      teams: filterOptionsData?.staffTeams || [],
    },

    // Loading states
    isLoading: {
      list: isLoadingStaffList,
      details: isLoadingStaffDetails,
      filterOptions: isLoadingFilterOptions,
      create: false, // These would need to be tracked with state if needed
      update: false,
      delete: false,
      import: false,
    },

    // Errors
    errors: {
      list: staffListError,
      details: staffDetailsError,
      filterOptions: filterOptionsError,
    },

    // Actions
    actions: {
      fetchStaffList: refetchStaffList as any, // Type assertion to handle the Apollo Client types
      fetchStaffDetails: async (id: string) => {
        await fetchStaffDetails({ variables: { id } });
      },
      fetchFilterOptions: refetchFilterOptions as any,
      createStaff: handleCreateStaff,
      updateStaff: handleUpdateStaff,
      deleteStaff: handleDeleteStaff,
      importStaff: handleImportStaff,
      handlePageChange,
    },

    // Pagination
    pagination: staffListData?.staffs
      ? {
          page: staffListData.staffs.page,
          pageSize: staffListData.staffs.pageSize,
          totalCount: staffListData.staffs.totalCount,
          totalPages: staffListData.staffs.totalPages,
        }
      : null,
  };

  return contextValue;
};

export default useStaffGraphQL;
