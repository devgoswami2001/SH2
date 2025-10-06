
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Compass, LayoutGrid, User, Crown, ListChecks, ArrowLeft, Menu as MenuIcon, Settings, LogOut, MessageSquare, Bell, Video } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AppJob } from '@/app/job-feed/page'; 
import { JobDetailsView } from '@/app/job-feed/page'; 

type ActiveView = 'swiping' | 'explore' | 'applied' | 'profile' | 'subscription' | 'details' | 'mobile_contact' | 'interview';

interface MobileAppLayoutProps {
  children: React.ReactNode;
  activeView: ActiveView;
  pageTitle?: string; 
  selectedJobForDetails?: AppJob | null;
  setSelectedJobForDetails?: (job: AppJob | null) => void;
  onBack?: () => void; 
}

const navItemsConfig = [
  { label: "Explore", icon: Compass, view: 'explore' as ActiveView, href: "/explore" },
  { label: "Job Feed", icon: LayoutGrid, view: 'swiping' as ActiveView, href: "/job-feed" },
  { label: "Applied", icon: ListChecks, view: 'applied' as ActiveView, href: "/applied" },
  { label: "Interview", icon: Video, view: 'interview' as ActiveView, href: "/interview" },
  { label: "Profile", icon: User, view: 'profile' as ActiveView, href: "/profile" },
];

export function MobileAppLayout({
  children,
  activeView,
  selectedJobForDetails,
  setSelectedJobForDetails,
}: MobileAppLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleBackNavigation = () => {
    if (setSelectedJobForDetails && selectedJobForDetails) {
      setSelectedJobForDetails(null); 
    } else {
      // If on a specific mobile page that isn't job-feed, go back to job-feed (or previous logic if defined)
      if (pathname !== '/job-feed' && navItemsConfig.some(item => item.href === pathname)) {
         router.push('/job-feed'); 
      } else {
        router.back(); // Fallback to browser back
      }
    }
  };
  
  const renderHeaderLeftContent = () => {
    // If viewing job details, always show back arrow
    if (selectedJobForDetails && setSelectedJobForDetails) {
      return (
        <Button variant="ghost" size="icon" className="text-primary -ml-2 h-8 w-8" onClick={handleBackNavigation}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
      );
    }
    // For main mobile views, show logo and name
    return (
      <Link href="/job-feed" className="flex items-center gap-1.5 group transition-opacity hover:opacity-80 -ml-1">
        <Image src="/logo.png" alt="HyreSense Logo" width={28} height={20} className="rounded-sm transition-transform group-hover:scale-105 duration-300" />
        <span
          className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary transition-all group-hover:brightness-110 duration-300"
          style={{ backgroundSize: '200% auto', animation: 'gradientShine 5s linear infinite reverse' }}
        >
          hyreSENSE
        </span>
      </Link>
    );
  };
  
  const renderHeader = () => {
    return (
      <header className="p-3 border-b border-border/50 bg-background/80 backdrop-blur-sm flex items-center justify-between sticky top-0 z-10 h-[56px]">
        <div className="flex-1 min-w-0"> 
          {renderHeaderLeftContent()}
        </div>
        
        <div className="flex items-center gap-1 shrink-0">
          <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 h-8 w-8" onClick={() => router.push('/subscription')}>
            <Crown className="h-5 w-5" />
            <span className="sr-only">Subscription</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 h-8 w-8">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/mobile-contact" className="flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4" /> Contact Us
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => { router.push('/'); alert('Logged out!'); }} className="flex items-center text-destructive focus:text-destructive focus:bg-destructive/10">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-animated p-4 overflow-hidden">
      <div className="absolute inset-0 opacity-20 dark:opacity-15"></div>
      <div className="relative w-[375px] h-[780px] bg-slate-900 rounded-[48px] border-[10px] border-slate-950 shadow-2xl overflow-hidden z-10">
        <div className="h-full w-full bg-card flex flex-col rounded-[38px] overflow-hidden">
          {renderHeader()}
          <main className="flex-grow flex flex-col relative overflow-hidden">
            {selectedJobForDetails && setSelectedJobForDetails ? (
              <JobDetailsView job={selectedJobForDetails} onBack={() => setSelectedJobForDetails(null)} />
            ) : (
              children
            )}
          </main>
          {!selectedJobForDetails && (
            <nav className="px-2 py-2.5 border-t border-border/50 bg-background/80 backdrop-blur-sm flex justify-around items-center sticky bottom-0 z-10 h-[60px]">
              {navItemsConfig.map((item) => {
                const Icon = item.icon;
                // Determine active state based on the current page's path
                const isActive = pathname === item.href || (pathname === '/' && item.href === '/job-feed');
                return (
                  <Link
                    href={item.href}
                    key={item.label}
                    className={cn(
                      "flex flex-col items-center h-auto p-1.5 rounded-md w-1/5",
                      isActive ? "text-primary" : "text-muted-foreground hover:text-primary/80"
                    )}
                  >
                    <Icon className={cn("h-5 w-5 mb-0.5", isActive ? "stroke-[2.5px]" : "")} />
                    <span className={cn("text-[10px] leading-tight", isActive ? "font-semibold" : "font-normal")}>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      </div>
      <style jsx global>{`
        @keyframes pulse_slow_bg {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .bg-gradient-animated {
          background: linear-gradient(-45deg, hsl(var(--background)) 30%, hsl(var(--primary)/0.05) 50%, hsl(var(--accent)/0.05) 70%, hsl(var(--background)) 90%);
          background-size: 400% 400%;
          animation: pulse_slow_bg 15s ease infinite;
        }
         @keyframes gradientShine {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}
