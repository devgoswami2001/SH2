
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

function VerifyOtpComponent() {
  const [cardRef, isCardVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      // If email is not in query params, redirect to signup
      router.push('/signup');
    }
  }, [email, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('https://backend.hyresense.com/api/v1/otp/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp_code: otp,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to verify OTP.');
      }
      
      // On successful OTP verification, redirect to login with a success message
      router.push('/login?status=verified');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-animated p-4 overflow-hidden">
      <div className="absolute inset-0 opacity-20 dark:opacity-15"></div>
      <div
        ref={cardRef}
        className={cn(
          "w-full max-w-md opacity-0 translate-y-12 transition-all duration-1000 ease-out relative z-10",
          isCardVisible && "opacity-100 translate-y-0"
        )}
      >
        <Card className="bg-card/80 dark:bg-slate-800/70 backdrop-blur-xl shadow-2xl border border-border/30 rounded-2xl">
          <CardHeader className="text-center p-6 sm:p-8">
            <Link href="/" className="inline-block mb-6 mx-auto group">
              <Image src="/logo.png" alt="HyreSense Logo" width={60} height={40} className="transition-transform duration-300 group-hover:scale-110" />
            </Link>
            <CardTitle className="text-3xl font-bold text-foreground">Verify Your Account</CardTitle>
            <CardDescription className="text-muted-foreground pt-1">
              An OTP has been sent to <span className="font-semibold text-primary">{email}</span>. Please enter it below.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 px-6 sm:px-8">
               {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Verification Failed</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
               <div className="space-y-2 relative">
                <Label htmlFor="otp" className="text-sm font-medium flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-primary/80" /> One-Time Password (OTP)
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter the 6-digit code"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70 h-11 text-base tracking-widest text-center"
                  maxLength={6}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-6 px-6 sm:px-8 pb-6 sm:pb-8">
              <Button type="submit" className="w-full h-12 text-base font-semibold group bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-[1.02]" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify Account'}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Didn't receive the code?{' '}
                <button type="button" className="font-semibold text-primary hover:underline hover:text-accent transition-colors" disabled>
                   Resend OTP
                </button>
              </p>
            </CardFooter>
          </form>
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
}


export default function VerifyOtpPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyOtpComponent />
        </Suspense>
    );
}
