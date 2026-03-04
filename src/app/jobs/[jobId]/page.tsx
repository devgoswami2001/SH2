'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Briefcase, CalendarDays, ArrowLeft, Loader2, AlertCircle, Sparkles, MapPin, Clock, ThumbsUp, ThumbsDown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { AppHeader } from '@/components/layout/AppHeader';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { useSession } from 'next-auth/react';

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
  confidence_score: number;
  overall_recommendation: string;
}

interface JobData {
  id: number | string;
  title: string;
  company_name: string;
  company_logo: string | null;
  location: string;
  description: string;
  required_skills: string[];
  experience_level: string;
  employment_type: string;
  working_mode: string;
  created_at: string;
}

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { status } = useSession();
  const { toast } = useToast();
  const jobId = params.jobId as string;

  const [job, setJob] = useState<JobData | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJobDetails = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const accessToken = localStorage.getItem('accessToken');

    if (status === 'loading') return;
    if (status === 'unauthenticated' && !accessToken) {
        setError("Please log in to view job details.");
        setIsLoading(false);
        return;
    }

    try {
      // Fetch job details
      const response = await fetch(`https://backend.hyresense.com/api/v1/jobseeker/job-posts/${jobId}/`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        if (response.status === 404) throw new Error("Job not found.");
        throw new Error("Failed to fetch job details.");
      }

      const data = await response.json();
      setJob(data);

      // Fetch AI Analysis
      const analysisResponse = await fetch(`https://backend.hyresense.com/api/v1/jobseeker/analyze-application/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ job_post_id: jobId })
      });

      if (analysisResponse.ok) {
        const analysisData = await analysisResponse.json();
        if (analysisData.success) {
          setAnalysis(analysisData.result);
        }
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [jobId, status]);

  useEffect(() => {
    fetchJobDetails().catch(e => console.error("Job details fetch error:", e));
  }, [fetchJobDetails]);

  const handleApply = async () => {
    setIsApplying(true);
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      toast({ title: "Error", description: "You are not logged in.", variant: "destructive" });
      setIsApplying(false);
      return;
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
          status: 'applied',
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.detail || "Failed to submit application.");
      }

      toast({ title: "Success!", description: "Your application has been submitted." });
      router.push('/applied');
    } catch (err: any) {
      toast({ title: "Application Failed", description: err.message, variant: "destructive" });
    } finally {
      setIsApplying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <AppHeader />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <AppHeader />
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <AlertCircle className="h-16 w-16 text-destructive mb-4" />
          <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-6 max-w-md">{error || "We couldn't find the job details you're looking for."}</p>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
      </div>
    );
  }

  const companyLogo = job.company_logo 
    ? (job.company_logo.startsWith('http') ? job.company_logo : `https://backend.hyresense.com${job.company_logo}`)
    : `https://placehold.co/128x128/e0e7ff/4a5568.png?text=${job.company_name.substring(0, 2)}`;

  return (
    <div className="flex flex-col h-screen bg-background">
      <AppHeader />
      <main className="flex-1 overflow-y-auto bg-muted/10">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
          <Button variant="ghost" onClick={() => router.back()} className="mb-6 -ml-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          <Card className="shadow-xl border-border/40 rounded-xl bg-card/80 backdrop-blur-md overflow-hidden">
            <div className="p-6 md:p-10">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden border border-border shadow-sm shrink-0 bg-white p-2">
                  <Image
                    src={companyLogo}
                    alt={job.company_name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">{job.title}</h1>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-lg">
                    <span className="font-semibold text-primary hover:underline cursor-pointer">{job.company_name}</span>
                    <span className="text-muted-foreground flex items-center gap-1.5"><MapPin className="h-5 w-5 text-secondary" /> {job.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-6">
                    <Badge variant="secondary" className="px-3 py-1 bg-primary/10 text-primary border-primary/20 text-sm">
                      <Briefcase className="mr-1.5 h-4 w-4" /> {job.employment_type}
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1 bg-accent/10 text-accent border-accent/20 text-sm">
                      <Clock className="mr-1.5 h-4 w-4" /> {job.experience_level}
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1 text-sm">
                      <CalendarDays className="mr-1.5 h-4 w-4" /> Posted: {new Date(job.created_at).toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
                <div className="w-full md:w-auto">
                  <Button size="lg" className="w-full md:w-auto px-10 h-12 text-lg shadow-lg shadow-primary/20" onClick={handleApply} disabled={isApplying}>
                    {isApplying ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Applying...</> : "Apply Now"}
                  </Button>
                </div>
              </div>

              <Separator className="my-10" />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                  <section>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" /> About the Role</h3>
                    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {job.description}
                    </div>
                  </section>

                  {job.required_skills && job.required_skills.length > 0 && (
                    <section>
                      <h3 className="text-xl font-bold mb-4">Required Skills</h3>
                      <div className="flex flex-wrap gap-2.5">
                        {job.required_skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-sm px-4 py-1.5 rounded-lg border border-border/50">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </section>
                  )}
                </div>

                <div className="space-y-6">
                  {analysis ? (
                    <Card className="bg-primary/5 border-primary/20 shadow-none">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2"><Brain className="h-5 w-5 text-primary" /> AI Match Insights</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-end">
                            <span className="text-sm font-medium text-muted-foreground">Match Score</span>
                            <span className="text-2xl font-bold text-primary">{analysis.fit_score}%</span>
                          </div>
                          <Progress value={analysis.fit_score} className="h-2" />
                        </div>
                        
                        <div className="pt-2">
                          <p className="text-sm font-semibold mb-1">AI Recommendation:</p>
                          <Badge variant={analysis.interview_recommendation ? 'default' : 'destructive'} className={cn(analysis.interview_recommendation ? "bg-green-500" : "bg-red-500", "w-full justify-center py-1.5 text-sm text-white")}>
                            {analysis.interview_recommendation ? <><ThumbsUp className="mr-2 h-4 w-4" /> Recommended</> : <><ThumbsDown className="mr-2 h-4 w-4" /> Low Fit</>}
                          </Badge>
                        </div>

                        <Separator className="my-4 bg-primary/10" />
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Top Strength</p>
                            <p className="text-sm text-foreground">{analysis.strengths[0] || "N/A"}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Gap to Bridge</p>
                            <p className="text-sm text-foreground">{analysis.weaknesses[0] || "N/A"}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="border-dashed bg-muted/20">
                      <CardContent className="p-6 text-center">
                        <Brain className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground italic">Complete your profile to unlock deep AI matching insights for this role.</p>
                      </CardContent>
                    </Card>
                  )}
                  
                  <Card className="border-border/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Work Context</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Mode</span>
                        <span className="font-medium text-foreground">{job.working_mode}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Type</span>
                        <span className="font-medium text-foreground">{job.employment_type}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Level</span>
                        <span className="font-medium text-foreground">{job.experience_level}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
