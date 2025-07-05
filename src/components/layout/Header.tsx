
"use client";

import Image from 'next/image'
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, LogIn, UserPlus, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import Dropdown for desktop
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Import Accordion for mobile
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const navLinkClasses = "text-foreground/70 transition-all duration-300 hover:text-foreground relative group px-3 py-2 rounded-md text-sm font-medium hover:bg-accent/10";
const navLinkUnderlineClasses = "absolute bottom-[6px] left-1/2 transform -translate-x-1/2 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-2/3";
const mobileNavLinkClasses = "text-lg font-medium text-foreground/80 transition-colors hover:text-foreground hover:bg-accent/20 px-3 py-2.5 rounded-md block";


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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link href="/features" className={cn(navLinkClasses)}>
            <span>Features</span>
            <span className={navLinkUnderlineClasses}></span>
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={cn(navLinkClasses, 'data-[state=open]:bg-accent/10')}>
                <span>Product</span>
                <ChevronDown className="h-4 w-4 ml-1 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 mt-2">
              <DropdownMenuItem asChild>
                <Link href="/job-seekers" className="cursor-pointer">For Job Seekers</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => window.open('https://talent-flow-seven.vercel.app/', '_blank')}>
                For Employers
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/how-it-works" className={cn(navLinkClasses)}>
            <span>Our Process</span>
            <span className={navLinkUnderlineClasses}></span>
          </Link>
          <Link href="/about" className={cn(navLinkClasses)}>
            <span>About Us</span>
            <span className={navLinkUnderlineClasses}></span>
          </Link>
          <Link href="/investors" className={cn(navLinkClasses)}>
            <span>Investors</span>
            <span className={navLinkUnderlineClasses}></span>
          </Link>
           <Link href="/contact" className={cn(navLinkClasses)}>
            <span>Contact</span>
            <span className={navLinkUnderlineClasses}></span>
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          <Button asChild variant="ghost" className="text-foreground/80 hover:text-foreground hover:bg-accent/10">
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Link>
          </Button>
          <Button
            asChild
            className="bg-gradient-to-r from-primary to-accent hover:shadow-lg text-primary-foreground transition-all duration-300 ease-out hover:scale-105 hover:from-primary/90 hover:to-accent/90"
          >
            <Link href="/signup">
              <UserPlus className="mr-2 h-4 w-4" />
              Sign Up
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-1">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[320px] bg-background/95 backdrop-blur-md p-0 flex flex-col">
              <SheetTitle className="sr-only">Main menu</SheetTitle>
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
                  <Link
                    href="/features"
                    className={mobileNavLinkClasses}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Features
                  </Link>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="product-menu" className="border-b-0">
                      <AccordionTrigger className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground hover:bg-accent/20 px-3 py-2.5 rounded-md hover:no-underline justify-between w-full">
                        <span className="flex-1 text-left">Product</span>
                      </AccordionTrigger>
                      <AccordionContent className="pl-6 pt-1 pb-1 space-y-1">
                         <Link
                          href="/job-seekers"
                          className={cn(mobileNavLinkClasses, "text-base py-2")}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          For Job Seekers
                        </Link>
                         <a
                           href="https://talent-flow-seven.vercel.app/"
                           target="_blank"
                           rel="noopener noreferrer"
                           className={cn(mobileNavLinkClasses, "text-base py-2")}
                           onClick={() => setIsMobileMenuOpen(false)}
                         >
                           For Employers
                         </a>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <Link
                    href="/how-it-works"
                    className={mobileNavLinkClasses}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Our Process
                  </Link>
                   <Link
                    href="/about"
                    className={mobileNavLinkClasses}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About Us
                  </Link>
                   <Link
                    href="/investors"
                    className={mobileNavLinkClasses}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Investors
                  </Link>
                   <Link
                    href="/contact"
                    className={mobileNavLinkClasses}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
              </nav>
              <div className="p-4 border-t border-border/60 space-y-3 bg-background">
                <Button asChild variant="outline" className="w-full text-base py-3 h-auto">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <LogIn className="mr-2 h-5 w-5" />
                    Sign In
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full text-base py-3 h-auto bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90"
                >
                  <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <UserPlus className="mr-2 h-5 w-5" />
                    Sign Up
                  </Link>
                </Button>
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
