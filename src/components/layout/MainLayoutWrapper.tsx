'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type React from 'react';

export function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const fullscreenPages = [
    '/login', 
    '/create-resume', 
    '/signup', 
    '/build-resume', 
    '/job-feed',
    '/explore',
    '/applied',
    '/interview',
    '/subscription',
    '/profile',
    '/ai-assistant',
    '/mobile-contact',
    '/edit-profile',
    '/payment/success',
    '/payment/failure'
  ];
  const isFullscreenPage = 
    fullscreenPages.includes(pathname) || 
    pathname.startsWith('/job-details/') || 
    pathname.startsWith('/jobs/') ||
    pathname.startsWith('/company/');


  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      {isFullscreenPage ? (
        <>{children}</> 
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}
