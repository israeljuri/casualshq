/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import useAlert from '@/hooks/useAlert';

// Import GraphQL operations
import { GET_STAFF_LIST } from '@/features/(dashboard)/graphql/queries/staff/staffList.query';
import { GET_STAFF_DETAILS } from '@/features/(dashboard)/graphql/queries/staff/staffDetails.query';
import { CREATE_STAFF } from '@/features/(dashboard)/graphql/mutations/createStaff.mutation';
import { UPDATE_STAFF } from '@/features/(dashboard)/graphql/mutations/updateStaff.mutation';
import { DELETE_STAFF } from '@/features/(dashboard)/graphql/mutations/deleteStaff.mutation';
import { IMPORT_STAFF } from '@/features/(dashboard)/graphql/mutations/importStaff.mutation';

import { StaffFormData } from '../../types/staff.type';

export const useStaffMutations = () => {
  const alert = useAlert();

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

  return {
    createStaff: handleCreateStaff,
    updateStaff: handleUpdateStaff,
    deleteStaff: handleDeleteStaff,
    importStaff: handleImportStaff,
  };
};

export default useStaffMutations;
