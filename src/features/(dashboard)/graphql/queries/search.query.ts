import { gql } from "@apollo/client";

export const SEARCH_QUERY = gql`
  
`;
    
export type SearchResponse = {
  search: {
    staff: SearchStaffResult[];
    teams: SearchTeamResult[];
    
  };
};

export type SearchQueryVariables = {
  query: string;
};

export type SearchStaffResult = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type SearchTeamResult = {
  id: string;
  name: string;
};
  