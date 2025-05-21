import { gql } from '@apollo/client';

export const STAFF_BASIC_FIELDS = gql`
  fragment StaffBasicFields on StaffMember {
    id
    title
    firstName
    lastName
    email
    phoneNumber
    role
    team
    status
    profileImageUrl
    hireDate
    employmentType
    otherNames
    homeAddress {
      line1
      city
      state
      postcode
      country
    }
  }
`;

export const STAFF_DETAILED_FIELDS = gql`
  ${STAFF_BASIC_FIELDS}
  
  fragment StaffDetailedFields on StaffMember {
    ...StaffBasicFields
    emergencyContact {
      name
      relationship
      phoneNumber
      address
    }
    financialInformation {
      taxFileNumber
      bankBSB
      accountName
      accountNumber
      superFundName
      fundABN
      memberNumber
    }
    wage {
      type
      manualRatePerHour
    }
  }
`;
