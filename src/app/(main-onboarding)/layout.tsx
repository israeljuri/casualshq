'use client'

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()
  return (
    <div className="bg-gray-50 ">
      <header className="bg-primary-100 mb-20">
        <div className="max-w-[80rem] px-5 h-[6rem] mx-auto flex justify-between items-center">
          <Link href="/sign-up">
            <img src="/logo.png" alt="CasualsHQ Logo" className='w-[10rem]' />
          </Link>

          <Link href={pathname === '/sign-in' ? '/sign-up' : '/sign-in'}>
            <Button variant="secondary">
              {pathname === '/sign-in' ? 'Sign up' : 'Sign in'}
            </Button>
          </Link>
        </div>
      </header>

      <div className="min-h-screen flex flex-col items-center">{children}</div>
    </div>
  );
}
