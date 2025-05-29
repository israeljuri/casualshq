'use client';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Filters } from '../types';
import { SearchInput } from '@/components/molecules/SearchInput';
import { DatePicker } from '@/components/molecules/DatePicker';
import { useRouter, usePathname } from 'next/navigation';
import { FilterDropdown } from './FilterDropdown';

import Link from 'next/link';
import { Button } from '@/components/molecules/Button';
import { SearchSchema } from '@/features/(dashboard)/types/schema';
import { SearchData } from '@/features/(dashboard)/types/schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/molecules/Form';

import { ArrowLeft, Menu } from 'lucide-react';
import { Skeleton } from '@/components/atoms/skeleton';
import {
  getRoleOptionsMockData,
  getTeamOptionsMockData,
  searchMockData,
} from '@/lib/mockData';
import { DateRange } from 'react-day-picker';

interface HeaderProps {
  pageTitle: string;
  pageDescription: string;

  dateRange?: DateRange;
  appliedFilters?: Filters;
  backButtonText?: string;
  organizationName?: string;

  onSidebarOpen: () => void;
  onDateRangeChange?: (dateRange: DateRange) => void;
  onApplyFilters?: (filters: Filters) => void;
  onCancelFilters?: () => void;

  showDatePicker?: boolean;
  showBackButton?: boolean;
  showFilter?: boolean;
  showSearch?: boolean;

  // Custom actions slot
  customActions?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  pageTitle,
  pageDescription,
  appliedFilters,
  dateRange,
  backButtonText = 'Back to Staff',
  organizationName,

  onSidebarOpen,
  onDateRangeChange,
  onApplyFilters,
  onCancelFilters,

  showSearch = true,
  showDatePicker = true,
  showBackButton = false,
  showFilter = true,

  customActions,
}) => {
  const searchEnabledPaths = ['/', '/staff', '/teams', '/user-management'];
  const router = useRouter();
  const pathname = usePathname();
  const [searchResults, setSearchResult] = useState<
    | {
        id: string;
        label: string;
        value: string;
        url: string;
        type: string;
      }[]
    | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Determine if search should be shown based on the current path
  useEffect(() => {
    const shouldShowSearch = searchEnabledPaths.some(
      (path) => pathname === path
    );
    setShowSearchBox(shouldShowSearch);
  }, [pathname]);

  const getPlaceHolder = () => {
    if (pathname === '/teams') {
      return 'Search teams by name...';
    }
    return 'Search by name...';
  };

  const form = useForm<SearchData>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      search: '',
    },
  });

  const onSubmit: SubmitHandler<SearchData> = (data) => {
    if (data.search && data.search.trim().length > 0) {
      const result = searchMockData(data.search);
      setIsLoading(result.isLoading);

      setSearchResult(result.data);
      setHasSearched(true);
    } else {
      // Clear results if search is empty
      const result = searchMockData(''); // This will clear the results
      setIsLoading(result.isLoading);
      setSearchResult(result.data);
      setHasSearched(false);
    }
  };

  // Handle search input changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    // No longer triggering search as user types
  };

  // Handle search result selection
  const handleSearchSelect = (resultId: string) => {
    const selectedResult = searchResults?.find((r) => r.id === resultId);
    if (selectedResult) {
      router.push(selectedResult.url);
      form.reset();
      setSearchTerm('');
    }
  };

  return (
    <header className="top-0 z-30 bg-white/90 backdrop-blur-md border-slate-200">
      {!organizationName && (
        <section className="flex items-center px-4 sm:px-6 lg:px-8 pt-4">
          <button
            onClick={onSidebarOpen}
            className="md:hidden text-[#667185] border hover:text-slate-700 p-2 rounded hover:bg-slate-100"
            aria-label="Open sidebar"
          >
            <Menu size={24} />
          </button>
        </section>
      )}

      {organizationName && (
        <section className="border-b flex items-center px-4 sm:px-6 lg:px-8 pt-4 pb-4">
          <button
            onClick={onSidebarOpen}
            className="md:hidden text-[#667185] border hover:text-slate-700 p-2 rounded hover:bg-slate-100"
            aria-label="Open sidebar"
          >
            <Menu size={24} />
          </button>
          <article className="container mx-auto px-4 sm:px-6 lg:px-8">
            {organizationName}
          </article>
        </section>
      )}

      <section className="container mx-auto">
        <section className="flex items-center justify-between h-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <div className="flex items-center">
            {showBackButton && (
              <Link
                href="/staff"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mb-3 group"
              >
                <Button
                  variant="ghost"
                  leftIcon={
                    <ArrowLeft
                      size={16}
                      className="mr-1.5 transition-transform group-hover:-translate-x-1"
                    />
                  }
                >
                  {backButtonText}
                </Button>
              </Link>
            )}

            <article>
              <h2 className="text-2xl font-medium text-slate-900">
                {pageTitle}
              </h2>
              <p className="text-sm text-slate-500">{pageDescription}</p>
            </article>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {showDatePicker && onDateRangeChange && (
              <DatePicker
                variant="range"
                initialDateRange={dateRange}
                onDateRangeChange={onDateRangeChange}
              />
            )}
            {customActions}
          </div>
        </section>

        {/* Bottom section: Search and Filters */}

        <div className="px-4 sm:px-6 lg:px-8 pt-3 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {showSearchBox && showSearch && (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6 w-full"
                >
                  <div className="grid grid-cols-[1fr_auto] items-start gap-4 w-full">
                    <FormField
                      control={form.control}
                      name="search"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <SearchInput
                              hasSearched={hasSearched}
                              placeholder={getPlaceHolder()}
                              value={searchTerm}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                field.onChange(e);
                                handleSearchChange(e.target.value);
                              }}
                              // Pass the search state to the SearchInput component
                              isLoading={isLoading}
                              results={
                                searchResults?.map((result) => ({
                                  id: result.id,
                                  label: result.label,
                                  team: result.type === 'team',
                                })) || []
                              }
                              onResultSelect={handleSearchSelect}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" variant="secondary">
                      Search
                    </Button>
                  </div>
                </form>
              </Form>
            )}

            {!showSearchBox && showSearch && (
              <Skeleton className="h-14 w-full"></Skeleton>
            )}

            <div className="flex items-center justify-between md:justify-end">
              <div className="flex md:hidden items-center gap-2 md:gap-4">
                {showDatePicker && onDateRangeChange && (
                  <DatePicker
                    variant="range"
                    initialDateRange={dateRange}
                    onDateRangeChange={onDateRangeChange}
                  />
                )}
                {customActions}
              </div>

              {showFilter && (
                <FilterDropdown
                  // Filters
                  appliedFilters={appliedFilters || { teams: {}, roles: {} }}
                  // Dropdown options
                  roleOptions={getRoleOptionsMockData().data}
                  teamOptions={getTeamOptionsMockData().data}
                  // Filter handlers
                  onApplyFilters={onApplyFilters || (() => {})}
                  onCancelFilters={onCancelFilters || (() => {})}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};
