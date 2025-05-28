'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog';
import { Button } from '@/components/molecules/Button';
import { AddTeamForm } from './AddTeamForm';

import { TeamFormData } from '@/features/(dashboard)/types/teams.type';
import { PlusIcon } from 'lucide-react';
import { addTeam } from '@/lib/mockData';

interface AddTeamModalProps {
  triggerButton?: React.ReactNode;
}

export function AddTeamModal({ triggerButton }: AddTeamModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSubmit = (data: TeamFormData) => {
    addTeam(data);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" /> Add team
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] flex flex-col gap-10 h-[calc(100vh-50px)]">
        <DialogHeader>
          <DialogTitle>Add team</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-between h-full">
          <AddTeamForm
            onClose={() => setIsOpen(false)}
            onSubmit={handleSubmit}
            isLoading={false}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
