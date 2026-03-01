
'use client';

import { SessionProvider, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Syncs the NextAuth Google session with the HyreSense backend.
 * This component runs in the background and watches for a valid NextAuth session
 * to exchange the Google ID Token for a backend-issued JWT.
 */
const AuthBackendSync = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const syncWithBackend = async () => {
      // We only want to sync if:
      // 1. NextAuth has successfully authenticated the user.
      // 2. We have the idToken available in the session.
      // 3. We don't already have an active backend accessToken in localStorage.
      // 4. We aren't already in the middle of a sync process.
      
      const idToken = (session as any)?.idToken;

      if (
        status === 'authenticated' && 
        idToken && 
        !localStorage.getItem('accessToken') && 
        !isSyncing
      ) {
        setIsSyncing(true);
        console.log("Auth Sync: NextAuth authenticated. Attempting backend sync...");

        try {
          // Exchange Google ID Token for Backend Tokens (Django/REST)
          const response = await fetch('https://backend.hyresense.com/api/v1/auth/google/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: idToken }),
          });

          if (!response.ok) {
            const errorBody = await response.text();
            console.error("Auth Sync: Backend exchange failed.", errorBody);
            throw new Error('Backend sync failed');
          }

          const data = await response.json();
          console.log("Auth Sync: Backend exchange successful.", data);
          
          const accessToken = data.tokens?.access;

          if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            
            // Proceed to verify if the user has a resume/profile set up
            try {
              const resumeCheckResponse = await fetch('https://backend.hyresense.com/api/v1/jobseeker/check-resume/', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
                }
              });
              
              if (!resumeCheckResponse.ok) {
                console.warn("Auth Sync: Resume check failed, defaulting to job feed.");
                router.push('/job-feed');
                return;
              }
              
              const resumeData = await resumeCheckResponse.json();
              
              if (resumeData.has_resume) {
                console.log("Auth Sync: User has resume. Redirecting to job feed.");
                router.push('/job-feed');
              } else {
                console.log("Auth Sync: User has no resume. Redirecting to creation flow.");
                router.push('/create-resume');
              }
            } catch (resumeError) {
              console.error("Auth Sync: Critical error during resume check.", resumeError);
              router.push('/job-feed');
            }
          } else {
            console.error("Auth Sync: Backend did not return an access token in the expected format.");
          }
        } catch (error) {
          console.error("Auth Sync: Critical error during sync process.", error);
        } finally {
          setIsSyncing(false);
        }
      }
    };

    syncWithBackend().catch(e => console.error("Auth Sync: Unhandled failure.", e));
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
