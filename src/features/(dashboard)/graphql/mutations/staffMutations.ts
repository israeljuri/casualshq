import { gql } from '@apollo/client';
import { STAFF_BASIC_FIELDS, STAFF_DETAILED_FIELDS } from '../fragments/staffFragment';

export const CREATE_STAFF = gql`
  ${STAFF_DETAILED_FIELDS}
  
  mutation CreateStaff($input: StaffInput!) {
    addStaff(input: $input) {
      ...StaffDetailedFields
    }
  }
`;

export const UPDATE_STAFF = gql`
  ${STAFF_DETAILED_FIELDS}
  
  mutation UpdateStaff($id: ID!, $input: StaffUpdateInput!) {
    updateStaff(id: $id, input: $input) {
      ...StaffDetailedFields
    }
  }
`;

export const DELETE_STAFF = gql`
  mutation DeleteStaff($id: ID!) {
    deleteStaff(id: $id) {
      success
      id
    }
  }
`;

export const IMPORT_STAFF = gql`
  ${STAFF_BASIC_FIELDS}
  
  mutation ImportStaff($input: [StaffInput!]!) {
    importStaff(input: $input) {
      success
      count
      staff {
        ...StaffBasicFields
      }
    }
  }
`;
