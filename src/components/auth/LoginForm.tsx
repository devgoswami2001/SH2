
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
          body: JSON.stringify({ email: username, password: password, role: 'jobseeker' })
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

  return (
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
      <div className="flex flex-col gap-6 px-6 sm:px-8 pb-6 sm:pb-8">
        <Button type="submit" className="w-full h-12 text-base font-semibold group bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-[1.02]" disabled={isLoading}>
           {isLoading ? 'Signing In...' : 'Sign In'} 
           <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </form>
  );
}
