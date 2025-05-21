'use client';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
 
import { AppliedFilters } from '../types';
import { SearchInput } from '@/components/molecules/SearchInput';
import { DatePicker } from '@/components/molecules/DatePicker';
import { useRouter, usePathname } from 'next/navigation';
import { FilterDropdown } from './FilterDropdown';

import Link from 'next/link';
import { Button } from '@/components/molecules/Button';
import { SearchData, SearchSchema } from '../types/schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/molecules/Form';
import { useSearch } from '../hooks/useSearch';
import { useFilterOptions } from '../hooks/useFilterOptions';

import { ArrowLeft, Menu } from 'lucide-react';
import { Skeleton } from '@/components/atoms/skeleton';
interface DateRange {
  startDate: Date;
  endDate: Date;
}
interface HeaderProps {
  pageTitle: string;
  pageDescription: string;
  onSidebarOpen: () => void;
  appliedFilters: AppliedFilters;
  onDateRangeChange?: (dateRange?: DateRange) => void;
  onApplyFilters: (filters: AppliedFilters) => void;
  onCancelFilters: () => void;
  dateRange?: DateRange;
  showDatePicker?: boolean;
  showBackButton?: boolean;
  // Custom actions slot
  customActions?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  pageTitle,
  pageDescription,
  onSidebarOpen,
  appliedFilters,
  onDateRangeChange,
  onApplyFilters,
  onCancelFilters,
  dateRange,
  showDatePicker = true,
  showBackButton = false,
  customActions,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { search, searchResults, isLoading } = useSearch();
  const { roleOptions, teamOptions } = useFilterOptions();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [hasSearched, setHasSearched] = useState(false);
  // Determine if search should be shown based on the current path
  useEffect(() => {
    const searchEnabledPaths = ['/', '/staff', '/teams'];
    const shouldShowSearch = searchEnabledPaths.some(
      (path) => pathname === path
    );
    setShowSearch(shouldShowSearch);
  }, [pathname]);

  const form = useForm<SearchData>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      search: '',
    },
  });

  const onSubmit: SubmitHandler<SearchData> = (data) => {
    if (data.search && data.search.trim().length > 0) {
      search(data.search);
      setHasSearched(true);
    } else {
      // Clear results if search is empty
      search(''); // This will clear the results
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
    const selectedResult = searchResults.find((r) => r.id === resultId);
    if (selectedResult) {
      router.push(selectedResult.url);
      form.reset();
      setSearchTerm('');
    }
  };

  return (
    <header className="top-0 z-30 bg-white/90 backdrop-blur-md border-slate-200">
      <section className="container mx-auto">
        <section className="flex items-center justify-between h-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
          <div className="flex items-center">
            <button
              onClick={onSidebarOpen}
              className="md:hidden text-[#667185] border hover:text-slate-700 mr-3 p-1 -ml-1 rounded hover:bg-slate-100"
              aria-label="Open sidebar"
            >
              <Menu size={24} />
            </button>
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
                  Back to Staff
                </Button>
              </Link>
            )}
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                {pageTitle}
              </h1>
              <p className="text-sm text-slate-500">{pageDescription}</p>
            </div>
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
            {showSearch && (
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
                              placeholder="Search staff or teams..."
                              value={searchTerm}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                field.onChange(e);
                                handleSearchChange(e.target.value);
                              }}
                              // Pass the search state to the SearchInput component
                              isLoading={isLoading}
                              results={searchResults.map((result) => ({
                                id: result.id,
                                label: result.name,
                                team: result.type === 'team',
                              }))}
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

            {!showSearch && <Skeleton className="h-14 w-full"></Skeleton>}

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

              <FilterDropdown
                // Filters
                appliedFilters={appliedFilters}
                // Dropdown options
                roleOptions={roleOptions}
                teamOptions={teamOptions}
                // Filter handlers
                onApplyFilters={onApplyFilters}
                onCancelFilters={onCancelFilters}
              />
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};
