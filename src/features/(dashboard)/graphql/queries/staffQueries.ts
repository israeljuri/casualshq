import { gql } from '@apollo/client';
import { STAFF_BASIC_FIELDS, STAFF_DETAILED_FIELDS } from '../fragments/staffFragment';

export const GET_STAFF_LIST = gql`
  ${STAFF_BASIC_FIELDS}
  
  query GetStaffList(
    $page: Int
    $pageSize: Int
    $filters: StaffFilterInput
  ) {
    staffs(page: $page, pageSize: $pageSize, filters: $filters) {
      data {
        ...StaffBasicFields
      }
      totalCount
      page
      pageSize
      totalPages
    }
  }
`;

export const GET_STAFF_DETAILS = gql`
  ${STAFF_DETAILED_FIELDS}
  
  query GetStaffDetails($id: ID!) {
    staff(id: $id) {
      ...StaffDetailedFields
    }
  }
`;

export const GET_STAFF_FILTER_OPTIONS = gql`
  query GetStaffFilterOptions {
    staffRoles
    staffTeams
  }
`;
