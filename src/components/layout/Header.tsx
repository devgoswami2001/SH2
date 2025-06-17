
"use client";

import Image from 'next/image'
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Features', href: '/features' }, // Changed from /#section-features
  { label: 'Job Seekers', href: '/job-seekers' },
  { label: 'Employers', href: '/employers' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Investor Relations', href: '/investors' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-80">
          <Image src="/logo.png" alt="HyreSense Logo" width={40} height={28} className="transition-transform group-hover:scale-105 duration-300" />
          <span
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary transition-all group-hover:brightness-110 duration-300"
            style={{ backgroundSize: '200% auto', animation: 'gradientShine 5s linear infinite' }}
          >
            hyreSENSE
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "text-foreground/70 transition-all duration-300 hover:text-foreground relative group px-3 py-2 rounded-md text-sm font-medium",
                "hover:bg-accent/10"
              )}
            >
              <span>{item.label}</span>
              <span className="absolute bottom-[6px] left-1/2 transform -translate-x-1/2 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-2/3"></span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          <Button
            className="shadow-md hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-px hover:scale-[1.02]"
          >
            Get Started
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[320px] bg-background/95 backdrop-blur-md p-0 flex flex-col">
              <div className="flex items-center justify-start p-4 border-b border-border/60">
                <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-80" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image src="/logo.png" alt="HyreSense Logo" width={35} height={28} className="transition-transform group-hover:scale-105" />
                   <span
                    className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary"
                     style={{ backgroundSize: '200% auto', animation: 'gradientShine 5s linear infinite reverse' }}
                  >
                    hyreSENSE
                  </span>
                </Link>
              </div>
              <nav className="flex flex-col gap-1 p-4 mt-2 flex-grow">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground hover:bg-accent/20 px-3 py-2.5 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t border-border/60 space-y-2 bg-background">
                <Button className="w-full text-base py-3 h-auto" size="lg">Get Started</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <style jsx global>{`
        @keyframes gradientShine {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </header>
  );
}
