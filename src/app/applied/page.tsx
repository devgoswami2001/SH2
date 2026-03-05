'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, PackageSearch, Loader2, AlertCircle, Sparkles, Briefcase, Check, X, ThumbsUp, ThumbsDown, MessageSquare, Send, ArrowLeft, MoreHorizontal, Paperclip, User } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { MobileAppLayout } from '@/components/layout/MobileAppLayout'; 
import { AppHeader } from '@/components/layout/AppHeader';
import type { AppJob, JobStatus } from '@/app/job-feed/page'; 
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { formatDistanceToNow, isValid } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { useSession } from 'next-auth/react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

interface AiAnalysis {
    id: string;
    is_fit: boolean;
    fit_score: number;
    fit_level: string;
    remarks: string;
    strengths: string[];
    weaknesses: string[];
    missing_skills: string[];
    matching_skills: string[];
    interview_recommendation: boolean;
    confidence_score: number;
    overall_recommendation: string;
}

interface ComprehensiveApplication {
    id: number;
    job_title: string;
    company_name: string;
    company_logo: string | null;
    location: string;
    employment_type: string;
    experience_level: string;
    working_mode: string;
    job_description: string;
    required_skills: string[];
    job_created_at: string;
    applied_at: string;
    status: JobStatus;
    ai_analysis: AiAnalysis | null;
}

interface AppliedAppJob extends AppJob {
    appliedDate: string;
}

// --- Innovative Chat Component ---
const JobChatDrawer: React.FC<{ job: AppliedAppJob }> = ({ job }) => {
    const [messages, setMessages] = useState<{ id: string, text: string, sender: 'me' | 'employer', time: Date }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initial simulated message
        setMessages([
            { 
                id: '1', 
                text: `Hello! We've received your application for the ${job.title} position. Your profile looks impressive. Would you be available for a brief introductory call this week?`, 
                sender: 'employer', 
                time: new Date(Date.now() - 1000 * 60 * 60) 
            }
        ]);
    }, [job.title]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newMessage = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'me' as const,
            time: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        setInputValue('');

        // Simulate employer typing
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: "Thanks for your response! Our HR team will reach out shortly with a calendar invite.",
                sender: 'employer',
                time: new Date()
            }]);
        }, 1500);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 flex items-center gap-2 group transition-all duration-300">
                    <MessageSquare className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>Message Recruiter</span>
                    <span className="relative flex h-2 w-2 ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col border-l border-border/40 bg-background/95 backdrop-blur-xl">
                <SheetHeader className="p-4 border-b border-border/50 bg-muted/30">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-primary/20">
                            <AvatarImage src={job.image} />
                            <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-left">
                            <SheetTitle className="text-base font-bold text-foreground truncate">{job.company}</SheetTitle>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                                Recruitment Team • Online
                            </p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                </SheetHeader>

                <ScrollArea className="flex-grow p-4 bg-muted/5 dark:bg-slate-900/10">
                    <div className="space-y-4">
                        <div className="flex justify-center">
                            <Badge variant="outline" className="bg-background/50 text-[10px] uppercase tracking-wider py-0.5">Today</Badge>
                        </div>
                        {messages.map((msg) => (
                            <div key={msg.id} className={cn("flex w-full", msg.sender === 'me' ? "justify-end" : "justify-start")}>
                                <div className={cn(
                                    "max-w-[85%] p-3 rounded-2xl text-sm shadow-sm transition-all duration-300",
                                    msg.sender === 'me' 
                                        ? "bg-primary text-primary-foreground rounded-br-none" 
                                        : "bg-card border border-border/50 text-foreground rounded-bl-none"
                                )}>
                                    <p className="leading-relaxed">{msg.text}</p>
                                    <p className={cn(
                                        "text-[10px] mt-1.5 opacity-70",
                                        msg.sender === 'me' ? "text-right" : "text-left"
                                    )}>
                                        {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div ref={scrollRef} />
                    </div>
                </ScrollArea>

                <div className="p-4 border-t border-border/50 bg-background/80">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <Button type="button" variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-muted rounded-full">
                            <Paperclip className="h-4 w-4" />
                        </Button>
                        <div className="relative flex-1">
                            <Input 
                                placeholder="Type a message..." 
                                className="h-10 rounded-full bg-muted/50 border-border/40 focus-visible:ring-primary/30 pr-10"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <Button 
                                type="submit" 
                                size="icon" 
                                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary hover:bg-primary/90 transition-transform active:scale-95"
                                disabled={!inputValue.trim()}
                            >
                                <Send className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    </form>
                    <p className="text-[10px] text-center text-muted-foreground mt-3 italic">
                        Messages are shared securely with the hiring team.
                    </p>
                </div>
            </SheetContent>
        </Sheet>
    );
};

// Custom AppliedJobDetailsView component for Applied Jobs
const AppliedJobDetailsView: React.FC<{
  job: AppliedAppJob;
  onBack: () => void;
  isDesktop?: boolean;
  onStatusUpdate?: (jobId: number | string, status: JobStatus) => void;
}> = ({ job, onBack, isDesktop = false, onStatusUpdate }) => {
  
  const handleStatusUpdateClick = (e: React.MouseEvent<HTMLButtonElement>, status: JobStatus) => {
    e.stopPropagation();
    if (onStatusUpdate) {
        onStatusUpdate(job.id, status);
    }
  }

  const renderActionButton = () => {
    if (!onStatusUpdate) return null;

    const status = job.applicationStatus;

    if (status === 'applied' || status === 'under_review' || status === 'shortlisted' || status === 'interview_scheduled' || status === 'offer_made') {
      return <Button variant="destructive" className="w-full mt-4" onClick={(e) => handleStatusUpdateClick(e, 'withdrawn')} size="lg">Withdraw Application</Button>;
    }
    if (status === 'user_rejected' || status === 'rejected' || status === 'withdrawn') {
      return <Button className="w-full mt-4" onClick={(e) => handleStatusUpdateClick(e, 'applied')} size="lg">Apply Again</Button>;
    }
    if (status === 'hired') {
      return <Button className="w-full mt-4" size="lg" disabled>Hired</Button>;
    }
    return null;
  };
  
  const analysis = job.analysisResult;

  return (
    <div className="h-full w-full flex flex-col bg-card md:bg-transparent">
        <div className="p-4 pb-0 flex items-center justify-between bg-card/50 backdrop-blur-md sticky top-0 z-20 md:bg-transparent">
            {onBack && (
                <Button variant="outline" onClick={onBack} className="flex items-center gap-2 group border-border/60 hover:border-primary/50 transition-all">
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden sm:inline">Back to List</span>
                    <span className="sm:hidden text-xs">Back</span>
                </Button>
            )}
            <JobChatDrawer job={job} />
        </div>
        <ScrollArea className="flex-grow">
            <div className={cn("space-y-4 p-4", isDesktop && "p-8 pt-4")}>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative w-24 h-24 shrink-0 shadow-sm border border-border rounded-lg overflow-hidden">
                        <Image src={job.image} alt={job.dataAiHint} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground">{job.title}</h2>
                                <div className="text-base mt-1">
                                    <span className="font-medium text-primary">{job.company}</span>
                                    <span className="text-muted-foreground"> - {job.location}</span>
                                </div>
                            </div>
                            <Badge className={cn("hidden sm:flex px-3 py-1 text-sm capitalize", getStatusBadgeClass(job.applicationStatus))}>
                                {job.applicationStatus?.replace(/_/g, ' ')}
                            </Badge>
                        </div>
                        <div className="pt-3 space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-primary/80" /><span>{job.jobType} &middot; {job.experienceLevel}</span></div>
                            <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary/80" /><span>{job.appliedDate}</span></div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                        <h4 className="text-lg font-semibold text-primary mb-2">Full Description:</h4>
                        <p className="text-muted-foreground whitespace-pre-line text-sm md:text-base leading-relaxed">{job.description}</p>
                    </div>
                    <div>
                        {job.skills && job.skills.length > 0 && (
                            <div>
                                <h4 className="text-lg font-semibold text-primary mb-2">Key Skills:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills.map((skill, index) => (
                                        <Badge key={index} variant="secondary" className="text-sm px-3 py-1 bg-primary/10 text-primary/90 border-primary/30">{skill}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                        {renderActionButton()}
                    </div>
                </div>

                {analysis && (
                     <div className="bg-muted/50 dark:bg-slate-800/50 rounded-xl p-4 md:p-6 mt-6">
                        <h3 className="text-xl font-bold text-primary flex items-center gap-2 mb-4"><Sparkles className="h-6 w-6"/> AI Job Review</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                            <Card className="bg-background/70 shadow-md">
                                <CardContent className="p-4">
                                     <p className="font-semibold text-foreground text-base mb-2">Fit Score: <span className="text-2xl font-bold text-primary">{analysis.fit_score}%</span></p>
                                     <Progress value={analysis.fit_score} className="h-3" />
                                     <p className="text-xs text-muted-foreground mt-1">Confidence: {analysis.confidence_score}%</p>
                                      <div className="mt-4 flex items-center gap-4">
                                        <p className="font-semibold text-foreground">AI Recommendation:</p>
                                        <Badge variant={analysis.interview_recommendation ? 'default' : 'destructive'} className={cn(analysis.interview_recommendation ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700", "dark:text-white text-base")}>
                                            {analysis.interview_recommendation ? <ThumbsUp className="mr-2 h-4 w-4"/> : <ThumbsDown className="mr-2 h-4 w-4"/>}
                                            {analysis.overall_recommendation}
                                        </Badge>
                                     </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-background/70 shadow-md">
                                <CardContent className="p-4">
                                     <h4 className="font-semibold mb-2 text-foreground">AI Remarks:</h4>
                                     <p className="text-muted-foreground text-xs leading-relaxed">{analysis.remarks}</p>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 mt-6 text-sm">
                            <div>
                                <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">Strengths:</h4>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs">
                                    {analysis.strengths.map((s, i) => <li key={`s-${i}`}>{s}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400">Weaknesses:</h4>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs">
                                    {analysis.weaknesses.map((w, i) => <li key={`w-${i}`}>{w}</li>)}
                                </ul>
                            </div>
                        </div>
                         <div className="grid md:grid-cols-2 gap-6 mt-6 text-sm">
                            <div>
                                <h4 className="font-semibold mb-2 text-foreground">Matching Skills:</h4>
                                <div className="flex flex-wrap gap-2">{analysis.matching_skills.map((s, i) => <Badge key={`ms-${i}`} variant="secondary" className="bg-green-100 text-green-800 border-green-300 dark:bg-green-900/50 dark:text-green-300">{s}</Badge>)}</div>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2 text-foreground">Missing Skills:</h4>
                                <div className="flex flex-wrap gap-2">{analysis.missing_skills.map((s, i) => <Badge key={`mis-${i}`} variant="destructive" className="bg-red-100 text-red-800 border-red-300 dark:bg-red-900/50 dark:text-green-300">{s}</Badge>)}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ScrollArea>
    </div>
  );
};


// --- Helper Functions ---
const getStatusBadgeClass = (status?: JobStatus): string => {
    switch (status) {
        case "Pending":
            return "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-700/30 dark:text-blue-300 dark:border-blue-500/50";
        case "Interview Scheduled":
        case "interview_scheduled":
            return "bg-green-100 text-green-700 border-green-300 dark:bg-green-700/30 dark:text-green-300 dark:border-blue-500/50";
        case "Offer Received":
        case "offer_made":
             return "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-600/30 dark:text-yellow-300 dark:border-yellow-500/50";
        case "Hired":
             return "bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-700/30 dark:text-purple-300 dark:border-purple-500/50";
        case "Rejected":
        case "rejected":
        case "user_rejected":
             return "bg-red-100 text-red-700 border-red-300 dark:bg-red-700/30 dark:text-red-300 dark:border-red-500/50";
        case "applied":
        case "under_review":
        case "shortlisted":
        case "withdrawn":
            return "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-700/30 dark:text-blue-300 dark:border-blue-500/50";
        default:
            return "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-700/30 dark:text-gray-300 dark:border-gray-500/50";
    }
};

const AppliedJobCard: React.FC<{ job: AppliedAppJob; onClick: () => void, isSelected?: boolean }> = ({ job, onClick, isSelected }) => {
    return (
        <Card
            className={cn(
                "bg-card/80 backdrop-blur-md shadow-lg overflow-hidden border border-border/30 mb-3 rounded-xl cursor-pointer hover:border-primary/50 transition-all duration-200 hover:shadow-primary/20 dark:bg-slate-800/60",
                "md:bg-card md:shadow-md md:hover:bg-accent/10 md:dark:hover:bg-slate-800/80",
                isSelected && "md:bg-primary/10 md:border-primary/60 md:dark:bg-primary/10"
            )}
            onClick={onClick}
        >
            <CardContent className="p-3 space-y-1.5">
                <div className="flex justify-between items-start">
                    <h3 className="text-base font-semibold text-foreground line-clamp-2 leading-tight">{job.title}</h3>
                    {job.applicationStatus && (
                        <Badge className={cn("text-xs px-2 py-0.5 whitespace-nowrap capitalize", getStatusBadgeClass(job.applicationStatus))}>
                            {job.applicationStatus.replace(/_/g, ' ')}
                        </Badge>
                    )}
                </div>
                <p className="text-xs text-primary font-medium">{job.company}</p>
                <p className="text-xs text-muted-foreground">{job.location}</p>
                 <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-0.5">
                    <CalendarDays className="h-3 w-3 text-primary/80" />
                    <span>{job.appliedDate}</span> 
                </div>
            </CardContent>
        </Card>
    );
};

const NoJobsPlaceholder: React.FC<{ error?: string | null }> = ({ error }) => (
    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-10">
        {error ? (
             <AlertCircle className="h-16 w-16 text-destructive/80 mb-4" />
        ) : (
             <PackageSearch className="h-16 w-16 text-primary/30 mb-4" />
        )}
        <h3 className="text-lg font-semibold text-foreground mb-1">
            {error ? 'Could Not Load Jobs' : 'No Applied Jobs Yet'}
        </h3>
        <p className="text-sm">
             {error ? error : 'Start swiping in the Job Feed to apply for positions!'}
        </p>
        <Button variant="outline" size="sm" className="mt-6" asChild>
            <Link href="/job-feed">Go to Job Feed</Link>
        </Button>
    </div>
);

export default function AppliedJobsPage() {
  const { status } = useSession();
  const [appliedJobs, setAppliedJobs] = useState<AppliedAppJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<AppliedAppJob | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchAppliedJobs = useCallback(async () => {
      setIsLoading(true);
      setError(null);
      
      const accessToken = localStorage.getItem('accessToken');

      if (status === 'loading') return;

      if (status === 'authenticated' && !accessToken) {
          console.log("Applied Jobs: Waiting for backend token sync...");
          return;
      }

      if (!accessToken) {
          setError("Please log in to view your applications.");
          setIsLoading(false);
          return;
      }

      try {
          const response = await fetch('https://backend.hyresense.com/api/v1/jobseeker/applications/comprehensive/', {
               headers: { 'Authorization': `Bearer ${accessToken}` },
          });
          if (!response.ok) throw new Error("Failed to fetch your applications.");
          
          const data = await response.json();
          const applications: ComprehensiveApplication[] = data.results || [];
          
          if (applications.length === 0) {
              setAppliedJobs([]);
              setIsLoading(false);
              return;
          }
          
          const formattedJobs: AppliedAppJob[] = applications.map(app => {
               const companyInitials = app.company_name ? app.company_name.substring(0, 2) : 'C';
               const appliedDateObj = new Date(app.applied_at);
               const appliedDateText = isValid(appliedDateObj) 
                ? `Applied ${formatDistanceToNow(appliedDateObj)} ago`
                : 'Applied recently';

               return {
                  id: app.id,
                  title: app.job_title,
                  company: app.company_name,
                  location: `${app.location} (${app.working_mode})`,
                  description: app.job_description,
                  image: app.company_logo || `https://placehold.co/128x128/e0e7ff/4a5568.png?text=${companyInitials}`,
                  dataAiHint: `${app.company_name || 'company'} logo`,
                  skills: app.required_skills,
                  experienceLevel: app.experience_level,
                  jobType: app.employment_type,
                  postedDate: new Date(app.job_created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                  appliedDate: appliedDateText,
                  applicationStatus: app.status,
                  analysisResult: app.ai_analysis,
                  fitScore: app.ai_analysis?.fit_score
               }
          });

          setAppliedJobs(formattedJobs);
          if (formattedJobs.length > 0 && !selectedJob) {
              setSelectedJob(formattedJobs[0]);
          }

      } catch (err: any) {
          setError(err.message || "An unknown error occurred.");
      } finally {
          setIsLoading(false);
      }
  }, [status, selectedJob]);

  useEffect(() => {
    fetchAppliedJobs().catch(e => console.error("Initial applied jobs fetch error:", e));
  }, [fetchAppliedJobs]);

  // Polling for token if authenticated via NextAuth but backend token missing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === 'authenticated' && !localStorage.getItem('accessToken')) {
      interval = setInterval(() => {
        if (localStorage.getItem('accessToken')) {
          fetchAppliedJobs();
          clearInterval(interval);
        }
      }, 500);
    }
    return () => clearInterval(interval);
  }, [status, fetchAppliedJobs]);

  const handleApplicationStatusUpdate = async (jobId: number | string, status: JobStatus) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        toast({ title: "Error", description: "You are not logged in.", variant: "destructive" });
        return;
    }

    const originalJobs = [...appliedJobs];
    const newJobs = appliedJobs.map(job => 
        job.id === jobId ? { ...job, applicationStatus: status } : job
    );
    setAppliedJobs(newJobs);
    if(selectedJob?.id === jobId) {
      setSelectedJob(prev => prev ? {...prev, applicationStatus: status} : null);
    }
    
    try {
        const response = await fetch(`https://backend.hyresense.com/api/v1/jobseeker/applications/${jobId}/status/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                status: status,
            }),
        });

        if (!response.ok) {
            let errorMessage = `Failed to update status to ${status}.`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.detail || errorMessage;
            } catch (e) {}
            throw new Error(errorMessage);
        }
        
        toast({ title: "Success", description: `Application status updated to ${status.replace(/_/g, ' ')}.` });
        fetchAppliedJobs().catch(e => console.error("Refresh applied jobs error:", e));

    } catch (err: any) {
        toast({ title: "Update Failed", description: err.message || "Network error", variant: "destructive" });
        setAppliedJobs(originalJobs);
        if(selectedJob?.id === jobId) {
          const originalJob = originalJobs.find(j => j.id === jobId);
          setSelectedJob(originalJob || null);
        }
    }
  }

  const isGlobalLoading = (status === 'loading') || (status === 'authenticated' && !localStorage.getItem('accessToken')) || (isLoading && appliedJobs.length === 0);

  const renderContent = () => {
    if (isGlobalLoading) {
        return <div className="flex items-center justify-center h-full"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>;
    }
    if (error) {
        return <NoJobsPlaceholder error={error} />;
    }
    if (appliedJobs.length === 0) {
        return <NoJobsPlaceholder />;
    }
    return appliedJobs.map(job => (
        <AppliedJobCard
            key={job.id}
            job={job}
            onClick={() => setSelectedJob(job)}
            isSelected={selectedJob?.id === job.id}
        />
    ));
  }

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden">
        <MobileAppLayout 
            activeView="applied" 
            pageTitle="Applied Jobs"
            selectedJobForDetails={selectedJob}
            setSelectedJobForDetails={setSelectedJob}
        >
          <div className="h-full w-full flex flex-col">
            <ScrollArea className="flex-grow p-3 bg-muted/20 dark:bg-slate-900/30">
                {isGlobalLoading ? (
                    <div className="flex items-center justify-center pt-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
                ) : error ? (
                    <div className="p-4"><Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert></div>
                ) : appliedJobs.length > 0 ? (
                    appliedJobs.map(job => (
                        <AppliedJobCard
                            key={job.id}
                            job={job}
                            onClick={() => setSelectedJob(job)}
                        />
                    ))
                ) : (
                    <NoJobsPlaceholder />
                )}
            </ScrollArea>
          </div>
        </MobileAppLayout>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex flex-col h-screen bg-background">
        <AppHeader />
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-0 overflow-hidden">
          {/* Jobs List Panel */}
          <div className="lg:col-span-1 xl:col-span-1 border-r border-border flex flex-col bg-card">
            <header className="p-4 border-b border-border sticky top-0 z-10">
              <h1 className="text-xl font-semibold text-foreground">Applied Jobs ({appliedJobs.length})</h1>
            </header>
            <ScrollArea className="flex-grow">
              <div className="p-4">
                {renderContent()}
              </div>
            </ScrollArea>
          </div>

          {/* Job Details Panel */}
          <div className="lg:col-span-2 xl:col-span-3 overflow-y-auto bg-muted/30">
            {selectedJob ? (
                <AppliedJobDetailsView 
                  job={selectedJob} 
                  onBack={() => setSelectedJob(null)} 
                  isDesktop={true}
                  onStatusUpdate={handleApplicationStatusUpdate}
                />
            ) : !isGlobalLoading && !error && (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-10">
                <PackageSearch className="h-20 w-20 text-primary/20 mb-5" />
                <h3 className="text-2xl font-semibold text-foreground mb-2">Select a Job</h3>
                <p className="text-md max-w-sm">Choose a job from the list on the left to see its full details, status, and description.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
