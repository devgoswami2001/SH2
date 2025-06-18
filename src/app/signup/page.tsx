
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function SignupPage() {
  const [cardRef, isCardVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/10 dark:from-slate-900 dark:via-primary/10 dark:to-accent/20 p-4">
       <div className="absolute inset-0 opacity-20 dark:opacity-15">
       </div>
      <div
        ref={cardRef}
        className={cn(
          "w-full max-w-md opacity-0 translate-y-12 transition-all duration-1000 ease-out relative z-10",
          isCardVisible && "opacity-100 translate-y-0"
        )}
      >
        <Card className="bg-card/80 dark:bg-slate-800/70 backdrop-blur-xl shadow-2xl border-border/30 rounded-2xl">
          <CardHeader className="text-center p-6 sm:p-8">
             <Link href="/" className="inline-block mb-6 mx-auto group">
               <Image src="/logo.png" alt="HyreSense Logo" width={60} height={40} className="transition-transform duration-300 group-hover:scale-110" />
            </Link>
            <CardTitle className="text-3xl font-bold text-foreground">Create Your Account</CardTitle>
            <CardDescription className="text-muted-foreground pt-1">
              Join HyreSense and discover a smarter way to connect.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 sm:p-8 text-center">
            <p className="text-lg text-muted-foreground mb-6">
              The full sign-up experience is coming soon!
            </p>
            <Button size="lg" asChild className="w-full max-w-xs mx-auto h-12 text-base font-semibold group bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-[1.02]">
              <Link href="/">
                Go to Homepage
              </Link>
            </Button>
            <p className="mt-6 text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-primary hover:underline hover:text-accent transition-colors">
                Sign In
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
