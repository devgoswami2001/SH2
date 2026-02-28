
'use client';

import { SessionProvider, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Syncs the NextAuth Google session with the HyreSense backend.
 */
const AuthBackendSync = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const syncWithBackend = async () => {
      // Only sync if we have a Google session but no backend token yet
      if (
        status === 'authenticated' && 
        (session as any)?.idToken && 
        !localStorage.getItem('accessToken') && 
        !isSyncing
      ) {
        setIsSyncing(true);
        try {
          // Exchange Google ID Token for Backend Tokens
          const response = await fetch('https://backend.hyresense.com/api/v1/auth/google/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: (session as any).idToken }),
          });

          if (!response.ok) {
            throw new Error('Failed to sync Google account with backend');
          }

          const data = await response.json();
          const accessToken = data.tokens?.access;

          if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            
            // Now proceed to the "Normal Login" logic: Check for resume
            const resumeCheckResponse = await fetch('https://backend.hyresense.com/api/v1/jobseeker/check-resume/', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
              }
            });
            
            if (!resumeCheckResponse.ok) {
              router.push('/job-feed');
              return;
            }
            
            const resumeData = await resumeCheckResponse.json();
            
            if (resumeData.has_resume) {
              router.push('/job-feed');
            } else {
              router.push('/create-resume');
            }
          }
        } catch (error) {
          console.error("Auth sync error:", error);
        } finally {
          setIsSyncing(false);
        }
      }
    };

    syncWithBackend();
  }, [session, status, router, isSyncing]);

  return null;
};

export const NextAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <AuthBackendSync />
      {children}
    </SessionProvider>
  );
};
