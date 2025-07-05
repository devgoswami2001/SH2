
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Compass, LayoutGrid, ListChecks, User, Brain, Settings, LogOut, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  { label: "Job Feed", icon: LayoutGrid, href: "/job-feed" },
  { label: "Applied", icon: ListChecks, href: "/applied" },
  { label: "Explore", icon: Compass, href: "/explore" },
  { label: "My Profile", icon: User, href: "/profile" },
  { label: "AI Assistant", icon: Brain, href: "/ai-assistant" },
];

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-col border-r border-border bg-card hidden md:flex">
      <div className="p-4 border-b border-border">
        <Link href="/job-feed" className="flex items-center gap-2 group transition-opacity hover:opacity-80">
          <Image src="/logo.png" alt="HyreSense Logo" width={40} height={28} className="transition-transform group-hover:scale-105 duration-300" />
          <span
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary transition-all group-hover:brightness-110 duration-300"
            style={{ backgroundSize: '200% auto', animation: 'gradientShine 5s linear infinite' }}
          >
            hyreSENSE
          </span>
        </Link>
      </div>

      <nav className="flex-grow p-4 space-y-2">
        <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Menu</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link href={item.href} key={item.label} passHref>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                    "w-full justify-start text-base h-12",
                    isActive ? "font-semibold" : "text-muted-foreground"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
         <Button variant="ghost" className="w-full justify-start text-muted-foreground h-11">
            <MessageSquare className="mr-3 h-5 w-5" /> Contact Us
        </Button>
        <Button variant="ghost" className="w-full justify-start text-muted-foreground h-11">
            <Settings className="mr-3 h-5 w-5" /> Settings
        </Button>
         <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 h-11">
            <LogOut className="mr-3 h-5 w-5" /> Logout
        </Button>
      </div>
    </aside>
  );
}
