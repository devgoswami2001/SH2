
'use client';

import React, { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from '@/components/auth/LoginForm';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-animated p-4 overflow-hidden">
      <div className="absolute inset-0 opacity-20 dark:opacity-15"></div>
      <div className="w-full max-w-md z-10">
        <Card className="bg-card/80 dark:bg-slate-800/70 backdrop-blur-xl shadow-2xl border border-border/30 rounded-2xl">
          <CardHeader className="text-center p-6 sm:p-8">
            <Link href="/" className="inline-block mb-6 mx-auto group">
              <Image src="/logo.png" alt="HyreSense Logo" width={60} height={40} className="transition-transform duration-300 group-hover:scale-110" />
            </Link>
            <CardTitle className="text-3xl font-bold text-foreground">Job Seeker Sign In</CardTitle>
            <CardDescription className="text-muted-foreground pt-1">
              Sign in to find your next career opportunity with HyreSense.
            </CardDescription>
          </CardHeader>
          <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
            <LoginForm />
          </Suspense>
          <CardFooter className="flex flex-col gap-6 px-6 sm:px-8 pb-6 sm:pb-8">
             <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link href="/signup" className="font-semibold text-primary hover:underline hover:text-accent transition-colors">
                  Sign Up
                </Link>
              </p>
          </CardFooter>
        </Card>
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
      `}</style>
    </div>
  );
};

export default LoginPage;
