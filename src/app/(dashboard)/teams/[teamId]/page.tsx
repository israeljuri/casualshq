'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import {
  Team as TeamType,
  TeamMemberDisplay,
} from '@/features/(dashboard)/types/teams.type';
import { SearchData, Staff } from '@/features/(dashboard)/types/staff.type';
import { Button } from '@/components/molecules/Button';

import Image from 'next/image';

import { getTeamById, searchStaffByTeamMockData } from '@/lib/mockData';
import { EditTeamModal } from '@/features/(dashboard)/components/teams/EditTeamModal';
import { Sidebar } from '@/features/(dashboard)/components/Sidebar';
import { TeamMemberTable } from '@/features/(dashboard)/components/tables/TeamMemberTable';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/molecules/Form';
import { SearchInput } from '@/components/molecules/SearchInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SearchSchema } from '@/features/(dashboard)/types/schema';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';

// Helper to calculate effective wage
function calculateEffectiveWage(staff: Staff, teamWage?: number): number {
  if (staff.wageType === 'manual' && staff.manualRatePerHour !== undefined) {
    return staff.manualRatePerHour;
  }
  if (staff.wageType === 'team_based' && teamWage !== undefined) {
    return teamWage; // Could also use staff.teamBasedRate if it's kept in sync
  }
  if (
    staff.wageType === 'award_rate' &&
    staff.awardBasedRatePerHour !== undefined
  ) {
    return staff.awardBasedRatePerHour;
  }
  return teamWage || staff.teamBasedRatePerHour || staff.manualRatePerHour || 0; // Fallback
}

export default function TeamInfoPage() {
  const params = useParams();
  const router = useRouter();
  const teamId = params.teamId as string;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const team = getTeamById(teamId);

  // State for team members table
  const [teamMembers, setTeamMembers] = useState<TeamMemberDisplay[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMemberCount, setTotalMemberCount] = useState(0);
  const pageSize = 2;

  const handleDeleteSuccess = () => {
    router.push('/teams'); // Navigate back to teams list after deletion
  };

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
  const [searchIsLoading, setSearchIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [hasSearched, setHasSearched] = useState(false);

  const form = useForm<SearchData>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      search: '',
    },
  });

  const onSubmit: SubmitHandler<SearchData> = (data) => {
    if (data.search && data.search.trim().length > 0) {
      const result = searchStaffByTeamMockData(data.search, teamId);
      setSearchIsLoading(result.isLoading);

      setSearchResult(result.data);
      setHasSearched(true);
    } else {
      const result = searchStaffByTeamMockData('', teamId);
      setSearchIsLoading(result.isLoading);
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

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleInitiateAction = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    handleDeleteSuccess();
    setIsConfirmOpen(false);
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
  };

  // Load team members with pagination
  useEffect(() => {
    if (team) {
      const processedMembers =
        team.members?.map((member) => ({
          ...member,
          effectiveWage: calculateEffectiveWage(member, team.teamWage),
        })) || [];

      // Calculate pagination
      const total = processedMembers.length;
      const pages = Math.ceil(total / pageSize);

      // Get current page of members
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize;
      const currentPageMembers = processedMembers.slice(start, end);

      setTeamMembers(currentPageMembers);
      setTotalPages(pages);
      setTotalMemberCount(total);
    }
  }, []);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle edit member
  const handleEditMember = (memberId: string) => {
    console.log(`Edit member with ID: ${memberId}`);
    // Implement edit functionality
    router.push(`/staff/${memberId}`);
  };

  // Handle delete member
  const handleDeleteMember = (memberId: string) => {
    console.log(`Delete member with ID: ${memberId}`);
    // Implement delete functionality
  };

  if (!team) return router.push('/teams');

  return (
    <>
      <ConfirmDialog
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        content={
          <article className="p-5 bg-white rounded-2xl">
            <article className="space-y-3">
              <h4 className="font-medium text-2xl text-black">Delete team?</h4>
              <p className="text-base text-custom-gray">
                This action cannot be undone and will permanently remove this
                team&apos;s data.
              </p>
            </article>
            <div className="grid grid-cols-2 gap-4 w-full mt-4">
              <Button
                variant="secondary"
                size="md"
                onClick={handleCancel}
                className="w-full"
              >
                Cancel
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={handleConfirm}
                className="bg-[#D42620] text-white w-full hover:bg-[#D42620] active:bg-[#D42620]"
              >
                Delete team
              </Button>
            </div>
          </article>
        }
      />

      <div className="flex h-screen overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          activePath={'/teams'}
        />
        <main className="flex-1 flex flex-col overflow-y-auto">
          <div className="container mx-auto p-4 mt-0 md:p-6">
            <header>
              <div className="flex items-center space-x-4 -ml-5">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-md font-medium"
                  onClick={() => router.back()}
                  leftIcon={
                    <Image
                      src="/admin-dashboard/move-right.svg"
                      alt="Move right"
                      width={20}
                      height={20}
                    />
                  }
                >
                  Back to Teams
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start md:items-center mt-6 mb-6 gap-4">
                <h1 className="text-2xl font-medium">{team.name}</h1>

                <div className="flex space-x-4">
                  <EditTeamModal team={team as TeamType}>
                    <Button
                      variant="secondary"
                      leftIcon={
                        <Image
                          src="/admin-team/team-edit.svg"
                          alt="edit"
                          width={16}
                          height={16}
                        />
                      }
                    >
                      Edit team
                    </Button>
                  </EditTeamModal>

                  <Button
                    variant="ghost"
                    className="bg-red-500 hover:bg-red-700 hover:text-white focus:text-white focus:bg-red-700 active:text-white active:bg-red-700 text-white transition-colors duration-200"
                    onClick={handleInitiateAction}
                    leftIcon={
                      <Image
                        src="/admin-team/team-delete-white.svg"
                        alt="delete"
                        width={20}
                        height={20}
                      />
                    }
                  >
                    Delete team
                  </Button>
                </div>
              </div>
            </header>

            <div className="pt-3 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                placeholder={`Search within ${team.name} team...`}
                                value={searchTerm}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  field.onChange(e);
                                  handleSearchChange(e.target.value);
                                }}
                                // Pass the search state to the SearchInput component
                                isLoading={searchIsLoading}
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
              </div>
            </div>

            <div className="mt-6">
              <TeamMemberTable
                teamMembers={teamMembers}
                isLoading={false}
                onEditMember={handleEditMember}
                onDeleteMember={handleDeleteMember}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalMemberCount={totalMemberCount}
                pageSize={pageSize}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
