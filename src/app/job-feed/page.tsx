'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Briefcase, CalendarDays, ArrowLeft, XCircle, CheckCircle, Loader2, AlertCircle, Sparkles, MapPin, Clock, ArrowRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { MobileAppLayout } from '@/components/layout/MobileAppLayout';
import { AppHeader } from '@/components/layout/AppHeader';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


// --- Data Structures ---
export type JobStatus = "Pending" | "Interview Scheduled" | "Offer Received" | "Hired" | "Rejected" | "applied" | "under_review" | "shortlisted" | "withdrawn" | "user_rejected" | "offer_made" ;

interface AnalysisResult {
  id: string;
  fit_score: number;
  fit_level: string;
  is_fit: boolean;
  remarks: string;
  strengths: string[];
  weaknesses: string[];
  missing_skills: string[];
  matching_skills: string[];
  interview_recommendation: boolean;
}

export interface AppJobBase {
  id: number | string;
  title: string;
  company: string;
  location: string;
  description: string;
  image: string;
  dataAiHint: string;
  skills: string[];
  experienceLevel: string;
  jobType: string;
  postedDate: string;
}

export interface AppJob extends AppJobBase {
  applicationStatus?: JobStatus;
  fitScore?: number | null;
  analysisResult?: AnalysisResult | null;
}

// --- API Job Structure (for reference) ---
interface ApiJob {
  id: number;
  title: string;
  company_name: string;
  company_profile_image: string | null;
  location: string;
  employment_type: string;
  experience_level: string;
  working_mode: string;
  description: string;
  required_skills: string[];
  created_at: string;
}

export const JobDetailsView: React.FC<{
  job: AppJob;
  onBack?: () => void;
  isDesktop?: boolean;
  onApply?: (jobId: number | string, status: 'applied') => void;
}> = ({ job, onBack, isDesktop, onApply }) => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(job.analysisResult || null);
  const [isLoading, setIsLoading] = useState(!job.analysisResult);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!job.analysisResult) {
      const fetchAnalysis = async () => {
        setIsLoading(true);
        setError(null);
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          setError("Authentication token not found.");
          setIsLoading(false);
          return;
        }

        try {
          const response = await fetch(`https://backend.hyresense.com/api/v1/jobseeker/analyze-application/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ job_post_id: job.id })
          });
          if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.detail || `HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (data.success) {
            setAnalysis(data.result);
          } else {
            throw new Error(data.message || "Analysis failed.");
          }
        } catch (err: any) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchAnalysis();
    }
  }, [job.id, job.analysisResult]);

  const handleApplyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onApply) {
      onApply(job.id, 'applied');
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-card md:bg-transparent">
      {isDesktop && onBack && (
        <div className="p-4 pb-0">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Feed
          </Button>
        </div>
      )}
      <ScrollArea className="flex-grow">
        <div className={cn("space-y-4 p-4", isDesktop && "p-8 pt-4")}>
          <div className="flex flex-col md:flex-row gap-6">
             <Avatar className="h-24 w-24 border-2 border-primary/20 p-2 shadow-md shrink-0">
                <AvatarImage src={job.image} alt={job.company} data-ai-hint={job.dataAiHint} className="object-contain" />
                <AvatarFallback className="text-3xl">{job.company.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">{job.title}</h2>
              <div className="text-base mt-1">
                <span className="font-medium text-primary">{job.company}</span>
                <span className="text-muted-foreground"> - {job.location}</span>
              </div>
              <div className="pt-3 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-primary/80" /><span>{job.jobType} &middot; {job.experienceLevel}</span></div>
                <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary/80" /><span>Posted: {job.postedDate}</span></div>
              </div>
            </div>
          </div>
          <Separator className="my-4 border-primary/30" />

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
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-sm px-3 py-1 border
                                   bg-primary/10 text-primary/80 border-primary/30
                                   dark:bg-primary/20 dark:text-primary/80 dark:border-primary/30"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full mt-8" onClick={handleApplyClick} size="lg">Apply Now</Button>
                </div>
              )}
            </div>
          </div>

          <Separator className="my-4 border-primary/30" />

          <div className="bg-muted/50 dark:bg-slate-800/50 rounded-xl p-4 md:p-6">
            <h3 className="text-xl font-bold text-primary flex items-center gap-2 mb-4"><Sparkles className="h-6 w-6" /> AI Job Review</h3>
            {isLoading && <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
            {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
            {analysis && (
              <div className="space-y-6 text-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-lg bg-background/70 shadow-md">
                  <div>
                    <p className="font-semibold text-foreground text-lg">{analysis.fit_score}% Fit Score</p>
                    <p className={cn("capitalize font-medium", analysis.is_fit ? "text-green-500" : "text-amber-500")}>{analysis.fit_level}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground text-lg">Worth Applying?</p>
                    <p className={cn("font-bold", analysis.interview_recommendation ? "text-green-500" : "text-red-500")}>{analysis.interview_recommendation ? 'Yes' : 'No'}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-foreground">AI Remarks:</h4>
                  <p className="text-muted-foreground">{analysis.remarks}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">Strengths:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {analysis.strengths.map((s, i) => <li key={`s-${i}`}>{s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400">Weaknesses:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {analysis.weaknesses.map((w, i) => <li key={`w-${i}`}>{w}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Matching Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.matching_skills.map((s, i) => (
                        <Badge
                          key={`ms-${i}`}
                          variant="secondary"
                          className="bg-green-100 text-green-800 border-green-300
                                     dark:bg-green-900/50 dark:text-green-300 dark:border-green-700/60"
                        >
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Missing Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.missing_skills.map((s, i) => (
                        <Badge
                          key={`mis-${i}`}
                          variant="destructive"
                          className="bg-red-100 text-red-800 border-red-300
                                     dark:bg-red-900/50 dark:text-red-300 dark:border-red-700/60"
                        >
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

const JobCard = ({
  job,
  isDesktop,
  onSwipe,
  onCardClick,
  setJobsToSwipe
}: {
  job: AppJob;
  isDesktop?: boolean;
  onSwipe?: (direction: 'left' | 'right') => void;
  onCardClick: (job: AppJob) => void;
  setJobsToSwipe: React.Dispatch<React.SetStateAction<AppJob[]>>;
}) => {
  const { toast } = useToast();
  const [fitScore, setFitScore] = useState<number | null>(job.fitScore || null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyzeFit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (fitScore !== null) return;

    setIsAnalyzing(true);
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      toast({ title: "Error", description: "Please log in to analyze fit.", variant: "destructive" });
      setIsAnalyzing(false);
      return;
    }
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/jobseeker/analyze-application/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
        body: JSON.stringify({ job_post_id: job.id })
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Analysis failed');
      }
      const data = await response.json();
      if (data.success) {
        setFitScore(data.result.fit_score);
        setJobsToSwipe(prev => prev.map(j => j.id === job.id ? { ...j, fitScore: data.result.fit_score } : j));
      } else {
        throw new Error(data.message || 'Analysis did not return a successful result');
      }
    } catch (err: any) {
      toast({ title: "Analysis Failed", description: err.message, variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const cardContent = (
    <div className="cursor-pointer" onClick={(e) => { e.stopPropagation(); onCardClick(job); }}>
      {/* Header */}
      <div className={cn("flex items-center justify-between p-4 border-b border-border", isDesktop && "p-6")}>
        <div className="flex items-center gap-4">
           <Avatar className="h-12 w-12 border-2 border-primary/20 p-1 shadow-md shrink-0">
              <AvatarImage src={job.image} alt={job.company} data-ai-hint={job.dataAiHint} className="object-contain" />
              <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-primary">{job.company}</p>
            <h2 className={cn("font-semibold text-foreground", isDesktop ? "text-xl" : "text-lg")}>{job.title}</h2>
            <p className={cn("text-muted-foreground flex items-center gap-1 mt-1", isDesktop ? "text-sm" : "text-xs")}>
              <MapPin className="w-4 h-4 text-secondary shrink-0" /> {job.location}
            </p>
          </div>
        </div>
        {/* Fit Check */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={cn("ml-2", isDesktop ? "" : "-mr-2")}>
          <Button
            className={cn(
              "relative bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground rounded-full shadow-md flex items-center gap-1.5",
              isDesktop ? "text-base px-6 py-2 h-auto" : "text-xs px-3 py-1 h-8"
            )}
            onClick={handleAnalyzeFit}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-yellow-300" />}
            <span className="font-medium">
              {fitScore !== null ? `${fitScore}% Fit` : "Fit Check"}
            </span>
          </Button>
        </motion.div>
      </div>

      {/* Job Info */}
      <div className={cn("grid grid-cols-2 gap-2 text-xs p-4 border-b border-border", isDesktop && "gap-3 text-sm p-6")}>
        <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md text-primary">
          <Briefcase className="w-4 h-4" /> {job.jobType} &middot; {job.experienceLevel}
        </div>
        <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md text-primary">
          <Clock className="w-4 h-4" /> Start: {job.postedDate}
        </div>
      </div>

      {/* Skills */}
      <div className={cn("p-4 border-b border-border", isDesktop && "p-6")}>
        <h3 className={cn("font-semibold text-foreground mb-3 uppercase tracking-wide", isDesktop ? "text-sm" : "text-xs")}>Required Skills</h3>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="px-3 py-1 rounded-full border transition
                         bg-secondary/10 text-secondary border-secondary/20
                         dark:bg-secondary/20 dark:text-secondary dark:border-secondary/30"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {/* About */}
      <div className={cn("p-4", isDesktop && "p-6")}>
        <h3 className={cn("font-semibold text-foreground mb-3 uppercase tracking-wide", isDesktop ? "text-sm" : "text-xs")}>About the Role</h3>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {job.description}
        </p>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Card className="relative w-full bg-card text-card-foreground rounded-2xl shadow-lg overflow-hidden border border-border">
        {cardContent}
        <div className="flex justify-between items-center p-6 bg-card border-t border-border">
          <Button variant="ghost" className="text-sm text-destructive hover:bg-destructive/10" onClick={() => onSwipe && onSwipe('left')}>
            <XCircle className="mr-2" /> Decline
          </Button>
          <Button className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-2 rounded-md text-sm shadow-md flex items-center gap-2" onClick={() => onSwipe && onSwipe('right')}>
            <CheckCircle className="mr-2" /> Apply <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="relative w-full bg-card text-card-foreground rounded-2xl shadow-lg overflow-hidden border border-border">
      {cardContent}
    </Card>
  );
};

export default function JobFeedPage() {
  const [jobsToSwipe, setJobsToSwipe] = useState<AppJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const [[page, direction], setPage] = useState([0, 0]);

  const [feedback, setFeedback] = useState<'Applied' | 'Rejected' | null>(null);
  const [selectedJobForDetails, setSelectedJobForDetails] = useState<AppJob | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<AppJob[]>([]);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  // Protect against length === 0 modulo
  const jobIndex = jobsToSwipe.length ? ((page % jobsToSwipe.length) + jobsToSwipe.length) % jobsToSwipe.length : 0;
  const currentJobToSwipe = jobsToSwipe.length ? jobsToSwipe[jobIndex] : undefined;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setError("You are not logged in.");
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch('https://backend.hyresense.com/api/v1/jobseeker/jobs/by-skills/', {
          headers: { 'Authorization': `Bearer ${accessToken}` },
        });
        if (!response.ok) throw new Error('Failed to fetch jobs.');
        const data = await response.json();
        const apiJobs: ApiJob[] = data.jobs || [];
        const formattedJobs: AppJob[] = apiJobs.map(job => ({
          id: job.id,
          title: job.title,
          company: job.company_name,
          location: `${job.location} (${job.working_mode})`,
          description: job.description,
          image: job.company_profile_image || `https://placehold.co/128x128/e0e7ff/4a5568.png?text=${job.company_name.substring(0, 2)}`,
          dataAiHint: `${job.company_name} logo`,
          skills: job.required_skills,
          experienceLevel: job.experience_level,
          jobType: job.employment_type,
          postedDate: new Date(job.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          fitScore: null,
          analysisResult: null,
        }));
        setJobsToSwipe(formattedJobs);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleJobApplication = useCallback(async (jobId: number | string, status: 'applied' | 'user_rejected') => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error("No access token found. Cannot update application status.");
      return { success: false, message: "Not authenticated" };
    }
    try {
      const response = await fetch('https://backend.hyresense.com/api/v1/jobseeker/job-applications/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          job_post: jobId,
          status: status,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = "Failed to submit application";

        if (response.status === 429) {
          const throttleMatch = errorData.detail?.match(/Expected available in (\d+) seconds/);
          if (throttleMatch) {
            const seconds = parseInt(throttleMatch[1]);
            const minutes = Math.ceil(seconds / 60);
            errorMessage = `Request was throttled. Please wait ${minutes} minute(s) before applying again.`;
          } else {
            errorMessage = errorData.detail || "Too many requests. Please wait before trying again.";
          }
        } else if (response.status === 403) {
          errorMessage = errorData.detail || errorData.message || errorData.error || "You don't have permission to perform this action";
        } else {
          errorMessage = errorData.detail || errorData.message || errorData.error || errorMessage;
        }

        throw new Error(errorMessage);
      }
      return { success: true, message: '' };
    } catch (error: any) {
      console.error("Failed to submit job application status:", error);
      const message = error.message || "An unknown error occurred.";
      return { success: false, message };
    }
  }, []);

  const handleSwipeAction = useCallback((direction: 'left' | 'right') => {
    if (!currentJobToSwipe) return;

    paginate(direction === 'right' ? 1 : -1);

    const jobToProcess = { ...currentJobToSwipe };
    const status = direction === 'right' ? 'applied' : 'user_rejected';

    setFeedback(direction === 'right' ? 'Applied' : 'Rejected');
    setTimeout(() => {
      setFeedback(null);
    }, 500);

    // Background API call
    handleJobApplication(jobToProcess.id, status).then(result => {
      if (result.success) {
        if (status === 'applied') {
          setAppliedJobs(prevAppliedJobs => {
            const jobExists = prevAppliedJobs.find(job => job.id === jobToProcess.id);
            if (jobExists) return prevAppliedJobs;
            return [{ ...jobToProcess, applicationStatus: "Pending" }, ...prevAppliedJobs];
          });
        }
        // Remove the job from the swiping stack on success
        setJobsToSwipe(prev => prev.filter(job => job.id !== jobToProcess.id));
      } else {
        const isDailyLimitError = result.message.toLowerCase().includes('daily') && result.message.toLowerCase().includes('limit');
        const isThrottleError = result.message.toLowerCase().includes('throttled') || result.message.toLowerCase().includes('too many requests');

        let toastTitle = "Action Failed";
        let toastDuration = 5000;

        if (isDailyLimitError) {
          toastTitle = "Daily Application Limit Reached";
          toastDuration = 8000;
        } else if (isThrottleError) {
          toastTitle = "Request Throttled";
          toastDuration = 6000;
        }

        toast({
          title: toastTitle,
          description: result.message,
          variant: "destructive",
          duration: toastDuration,
        });
      }
    });
  }, [page, currentJobToSwipe, handleJobApplication, toast]);

  const SWIPE_THRESHOLD = 75;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || swipeDirection) return;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragStart(e.clientX);
    setDragOffset(0);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const offset = e.clientX - dragStart;
    setDragOffset(offset);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > SWIPE_THRESHOLD) handleSwipeAction('right');
    else if (dragOffset < -SWIPE_THRESHOLD) handleSwipeAction('left');
    else setDragOffset(0);
  };

  const handleTransitionEnd = () => {
    // handled optimistically in handleSwipeAction
  };

  const getTransformStyle = () => {
    if (swipeDirection) {
      const x = swipeDirection === 'right' ? '150%' : '-150%';
      const rotate = swipeDirection === 'right' ? 15 : -15;
      return `translateX(${x}) rotate(${rotate}deg)`;
    }
    if (isDragging) {
      const rotate = dragOffset / 20;
      return `translateX(${dragOffset}px) rotate(${rotate}deg)`;
    }
    return 'translateX(0px) rotate(0deg)';
  };

  const getTransitionStyle = () => {
    if (isDragging) return 'none';
    return 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  };

  const handleCardClick = (job: AppJob) => {
    setSelectedJobForDetails(job);
  };

  const handleApplyFromDetails = (jobId: number | string, status: 'applied') => {
    const jobToApply = jobsToSwipe.find(j => j.id === jobId) || appliedJobs.find(j => j.id === jobId);
    if (!jobToApply) return;

    handleJobApplication(jobId, status).then(result => {
      if (result.success) {
        toast({ title: "Success!", description: "Application submitted." });
        setAppliedJobs(prevAppliedJobs => {
          const jobExists = prevAppliedJobs.find(job => job.id === jobId);
          if (jobExists) return prevAppliedJobs;
          return [{ ...jobToApply, applicationStatus: "Pending" }, ...prevAppliedJobs];
        });
        if (jobsToSwipe.some(j => j.id === jobId)) {
          setJobsToSwipe(prev => prev.filter(j => j.id !== jobId));
        }
      } else {
        const isDailyLimitError = result.message.toLowerCase().includes('daily') && result.message.toLowerCase().includes('limit');
        const isThrottleError = result.message.toLowerCase().includes('throttled') || result.message.toLowerCase().includes('too many requests');

        let toastTitle = "Failed";
        let toastDuration = 5000;

        if (isDailyLimitError) {
          toastTitle = "Daily Application Limit Reached";
          toastDuration = 8000;
        } else if (isThrottleError) {
          toastTitle = "Request Throttled";
          toastDuration = 6000;
        }

        toast({
          title: toastTitle,
          description: result.message,
          variant: "destructive",
          duration: toastDuration
        });
      }
    });
    setSelectedJobForDetails(null);
  };

  const FeedContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="flex-grow flex items-center justify-center p-3 relative overflow-hidden bg-muted/20 dark:bg-slate-900/30">
      {children}
    </div>
  );

  const DesktopFeedContainer = ({ children }: { children: React.ReactNode }) => (
    <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {children}
    </main>
  );

  const NoMoreJobs = () => (
    <div className="text-center text-muted-foreground p-4">
      <p className="text-lg mb-2">No more jobs right now!</p>
      <p className="text-sm mb-4">Check back later for new opportunities.</p>
      <Button onClick={() => window.location.reload()} variant="outline" size="sm">Refresh Feed</Button>
    </div>
  );

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  if (isLoading) return <div className="flex items-center justify-center h-screen bg-background"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
  if (error) return <div className="flex flex-col items-center justify-center h-screen bg-background text-center p-4"><AlertCircle className="h-12 w-12 text-destructive mb-4" /><h2 className="text-xl font-semibold text-destructive mb-2">Something went wrong</h2><p className="text-muted-foreground mb-4">{error}</p><Button onClick={() => window.location.reload()} variant="destructive">Try Again</Button></div>;

  return (
    <>
      <div className="md:hidden">
        <MobileAppLayout activeView="swiping" selectedJobForDetails={selectedJobForDetails} setSelectedJobForDetails={setSelectedJobForDetails}>
          <FeedContainer>
            {currentJobToSwipe ? (
              <div
                key={jobIndex}
                className="absolute w-[90%] max-w-xs group/card cursor-grab active:cursor-grabbing"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                onTransitionEnd={handleTransitionEnd}
                style={{ transform: getTransformStyle(), transition: getTransitionStyle(), touchAction: 'none' }}
              >
                <JobCard job={currentJobToSwipe} onCardClick={handleCardClick} setJobsToSwipe={setJobsToSwipe} />
              </div>
            ) : <NoMoreJobs />}
            {feedback && <div className={cn("absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out animate-feedback-fade z-10", feedback === 'Applied' ? 'text-green-500' : 'text-red-500')}><p className="text-3xl font-extrabold p-3 bg-background/80 rounded-xl shadow-2xl border border-border">{feedback === 'Applied' ? 'Applied!' : 'Declined'}</p></div>}
          </FeedContainer>
        </MobileAppLayout>
      </div>
      <div className="hidden md:flex flex-col h-screen bg-gradient-animated">
        <AppHeader />
        <DesktopFeedContainer>
          {selectedJobForDetails ? (
            <div className="w-full max-w-4xl mx-auto h-full flex flex-col">
              <JobDetailsView job={selectedJobForDetails} onBack={() => setSelectedJobForDetails(null)} isDesktop={true} onApply={handleApplyFromDetails} />
            </div>
          ) : (
            <AnimatePresence initial={false} custom={direction}>
              {jobsToSwipe.length > 0 && currentJobToSwipe && (
                <motion.div
                  key={page}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                     x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      handleSwipeAction('left');
                    } else if (swipe > swipeConfidenceThreshold) {
                      handleSwipeAction('right');
                    }
                  }}
                  className="w-full max-w-xl"
                >
                  <JobCard
                    job={currentJobToSwipe}
                    isDesktop
                    onSwipe={handleSwipeAction}
                    onCardClick={handleCardClick}
                    setJobsToSwipe={setJobsToSwipe}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          )}
          {jobsToSwipe.length === 0 && !isLoading && !selectedJobForDetails && <NoMoreJobs />}
          {feedback && <div className={cn("absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out animate-feedback-fade z-10", feedback === 'Applied' ? 'text-green-500' : 'text-red-500')}><p className="text-5xl font-extrabold p-4 bg-background/80 rounded-xl shadow-2xl">{feedback === 'Applied' ? 'Applied!' : 'Rejected'}</p></div>}
        </DesktopFeedContainer>
      </div>
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
    </>
  );
}
