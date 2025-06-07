
"use client";

import Image from 'next/image'
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Briefcase } from 'lucide-react'; // Added Briefcase for logo

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'Job Seekers', href: '#job-seekers' },
  { label: 'Employers', href: '#employers' },
  { label: 'How It Works', href: '/how-it-works' }, // Updated href
  { label: 'Investor Relations', href: '/investors' }, 
  // { label: 'Pricing', href: '/pricing' }, // Example for future pages
  // { label: 'Blog', href: '/blog' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={50} height={32} />
          {/* <Briefcase className="h-7 w-7 text-primary" /> */}
          <span className="text-2xl font-bold text-foreground" style={{ fontSize: 25, paddingBottom: 8 , color: '#4670bf' }}>hyre <span style={{color:'#7a5fdb'}}>SENSE</span> </span>
          
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          {/* <Button variant="ghost">Log In</Button> */}
          <Button>Get Started</Button>
        </div>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-start p-4 border-b">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <Image src="/logo.png" alt="Logo" width={35} height={32} />
                    <span className="text-xl font-bold"><span style={{fontSize: 22,color: '#4670bf' }}>hyre <span style={{color:'#7a5fdb'}}>SENSE</span></span></span>
                  </Link>
                </div>
                <nav className="flex flex-col gap-4 p-4 mt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto p-4 border-t space-y-2">
                  {/* <Button variant="outline" className="w-full">Log In</Button> */}
                  <Button className="w-full">Get Started</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
