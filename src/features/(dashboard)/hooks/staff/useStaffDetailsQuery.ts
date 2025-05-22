import useAlert from '@/hooks/useAlert';
import { useQuery } from '@apollo/client';
import { GET_STAFF_DETAILS } from '@/features/(dashboard)/graphql/queries/staff/staffDetails.query';

export const useStaffDetailsQuery = ({
  id,
}: {
  id: string;
}) => {
  const alert = useAlert();

  const {
    data: staffDetailsData,
    loading: isLoadingStaffDetails,
    error: staffDetailsError,
  } = useQuery(GET_STAFF_DETAILS, {
    variables: {
      id,
    },
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      console.error('Error fetching staff details:', error);
      alert.showAlert('Failed to fetch staff details', 'error', {
        subtext: error.message,
      });
    },
  });

  return {
    staffDetailsData,
    isLoadingStaffDetails,
    staffDetailsError,
  };
};