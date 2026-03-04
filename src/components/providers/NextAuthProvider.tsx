'use client';

import { SessionProvider, useSession, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

/**
 * Syncs the NextAuth Google session with the HyreSense backend.
 */
const AuthBackendSync = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFailed, setSyncFailed] = useState(false);

  useEffect(() => {
    const syncWithBackend = async () => {
      const idToken = (session as any)?.idToken;

      if (
        status === 'authenticated' && 
        idToken && 
        !localStorage.getItem('accessToken') && 
        !isSyncing &&
        !syncFailed
      ) {
        setIsSyncing(true);
        console.log("Auth Sync: NextAuth authenticated. Attempting backend exchange...");

        try {
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
            
            // Immediately dispatch a storage event to notify other tabs/components
            window.dispatchEvent(new Event('storage'));
            
            // Verify profile status
            try {
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
              const targetPath = resumeData.has_resume ? '/job-feed' : '/create-resume';
              
              console.log(`Auth Sync: Redirecting to ${targetPath}`);
              
              if (pathname === targetPath) {
                // Already on target, components should pick up the token now
                // We'll trigger a reload just to be sure clean state is used
                window.location.reload();
              } else {
                router.push(targetPath);
              }
            } catch (resumeError) {
              console.error("Auth Sync: Resume check failed.", resumeError);
              router.push('/job-feed');
            }
          }
        } catch (error) {
          console.error("Auth Sync: Critical error during sync process.", error);
          setSyncFailed(true);
        } finally {
          setIsSyncing(false);
        }
      }
    };

    syncWithBackend().catch(e => console.error("Auth Sync: Unhandled failure.", e));
  }, [session, status, router, pathname, isSyncing, syncFailed]);

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
