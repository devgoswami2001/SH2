// app/login/page.tsx (Server Component - NO 'use client')
import { Suspense } from 'react';
import LoginClient from './LoginClient';

interface LoginPageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-animated p-4 overflow-hidden">
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
      
      <Suspense 
        fallback={
          <div className="flex items-center justify-center min-h-[400px] w-full max-w-md">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        }
      >
        <LoginClient searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
