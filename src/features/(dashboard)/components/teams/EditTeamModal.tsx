'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog';

import { AddTeamForm } from './AddTeamForm';

import { Team, TeamFormData } from '@/features/(dashboard)/types/teams.type';

import { updateTeam } from '@/lib/mockData';

interface EditTeamModalProps {
  team: Team;
  children: React.ReactNode; // For the trigger button
}

export function EditTeamModal({ team, children }: EditTeamModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const initialData: TeamFormData = {
    name: team.name,
    memberIds: team.memberIds,
    teamWage: team.teamWage,
  };

  const handleSubmit = (data: TeamFormData) => {
    updateTeam(team.id, data);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px] flex flex-col gap-10 h-[calc(100vh-50px)]">
        <DialogHeader>
          <DialogTitle>Edit team</DialogTitle>
        </DialogHeader>
        <AddTeamForm
          onSubmit={handleSubmit}
          initialData={initialData}
          isLoading={false}
          submitButtonText="Save changes"
          onClose={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
