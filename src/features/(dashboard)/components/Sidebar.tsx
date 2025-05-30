'use client';
import React from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { ADMIN_NAV_ITEMS } from '@/features/(dashboard)/config/navigation';
import { cn } from '@/lib/utils';
import { Profile } from './Profile';
import Image from 'next/image';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activePath: string;
}

// Mock data for header, replace with actual auth context or props
const MOCK_USER_DATA = {
  id: '1',
  name: 'Emmanuel Kemdirim',
  organizationName: 'CasualsHQ',
  role: 'admin',
  avatarUrl: 'https://picsum.photos/id/237/200/300',
};

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activePath,
}) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 py-10 bg-white not-even:border-r h-full grid grid-rows-[max-content_1fr] border-slate-200 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-16 px-4 border-slate-200 shrink-0">
        <Link href="/" className="text-2xl font-bold text-slate-800">
          <Image
            src="/logo.png"
            alt="CasualsHQ Logo"
            width={160}
            height={160}
          />
        </Link>
        <button
          onClick={onClose}
          className="md:hidden text-[#667185] hover:text-slate-700"
          aria-label="Close sidebar"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex flex-col justify-between">
        {/* Navigation */}
        <nav className="flex-grow py-4 overflow-y-auto">
          <ul>
            {ADMIN_NAV_ITEMS.map((item) => {
              if (item.isAdmin)
                return (
                  <li key={item.name} className="px-3 mt-6 border-t py-5">
                    <Link
                      href={item.href}
                      className={`flex items-center text-base px-3 py-2.5 gap-2 font-medium transition-colors duration-150 ease-in-out text-[#667185] rounded-r-md border-l-4
                  ${
                    activePath === item.href ||
                    (item.href !== '/' && activePath.startsWith(item.href))
                      ? 'border-primary bg-[#F0F2F5] text-primary '
                      : 'hover:bg-[#F0F2F5] border-transparent'
                  }`}
                      onClick={onClose} // Close sidebar on mobile after navigation
                    >
                      <Image
                        src={cn(
                          activePath === item.href ? item.icon : item.iconAlt
                        )}
                        alt=""
                        width={activePath === item.href ? 20 : 18}
                        height={activePath === item.href ? 20 : 18}
                      />
                      {item.name}
                    </Link>
                  </li>
                );

              return (
                <li key={item.name} className="px-3 py-0.5">
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center text-base px-3 py-2.5 gap-2 font-medium transition-colors duration-150 ease-in-out text-[#667185] rounded-r-md border-l-4',
                      activePath === item.href ||
                        (item.href !== '/' && activePath.startsWith(item.href))
                        ? 'border-primary bg-[#F0F2F5] text-primary '
                        : 'hover:bg-[#F0F2F5] border-transparent'
                    )}
                    onClick={onClose} // Close sidebar on mobile after navigation
                  >
                    <Image
                      src={cn(
                        activePath === item.href ? item.icon : item.iconAlt
                      )}
                      alt=""
                      width={20}
                      height={20}
                    />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile Footer */}
        <Profile
          userName={MOCK_USER_DATA.name}
          organizationName={MOCK_USER_DATA.organizationName}
          userAvatar={MOCK_USER_DATA.avatarUrl}
          onSignOut={() => console.log('Sign Out Clicked')}
          role={MOCK_USER_DATA.role}
        />
      </div>
    </aside>
  );
};
