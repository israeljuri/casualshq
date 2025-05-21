import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/avatar';
import { Button } from '@/components/molecules/Button';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';

import { LogOut } from 'lucide-react';

import { useState } from 'react';

interface ProfileProps {
  userName: string;
  organizationName: string;
  userAvatar: string;
  onSignOut: () => void;
  role: string;
}

export const Profile = ({
  userName,
  organizationName,
  userAvatar,
  role,
  onSignOut,
}: ProfileProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleInitiateAction = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    onSignOut();
    setIsConfirmOpen(false);
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
  };

  return (
    <>
      <ConfirmDialog
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        content={
          <article className="p-5 bg-white rounded-2xl">
            <article className="space-y-3">
              <h4 className="font-medium text-2xl text-black">Log out?</h4>
              <p className="text-base text-custom-gray">
                You&apos;ll need to sign in again to access your account.
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
                className="bg-red-500 text-white w-full hover:bg-red-600 active:bg-red-800"
              >
                Log out
              </Button>
            </div>
          </article>
        }
      />

      <div className="py-2 border-gray-200 container mx-auto flex justify-between items-center ">
        <button
          onClick={handleInitiateAction}
          className="cursor-pointer w-auto h-auto flex items-center gap-2 p-5"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>
              {userName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="text-left hidden md:block">
            <div className="text-sm text-gray-500 font-normal inline-flex items-center mt-1 border border-gray-300 bg-gray-100 px-2 py-1 rounded-sm capitalize">
              {organizationName}
            </div>
            <div className="font-medium text-black capitalize w-[12ch] truncate ...">
              {userName}
            </div>
            <div className="text-sm text-custom-gray capitalize">{role}</div>
          </div>

          <div className="">
            <LogOut className="h-5 w-5 text-custom-gray ml-2 transform transition-transform group-hover:translate-x-1" />
          </div>
        </button>
      </div>
    </>
  );
};
