import { useLazyQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import {
  SEARCH_QUERY,
  SearchResponse,
  SearchQueryVariables,
  SearchStaffResult,
  SearchTeamResult,
} from '@/features/(dashboard)/graphql/queries/search.query';

export interface SearchResult {
  type: 'staff' | 'team';
  id: string;
  name: string;
  description?: string;
  url: string;
}

export const useSearchQuery = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [executeSearch, { loading, error, data }] = useLazyQuery<
    SearchResponse,
    SearchQueryVariables
  >(SEARCH_QUERY, {
    fetchPolicy: 'network-only', // Don't use cache for search results
  });

  // Update loading state
  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  // Process search results when data changes
  useEffect(() => {
    if (data) {
      const results: SearchResult[] = [];

      // Add staff results
      if (data.search.staff) {
        data.search.staff.forEach((staff: SearchStaffResult) => {
          results.push({
            type: 'staff',
            id: staff.id,
            name: `${staff.firstName} ${staff.lastName}`,
            url: `/staff/${staff.id}`,
          });
        });
      }

      // Add team results
      if (data.search.teams) {
        data.search.teams.forEach((team: SearchTeamResult) => {
          results.push({
            type: 'team',
            id: team.id,
            name: team.name,
            url: `/teams/${team.id}`,
          });
        });
      }

      setSearchResults(results);
    }
  }, [data]);

  const search = (query: string) => {
    if (query && query.trim().length > 0) {
      executeSearch({ variables: { query: query.trim() } });
    } else {
      setSearchResults([]);
    }
  };

  return {
    search,
    searchResults,
    isLoading,
    error,
  };
};
