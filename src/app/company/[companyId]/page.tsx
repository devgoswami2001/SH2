
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Building, MapPin, Users, Rss, Newspaper, Loader2, AlertCircle, ArrowLeft, FilePenLine, Save, X, Activity, ArrowRight, UserPlus, AlertTriangle, CheckCircle, Linkedin } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Icons } from '@/components/icons';
import { AppHeader } from '@/components/layout/AppHeader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';


// --- Data Structures based on API ---
interface CompanyJob {
    id: string;
    title: string;
    location: string;
    employment_type: string;
    experience_level: string;
    working_mode: string;
}

interface CompanyPost {
    id: string;
    title: string;
    content: string;
    image: string | null;
    created_at: string;
    likes_count: number;
    comments_count: number;
    category: string;
}

interface LeadershipMember {
    id: number;
    name: string;
    position: string;
    bio: string;
    linkedin: string;
    photo: string | null;
}

// Represents the `employer_profile` object in the API response
interface EmployerProfileData {
    id: string;
    name: string;
    tagline: string | null;
    industry: string;
    city: string;
    state: string;
    followers_count: number;
    logo: string | null;
    banner: string | null;
    about: string;
    website: string;
    description: string;
    company_name: string;
    designation: string | null;
}

// Represents the entire shape of the data passed to the page content component
interface CompanyPageData {
    id: string;
    company_name: string;
    designation: string | null;
    description: string;
    website: string;
    logo: string | null;
    banner: string | null;
    jobs: CompanyJob[];
    posts: CompanyPost[];
    leadership_team: LeadershipMember[];
    company_stats: {
        active_jobs: number;
        followers_count: number;
    };
    user_permissions: {
        can_edit_profile: boolean;
    };
}


// --- Mapped Component Props ---
interface CompanyProfilePageProps {
    initialCompanyInfo: CompanyPageData | null;
    error: string | null;
}

const CompanyProfilePageContent = ({ initialCompanyInfo, error }: CompanyProfilePageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [companyInfo, setCompanyInfo] = useState(initialCompanyInfo);
  const { toast } = useToast();
  
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(true);

  const fetchFollowStatus = useCallback(async () => {
    if (!initialCompanyInfo) return;
    setIsFollowLoading(true);
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setIsFollowLoading(false);
      return;
    }
    try {
      const response = await fetch(`https://backend.hyresense.com/api/v1/jobseeker/company/${initialCompanyInfo.id}/follow-status/`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      if (response.ok) {
        const data = await response.json();
        setIsFollowing(data.is_following);
      }
    } catch (error) {
      console.error("Failed to fetch follow status", error);
    } finally {
      setIsFollowLoading(false);
    }
  }, [initialCompanyInfo]);
  
  useEffect(() => {
    fetchFollowStatus();
  }, [fetchFollowStatus]);

  const handleFollowToggle = async () => {
    if (!companyInfo) return;
    setIsFollowLoading(true);
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to follow.' });
      setIsFollowLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://backend.hyresense.com/api/v1/jobseeker/follow-company/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ company_id: companyInfo.id }),
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Something went wrong.');
      }
      
      const newFollowingStatus = data.is_following;
      setIsFollowing(newFollowingStatus);

      setCompanyInfo(prev => {
        if (!prev) return null;
        const currentFollowers = prev.company_stats.followers_count;
        return {
          ...prev,
          company_stats: {
            ...prev.company_stats,
            followers_count: newFollowingStatus ? currentFollowers + 1 : Math.max(0, currentFollowers - 1),
          }
        }
      });
      
      toast({
        title: "Success",
        description: data.message || `You are now ${newFollowingStatus ? 'following' : 'unfollowing'} ${companyInfo.company_name}.`
      });

    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Error', description: err.message });
    } finally {
      setIsFollowLoading(false);
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!companyInfo) return;
    const { name, value } = e.target;
    setCompanyInfo(prev => prev ? { ...prev, [name]: value } : null);
  };
  
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!companyInfo) return;
    setIsSaving(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));

    Object.assign(initialCompanyInfo || {}, companyInfo);

    toast({
        title: "Profile Updated",
        description: "Your company profile has been saved successfully.",
    });
    
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleCancel = () => {
    setCompanyInfo(initialCompanyInfo);
    setIsEditing(false);
  };
  
    if (error) {
        return (
            <div className="container mx-auto py-10">
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Failed to Load Profile</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    }
  
    if (!companyInfo) {
        return (
            <div className="container mx-auto py-10 text-center">
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Profile Not Found</AlertTitle>
                    <AlertDescription>No company profile found. Please create one from your dashboard.</AlertDescription>
                </Alert>
            </div>
        )
    }

  return (
    <div className="bg-muted/20 min-h-screen">
      <div className="relative bg-gradient-to-br from-primary/80 to-accent/80 pb-16 pt-24">
         {companyInfo.banner ? (
              <Image
                  src={companyInfo.banner}
                  alt="Company banner"
                  data-ai-hint="abstract technology"
                  fill
                  className="object-cover absolute inset-0 z-0"
              />
          ) : (
              <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-accent/50 z-0"></div>
          )}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>
      </div>
      
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <Card className="w-full -mt-16 z-10 relative shadow-xl">
           <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-background border-4 border-background shadow-md flex items-center justify-center shrink-0 p-2">
                    {companyInfo.logo ? (
                      <Image src={companyInfo.logo} alt="Company Logo" width={128} height={128} className="h-full w-full rounded-full object-contain" />
                    ) : (
                      <Building className="h-20 w-20 text-primary" />
                    )}
                </div>
                <div className="flex-grow text-center md:text-left">
                     <h1 className="text-3xl font-bold font-headline text-foreground">{companyInfo.company_name}</h1>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    {!isEditing && (
                      <>
                        <Button 
                            onClick={handleFollowToggle} 
                            disabled={isFollowLoading} 
                            variant={isFollowing ? 'outline' : 'default'}
                            className={cn(
                                "w-32 group transition-all duration-300 ease-out transform hover:scale-105",
                                isFollowing && "hover:bg-destructive/10 hover:border-destructive hover:text-destructive"
                            )}
                        >
                            {isFollowLoading ? <Loader2 className="h-4 w-4 animate-spin"/> : (
                                isFollowing ? (
                                    <>
                                        <CheckCircle className="mr-2 h-4 w-4 text-green-500 group-hover:text-destructive transition-colors"/> 
                                        <span className="group-hover:hidden">Following</span>
                                        <span className="hidden group-hover:inline">Unfollow</span>
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="mr-2 h-4 w-4"/> Follow
                                    </>
                                )
                            )}
                        </Button>
                        {companyInfo.user_permissions.can_edit_profile && (
                            <Button variant="outline" onClick={() => setIsEditing(true)} className="transition-transform hover:scale-105">
                                <FilePenLine className="mr-2 h-4 w-4" />
                                Edit Profile
                            </Button>
                        )}
                      </>
                    )}
                </div>
           </CardContent>
        </Card>
        
        {isEditing ? (
            <Card>
                <CardHeader>
                    <CardTitle>Edit Company Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="company_name">Company Name</Label>
                            <Input id="company_name" name="company_name" value={companyInfo.company_name} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Company Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={companyInfo.description}
                                onChange={handleInputChange}
                                className="text-base leading-relaxed min-h-[150px]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="website">Company Website</Label>
                            <Input id="website" name="website" value={companyInfo.website} onChange={handleInputChange} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="logo">Company Logo (update)</Label>
                                <Input id="logo" name="logo" type="file" accept="image/*" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="banner">Company Banner (update)</Label>
                                <Input id="banner" name="banner" type="file" accept="image/*" />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <Button variant="outline" type="button" onClick={handleCancel} disabled={isSaving}>
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSaving}>
                                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        ) : (
            <div>
                 <Tabs defaultValue="about" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto sticky top-2 z-20">
                        <TabsTrigger value="about" className="hover:bg-muted/80 data-[state=active]:underline">About Us</TabsTrigger>
                        <TabsTrigger value="careers" className="hover:bg-muted/80 data-[state=active]:underline">Careers ({companyInfo.jobs.length})</TabsTrigger>
                        <TabsTrigger value="news" className="hover:bg-muted/80 data-[state=active]:underline">News ({companyInfo.posts.length})</TabsTrigger>
                    </TabsList>

                    <div className="mt-8 space-y-8">
                        <TabsContent value="about">
                           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                               <div className="lg:col-span-2 space-y-8">
                                    <div className="bg-card p-6 rounded-lg border">
                                        <h2 className="text-2xl font-bold font-headline mb-4">About {companyInfo.company_name}</h2>
                                        <Separator className="mb-6"/>
                                            <div className="prose prose-base dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                                {companyInfo.description}
                                            </div>
                                    </div>
                                    {companyInfo.leadership_team && companyInfo.leadership_team.length > 0 && (
                                        <div className="bg-card p-6 rounded-lg border">
                                            <h2 className="text-2xl font-bold font-headline mb-4">Meet Our Leadership</h2>
                                            <Separator className="mb-6"/>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                {companyInfo.leadership_team.map(member => (
                                                    <Card key={member.id} className="border-border/60 shadow-md hover:shadow-lg transition-shadow">
                                                        <CardContent className="p-4 flex flex-col items-center text-center">
                                                            <Avatar className="h-24 w-24 mb-4 border-4 border-primary/20">
                                                                <AvatarImage src={member.photo || undefined} alt={member.name} />
                                                                <AvatarFallback>{member.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                                                            </Avatar>
                                                            <p className="font-semibold text-foreground">{member.name}</p>
                                                            <p className="text-sm text-primary capitalize">{member.position}</p>
                                                            <p className="text-xs text-muted-foreground mt-2 line-clamp-3">{member.bio}</p>
                                                            <Button variant="ghost" size="icon" className="mt-3 text-muted-foreground hover:text-primary" asChild>
                                                                <a href={member.linkedin} target="_blank" rel="noreferrer noopener">
                                                                    <Linkedin className="h-5 w-5"/>
                                                                </a>
                                                            </Button>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                               </div>
                               <div className="space-y-6">
                                   <Card className="bg-card border">
                                       <CardHeader>
                                           <CardTitle className="font-headline text-lg">Quick Stats</CardTitle>
                                       </CardHeader>
                                       <CardContent className="space-y-4 text-sm">
                                           <div className="flex justify-between items-center gap-4">
                                               <span className="text-muted-foreground flex items-center gap-2"><Building /> Active Jobs</span>
                                               <span className="font-bold text-lg">{companyInfo.company_stats.active_jobs}</span>
                                           </div>
                                           <div className="flex justify-between items-center gap-4">
                                               <span className="text-muted-foreground flex items-center gap-2"><Users /> Followers</span>
                                               <span className="font-bold text-lg">{companyInfo.company_stats.followers_count}</span>
                                           </div>
                                       </CardContent>
                                   </Card>
                                    <Button asChild className="w-full">
                                        <a href={companyInfo.website} target="_blank" rel="noreferrer noopener">
                                            Visit Website <ArrowRight className="ml-2 w-4 h-4"/>
                                        </a>
                                    </Button>
                               </div>
                           </div>
                        </TabsContent>

                        <TabsContent value="careers">
                             <h2 className="text-2xl font-bold font-headline mb-6 text-center">Open Positions</h2>
                            {companyInfo.jobs.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {companyInfo.jobs.map(job => (
                                        <Card key={job.id} className="flex flex-col hover:border-primary/50 hover:shadow-lg transition-all bg-card">
                                            <CardHeader>
                                                <CardTitle className="font-headline text-lg">{job.title}</CardTitle>
                                                <CardDescription className="flex items-center gap-2 pt-1 text-sm">
                                                    <MapPin className="w-4 h-4" /> {job.location}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="flex-1">
                                                <div className="flex flex-wrap gap-2">
                                                    <Badge variant="secondary">{job.experience_level}</Badge>
                                                    <Badge variant="secondary">{job.employment_type}</Badge>
                                                    <Badge variant="secondary">{job.working_mode}</Badge>
                                                </div>
                                            </CardContent>
                                            <CardFooter>
                                                <Button asChild className="w-full">
                                                    <Link href={`/jobs/${job.id}`}>View Details <ArrowRight className="ml-2 w-4 h-4" /></Link>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 border-2 border-dashed rounded-lg bg-card">
                                    <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
                                    <h3 className="mt-4 text-lg font-medium">No Open Positions</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        There are no active job openings at the moment. Follow us for future updates!
                                    </p>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="news">
                            <h2 className="text-2xl font-bold font-headline mb-6 text-center">What's Happening at {companyInfo.company_name}</h2>
                            {companyInfo.posts.length > 0 ? (
                                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                    {companyInfo.posts.map(post => (
                                        <Card key={post.id} className="overflow-hidden group bg-card">
                                            {post.image && (
                                                <div className="relative w-full aspect-video overflow-hidden">
                                                    <Image
                                                        src={post.image}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                        data-ai-hint="company news"
                                                    />
                                                </div>
                                            )}
                                            <CardHeader>
                                                <Badge variant="outline" className="w-fit mb-2">{post.category}</Badge>
                                                <CardTitle className="font-headline text-xl">{post.title}</CardTitle>
                                                <CardDescription>{format(new Date(post.created_at), "PPP")}</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm text-muted-foreground line-clamp-3">{post.content}</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                 <div className="text-center py-16 border-2 border-dashed rounded-lg bg-card">
                                    <Rss className="mx-auto h-12 w-12 text-muted-foreground" />
                                    <h3 className="mt-4 text-lg font-medium">No News Yet</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        There are no company news or announcements at the moment.
                                    </p>
                                </div>
                            )}
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        )}
      </main>
    </div>
  );
}


// This is the main page component that Next.js will render on the server.
export default function CompanyPageWrapper() {
    const params = useParams();
    const companyId = params.companyId as string;
    const [profileData, setProfileData] = useState<CompanyProfilePageProps | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchCompanyProfile = async (id: string) => {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                setProfileData({ initialCompanyInfo: null, error: 'Authentication required. Please log in.'});
                setIsLoading(false);
                return;
            }

            try {
                const res = await fetch(`https://backend.hyresense.com/api/v1/jobseeker/employer-profiles/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                
                if (!res.ok) {
                    if (res.status === 404) throw new Error('Company not found.');
                    const errorBody = await res.json();
                    throw new Error(errorBody.detail || `Failed to fetch company data. Status: ${res.status}`);
                }

                const companyData = await res.json();
                
                const formattedPosts = (companyData.latest_company_posts?.results || []).map((post: any) => ({
                    ...post,
                    image: post.image ? `https://backend.hyresense.com${post.image}` : null,
                }));

                const formattedLeadership = (companyData.leadership_team?.results || []).map((member: any) => ({
                    ...member,
                    photo: member.photo ? `https://backend.hyresense.com${member.photo}`: null,
                }))

                const props: CompanyProfilePageProps = {
                    initialCompanyInfo: {
                        id: companyData.employer_profile.id,
                        company_name: companyData.employer_profile.company_name,
                        designation: companyData.employer_profile.designation,
                        description: companyData.employer_profile.description,
                        website: companyData.employer_profile.website,
                        logo: companyData.employer_profile.logo ? `https://backend.hyresense.com${companyData.employer_profile.logo}` : null,
                        banner: companyData.employer_profile.banner ? `https://backend.hyresense.com${companyData.employer_profile.banner}` : null,
                        jobs: companyData.latest_job_posts?.results || [],
                        posts: formattedPosts,
                        leadership_team: formattedLeadership,
                        company_stats: { 
                            active_jobs: companyData.latest_job_posts?.count || 0,
                            followers_count: companyData.employer_profile.followers_count || 0
                        },
                        user_permissions: companyData.user_permissions || { can_edit_profile: false },
                    },
                    error: null,
                };
                
                setProfileData(props);

            } catch (err: any) {
                setProfileData({
                    initialCompanyInfo: null,
                    error: err.message || 'An unknown error occurred.',
                });
            } finally {
                setIsLoading(false);
            }
        };

        if (companyId) {
            setIsLoading(true);
            fetchCompanyProfile(companyId);
        }
    }, [companyId, router]);
    
    if (isLoading) {
        return (
            <div className="flex flex-col h-screen">
                <AppHeader />
                <div className="flex-1 flex items-center justify-center bg-muted/30">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
            </div>
        );
    }

    if (!profileData) return null;

    return (
        <div className="flex flex-col h-screen bg-muted/20">
            <AppHeader />
            <ScrollArea className="flex-1">
               <CompanyProfilePageContent {...profileData} />
            </ScrollArea>
        </div>
    );
}

    