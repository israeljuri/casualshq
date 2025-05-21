import { gql } from '@apollo/client';

// GraphQL query for searching staff and teams
export const SEARCH_QUERY = gql`
  query Search($query: String!) {
    search(query: $query) {
      staff {
        id
        firstName
        lastName
        email
        role
        team
      }
      teams {
        id
        name
      }
    }
  }
`;

// Response types for the search query
export interface SearchStaffResult {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  team: string;
  profileImageUrl?: string;
}

export interface SearchTeamResult {
  id: string;
  name: string;
}

export interface SearchResponse {
  search: {
    staff: SearchStaffResult[];
    teams: SearchTeamResult[];
  };
}

export interface SearchQueryVariables {
  query: string;
}
