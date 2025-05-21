import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getCookie } from 'cookies-next';

// Create an HTTP link to the GraphQL endpoint
const httpLink = createHttpLink({
  uri: '/api/graphql',
  credentials: 'include', // This is important for sending cookies with requests
});

// Middleware to add auth headers if needed
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from cookies
  const token = typeof window !== 'undefined' ? getCookie('token') : null;
  
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

// Create the Apollo Client instance
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          staffs: {
            keyArgs: false,
            merge(existing = { data: [], totalCount: 0 }, incoming) {
              return {
                ...incoming,
                data: [...(existing?.data || []), ...(incoming?.data || [])],
              };
            },
          },
          hoursWorkedData: {
            keyArgs: ['period'],
          },
          wageDistributionData: {
            keyArgs: [],
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
    },
    query: {
      fetchPolicy: 'network-only',
    },
    mutate: {
      fetchPolicy: 'network-only',
    },
  },
});