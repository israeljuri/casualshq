import { gql } from '@apollo/client';

export const FILTER_QUERY = gql`
  #   dummy query here
  query FilterQuery {
    teams {
      _id
      name
    }
    roles {
      _id
      name
    }
  }
`;

export interface FilterQueryResponse {
  teams: {
    _id: string;
    name: string;
  }[];
  roles: {
    _id: string;
    name: string;
  }[];
}
