import { gql } from '@apollo/client';

export const FILTER_OPTIONS_QUERY = gql`
  query GetFilterOptions {
    staffRoles
    staffTeams
  }
`;

export interface FilterOptionsResponse {
  staffRoles: string[];
  staffTeams: string[];
}
