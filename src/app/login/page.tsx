
import React, { Suspense } from 'react';
import { LoginClient } from './LoginClient';
import { Loader2 } from 'lucide-react';

// This is now a Server Component
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-animated">
        <Loader2 className="h-16 w-16 text-primary animate-spin" />
      </div>
    }>
      <LoginClient />
    </Suspense>
  );
}
