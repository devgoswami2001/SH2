
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Compass, LayoutGrid, ListChecks, User, Brain, Settings, LogOut, Crown, Video } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';

const navItems = [
  { label: "Job Feed", icon: LayoutGrid, href: "/job-feed" },
  { label: "Applied", icon: ListChecks, href: "/applied" },
  { label: "Interview", icon: Video, href: "/interview" },
  { label: "Explore", icon: Compass, href: "/explore" },
  { label: "Subscription", icon: Crown, href: "/subscription" },
];

interface UserData {
    name: string;
    initials: string;
    avatarUrl: string;
}

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            // No token, user is likely not logged in.
            return;
        }

        try {
            const [userResponse, profileResponse] = await Promise.all([
                fetch('http://127.0.0.1:8000/api/v1/jobseeker/users/me/', {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                }),
                fetch('http://127.0.0.1:8000/api/v1/jobseeker/jobseeker-profile/', {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                })
            ]);

            if (!userResponse.ok) {
                console.error("Failed to fetch user details");
                return;
            }
            
            const userDetails = await userResponse.json();
            const name = `${userDetails.first_name || ''} ${userDetails.last_name || ''}`.trim();
            const initials = name.split(' ').map(n => n[0]).join('');

            let avatarUrl = `https://placehold.co/128x128/e0e7ff/4a5568.png?text=${initials}`;

            if (profileResponse.ok) {
                const profileData = await profileResponse.json();
                const profile = profileData?.results?.[0];
                if (profile?.profile_picture) {
                    const imageUrl = profile.profile_picture;
                    if (!imageUrl.startsWith('http')) {
                        avatarUrl = `http://127.0.0.1:8000${imageUrl}`;
                    } else {
                        avatarUrl = imageUrl;
                    }
                }
            }

            setUserData({ name, initials, avatarUrl });

        } catch (error) {
            console.error("Error fetching user data for header:", error);
        }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/login');
    // You might want to add a toast notification here
  };


  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/40 bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-6">
            <Link href="/job-feed" className="flex items-center gap-2 group transition-opacity hover:opacity-80">
                <Image src="/logo.png" alt="HyreSense Logo" width={40} height={30} className="transition-transform group-hover:scale-105 duration-300" />
                <span
                    className="hidden sm:inline-block text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary transition-all group-hover:brightness-110 duration-300"
                    style={{ backgroundSize: '200% auto', animation: 'gradientShine 5s linear infinite' }}
                >
                    hyreSENSE
                </span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-2">
                {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Button asChild variant="ghost" key={item.label} className={cn(
                        "text-sm font-medium h-9",
                        isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}>
                        <Link href={item.href}>
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.label}
                        </Link>
                    </Button>
                );
                })}
            </nav>
        </div>

        <div className="flex items-center gap-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 outline-none">
                        {userData && <span className="text-sm font-medium text-muted-foreground hidden lg:inline">{userData.name}</span>}
                        <Avatar className="h-9 w-9 border-2 border-primary/50">
                            {userData ? (
                                <>
                                    <AvatarImage src={userData.avatarUrl} alt={userData.name} data-ai-hint="profile picture" />
                                    <AvatarFallback>{userData.initials}</AvatarFallback>
                                </>
                            ) : (
                                <AvatarFallback>U</AvatarFallback>
                            )}
                        </Avatar>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/profile"><User className="mr-2 h-4 w-4" />Profile</Link>
                    </DropdownMenuItem>
                     <DropdownMenuItem asChild>
                        <Link href="/settings"><Settings className="mr-2 h-4 w-4" />Settings</Link>
                     </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <style jsx global>{`
            @keyframes gradientShine {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
            }
        `}</style>
    </header>
  );
}
