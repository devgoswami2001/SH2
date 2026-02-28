'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { signIn } from 'next-auth/react';
import { Separator } from '@/components/ui/separator';

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

export function LoginForm() {
  const router = useRouter(); 
  const searchParams = useSearchParams();
  const isVerified = searchParams.get('status') === 'verified';

  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const loginResponse = await fetch('https://backend.hyresense.com/api/v1/token/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: username, password: password })
      });

      if (!loginResponse.ok) {
          const errorData = await loginResponse.json();
          throw new Error(errorData.detail || 'Login failed. Please check your credentials.');
      }

      const loginData = await loginResponse.json();
      const accessToken = loginData.access;
      localStorage.setItem('accessToken', accessToken);
      
      const resumeCheckResponse = await fetch('https://backend.hyresense.com/api/v1/jobseeker/check-resume/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      if (!resumeCheckResponse.ok) {
        console.error("Failed to check resume status, proceeding to job feed.");
        router.push('/job-feed');
        return;
      }
      
      const resumeData = await resumeCheckResponse.json();
      
      if (resumeData.has_resume) {
        router.push('/job-feed');
      } else {
        router.push('/create-resume');
      }

    } catch (err: any) {
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/job-feed' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 px-6 sm:px-8">
          {isVerified && (
            <Alert variant="default" className="bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-800/50">
              <AlertCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle className="text-green-800 dark:text-green-300">Verification Successful!</AlertTitle>
              <AlertDescription className="text-green-700 dark:text-green-400">
                Your account has been verified. Please log in to continue.
              </AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Login Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2 relative">
            <Label htmlFor="username" className="text-sm font-medium flex items-center gap-1.5">
              <Mail className="h-4 w-4 text-primary/80" /> Email or Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="you@example.com or your_username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70 h-11 text-base pl-4 pr-2"
            />
          </div>
          <div className="space-y-2 relative">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-primary/80" /> Password
              </Label>
              <Link
                href="#"
                className="text-xs text-primary hover:underline hover:text-accent transition-colors"
              >
                Forgot password?
              </Link>
            </div>
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
        <div className="flex flex-col gap-4 px-6 sm:px-8 pb-4">
          <Button type="submit" className="w-full h-12 text-base font-semibold group bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-[1.02]" disabled={isLoading}>
             {isLoading ? 'Signing In...' : 'Sign In'} 
             <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </form>
      <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full h-11 text-sm border-border/60 hover:bg-muted/80 hover:border-primary/50"
          onClick={handleGoogleSignIn}
        >
          <GoogleIcon /> Sign in with Google
        </Button>
      </div>
    </div>
  );
}
