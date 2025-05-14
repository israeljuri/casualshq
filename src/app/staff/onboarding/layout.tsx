'use client';

import React from 'react';
import Link from 'next/link';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <header className="bg-primary-100">
        <div className="max-w-[80rem] px-5 h-[6rem] mx-auto flex justify-between items-center">
          <Link href="/staff">
            <img src="/logo.png" alt="CasualsHQ Logo" className="w-[10rem]" />
          </Link>
        </div>
      </header>

      <div className="min-h-screen py-20">{children}</div>
    </main>
  );
}
