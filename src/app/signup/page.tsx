
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, AlertCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
    <path fill="none" d="M1 1h22v22H1z" />
  </svg>
);

export default function SignupPage() {
  const [cardRef, isCardVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Step 1: Register the user
      const registerResponse = await fetch('http://127.0.0.1:8000/api/v1/register/jobseeker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          first_name: firstName,
          last_name: lastName,
        }),
      });

      if (!registerResponse.ok) {
        const errorData = await registerResponse.json();
        throw new Error(errorData.detail || 'Failed to register.');
      }

      // Step 2: Generate OTP
      const otpResponse = await fetch('http://127.0.0.1:8000/api/v1/otp/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      
      if (!otpResponse.ok) {
         const errorData = await otpResponse.json();
        throw new Error(errorData.detail || 'Failed to generate OTP.');
      }

      // Step 3: Redirect to OTP verification page
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);

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
            <CardTitle className="text-3xl font-bold text-foreground">Create Your Account</CardTitle>
            <CardDescription className="text-muted-foreground pt-1">
              Begin your journey with HyreSense.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 px-6 sm:px-8">
               {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Registration Failed</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
               <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 relative">
                    <Label htmlFor="firstName" className="text-sm font-medium flex items-center gap-1.5">
                      <User className="h-4 w-4 text-primary/80" /> First Name
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70 h-11 text-base pl-4 pr-2"
                    />
                  </div>
                  <div className="space-y-2 relative">
                    <Label htmlFor="lastName" className="text-sm font-medium flex items-center gap-1.5">
                       Last Name
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70 h-11 text-base pl-4 pr-2"
                    />
                  </div>
               </div>
                <div className="space-y-2 relative">
                <Label htmlFor="username" className="text-sm font-medium flex items-center gap-1.5">
                  <User className="h-4 w-4 text-primary/80" /> Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70 h-11 text-base pl-4 pr-2"
                />
              </div>
              <div className="space-y-2 relative">
                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-primary/80" /> Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70 h-11 text-base pl-4 pr-2"
                />
              </div>
              <div className="space-y-2 relative">
                <Label htmlFor="password" className="text-sm font-medium flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-primary/80" /> Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70 h-11 text-base pl-4 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-6 px-6 sm:px-8 pb-6 sm:pb-8">
              <Button type="submit" className="w-full h-12 text-base font-semibold group bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-[1.02]" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Separator className="my-1" />
              <div className="space-y-3 w-full">
                <p className="text-xs text-center text-muted-foreground">Or sign up with</p>
                <Button variant="outline" className="w-full h-11 text-sm border-border/60 hover:bg-muted/80 hover:border-primary/50">
                  <GoogleIcon /> Sign up with Google
                </Button>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-primary hover:underline hover:text-accent transition-colors">
                  Sign In
                </Link>
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
