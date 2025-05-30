'use client';

import React, { useState } from 'react';

import { AddTeamModal } from '@/features/(dashboard)/components/teams/AddTeamModal';
import { TeamCard } from '@/features/(dashboard)/components/teams/TeamCard';
import { Button } from '@/components/molecules/Button';
import { Sidebar } from '@/features/(dashboard)/components/Sidebar';
import { Header } from '@/features/(dashboard)/components/Header';
import Image from 'next/image';
import { getTeams } from '@/lib/mockData';

export default function TeamsPage() {
  const teams = getTeams();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pageTitle = 'Teams';
  const pageDescription = 'Manage your teams and their members.';

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activePath={'/teams'}
      />

      <main className="flex-1 flex flex-col overflow-y-auto">
        <Header
          pageTitle={pageTitle}
          pageDescription={pageDescription}
          onSidebarOpen={() => setIsSidebarOpen(true)}
          showDatePicker={false}
          showFilter={false}
          // Custom action buttons for Staff page
          customActions={
            <AddTeamModal
              triggerButton={
                <Button
                  leftIcon={
                    <Image
                      src="/admin-team/plus.svg"
                      alt="plus"
                      width={20}
                      height={20}
                    />
                  }
                >
                  Add team
                </Button>
              }
            />
          }
        />

        <div className="container mx-auto">
          {teams && teams.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-6 lg:p-8">
              {teams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          )}

          {!teams ||
            (teams.length === 0 && (
              <div className="border border-olive-100 rounded-xl flex items-center flex-col gap-2 text-center py-40 mx-9 h-[calc(100vh-400px)]">
                <Image
                  src="/table/empty-table.svg"
                  alt="teams"
                  width={100}
                  height={100}
                />

                <h2 className="text-xl font-semibold mt-6">
                  No teams added yet.
                </h2>
                <p className="text-muted-foreground mb-5">
                  Add a team to begin.
                </p>
                <AddTeamModal
                  triggerButton={
                    <Button
                      variant="primary"
                      leftIcon={
                        <Image
                          src="/admin-team/plus.svg"
                          alt="plus"
                          width={20}
                          height={20}
                        />
                      }
                    >
                      Add team
                    </Button>
                  }
                />
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
