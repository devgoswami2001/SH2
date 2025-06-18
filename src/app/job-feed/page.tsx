
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, XCircle, Briefcase, CalendarDays, ArrowLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { MobileAppLayout } from '@/components/layout/MobileAppLayout';


// --- Data Structures ---
export type JobStatus = "Pending" | "Interview Scheduled" | "Offer Received" | "Hired" | "Rejected";

export interface AppJobBase {
  id: number | string;
  title: string;
  company: string;
  location: string;
  description: string;
  matchPercentage: number;
  image: string;
  dataAiHint: string;
  skills: string[];
  experienceLevel: string;
  jobType: string;
  postedDate: string;
}

export interface AppJob extends AppJobBase {
  applicationStatus?: JobStatus;
}

// --- Initial Data ---
const initialJobsData: AppJob[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Innovatech Solutions Ltd.",
    location: "New York, NY (Hybrid)",
    description: "Join our dynamic team to build next-gen web applications using React, Next.js, and TypeScript. You will be responsible for leading frontend projects, mentoring junior developers, and ensuring the technical feasibility of UI/UX designs. We're looking for someone passionate about creating seamless user experiences and high-quality code.",
    matchPercentage: 92,
    image: "https://placehold.co/300x180.png",
    dataAiHint: "software development team",
    skills: ["React", "Next.js", "TypeScript", "Agile", "REST APIs", "GraphQL", "Tailwind CSS"],
    experienceLevel: "Senior Level",
    jobType: "Full-Time",
    postedDate: "3 days ago",
  },
  {
    id: 2,
    title: "Digital Marketing Manager",
    company: "ConnectSphere Inc.",
    location: "San Francisco, CA (Remote)",
    description: "Develop and execute innovative digital marketing campaigns across SEO, SEM, and social media. Analyze performance and optimize for ROI. The ideal candidate will have a proven track record of growing online presence and driving engagement. Manage a small team of marketing specialists.",
    matchPercentage: 88,
    image: "https://placehold.co/300x180.png",
    dataAiHint: "marketing analytics",
    skills: ["SEO", "SEM", "Social Media", "Analytics", "Content Creation", "Email Marketing", "Google Ads"],
    experienceLevel: "Manager",
    jobType: "Full-Time",
    postedDate: "1 week ago",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "PixelPerfect Studios",
    location: "Austin, TX (On-site)",
    description: "Craft intuitive and visually appealing user interfaces for mobile and web applications. Conduct user research, create wireframes, mockups, and prototypes. Collaborate closely with product managers and engineers to deliver user-centered design solutions.",
    matchPercentage: 95,
    image: "https://placehold.co/300x180.png",
    dataAiHint: "ui design wireframe",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Wireframing", "Mobile Design", "User Testing"],
    experienceLevel: "Mid-Senior Level",
    jobType: "Full-Time",
    postedDate: "5 days ago",
  },
];

export const JobDetailsView: React.FC<{ job: AppJob, onBack: () => void }> = ({ job, onBack }) => {
  // Header is now handled by MobileAppLayout
  return (
    <div className="h-full w-full flex flex-col">
        <ScrollArea className="flex-grow p-1">
            <div className="space-y-3 text-sm p-3">
                <h2 className="text-xl font-bold text-foreground">{job.title}</h2>
                <div className="text-xs">
                <span className="font-medium text-primary">{job.company}</span>
                <span className="text-muted-foreground"> - {job.location}</span>
                </div>
                <Image
                src={job.image}
                alt={job.title}
                width={300}
                height={160}
                data-ai-hint={job.dataAiHint}
                className="object-cover w-full h-40 rounded-lg my-3"
                />

                <div className="pt-1 space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5 text-primary/80" />
                    <span>{job.jobType} &middot; {job.experienceLevel}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-primary/80" />
                    <span>Posted: {job.postedDate}</span>
                </div>
                </div>
                <Separator className="my-2.5 border-primary/30" />
                {job.skills && job.skills.length > 0 && (
                <div>
                    <h4 className="text-sm font-semibold text-primary mb-1.5">Key Skills:</h4>
                    <div className="flex flex-wrap gap-1.5">
                    {job.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5 bg-primary/10 text-primary/90 border-primary/30">
                        {skill}
                        </Badge>
                    ))}
                    </div>
                </div>
                )}
                <Separator className="my-2.5 border-primary/30" />
                <div>
                    <h4 className="text-sm font-semibold text-primary mb-1.5">Full Description:</h4>
                    <p className="text-muted-foreground whitespace-pre-line text-xs leading-relaxed">{job.description}</p>
                </div>
                <Button
                    className="w-full mt-6"
                    onClick={(e) => { e.stopPropagation(); alert(`Applying to ${job.title}... (from details)`); }}
                    size="lg"
                >
                    Apply Now
                </Button>
            </div>
        </ScrollArea>
    </div>
  );
};


export default function JobFeedPage() {
  const [jobsToSwipe, setJobsToSwipe] = useState([...initialJobsData]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [feedback, setFeedback] = useState<'Applied' | 'Rejected' | null>(null);
  const [cardKey, setCardKey] = useState(0);
  const [selectedJobForDetails, setSelectedJobForDetails] = useState<AppJob | null>(null);

  // This state will be managed by a global context or passed up in a real app
  const [appliedJobs, setAppliedJobs] = useState<AppJob[]>([]); 

  const currentJobToSwipe = jobsToSwipe[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    setFeedback(direction === 'right' ? 'Applied' : 'Rejected');

    if (direction === 'right' && currentJobToSwipe) {
        setAppliedJobs(prevAppliedJobs => {
            const jobExists = prevAppliedJobs.find(job => job.id === currentJobToSwipe.id);
            if (jobExists) {
                return prevAppliedJobs.map(job =>
                    job.id === currentJobToSwipe.id
                    ? { ...job, applicationStatus: job.applicationStatus || "Pending" }
                    : job
                );
            }
            // Add to applied jobs (this state would ideally be global or managed via context/ Zustand)
            // For now, just simulating for feedback, actual applied jobs page will have its own source
            return [{ ...currentJobToSwipe, applicationStatus: "Pending" }, ...prevAppliedJobs];
        });
    }

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % jobsToSwipe.length);
      setSwipeDirection(null);
      setFeedback(null);
      setCardKey(prevKey => prevKey + 1);
    }, 500);
  };

  const handleCardClick = (job: AppJob) => {
    setSelectedJobForDetails(job);
  };

  const cardAnimationClasses = () => {
    if (swipeDirection === 'right') return 'animate-swipe-right';
    if (swipeDirection === 'left') return 'animate-swipe-left';
    return 'animate-card-enter';
  };

  return (
    <MobileAppLayout 
        activeView="swiping" 
        selectedJobForDetails={selectedJobForDetails}
        setSelectedJobForDetails={setSelectedJobForDetails}
    >
      <div className="flex-grow flex items-center justify-center p-3 relative overflow-hidden bg-muted/20 dark:bg-slate-900/30">
        {currentJobToSwipe ? (
          <div key={cardKey} className={cn("absolute w-[90%] max-w-xs group/card", cardAnimationClasses())}>
            <Card
              className={cn(
                "bg-gradient-to-br from-card/80 via-card/70 to-card/80 backdrop-blur-lg",
                "rounded-2xl overflow-hidden w-full",
                "border border-primary/40",
                "shadow-[0_0_15px_0px_hsl(var(--primary)/0.2),_0_0_25px_0px_hsl(var(--accent)/0.15)]",
                "transition-all duration-300 ease-out cursor-pointer"
              )}
            >
              <div onClick={(e) => { e.stopPropagation(); handleCardClick(currentJobToSwipe); }}>
                <CardHeader className="p-0 relative">
                  <Image
                    src={currentJobToSwipe.image}
                    alt={currentJobToSwipe.title}
                    width={300}
                    height={176}
                    data-ai-hint={currentJobToSwipe.dataAiHint}
                    className="object-cover w-full h-44"
                  />
                  <div className={cn(
                    "absolute bottom-2 left-2 bg-primary/70 backdrop-blur-md text-primary-foreground",
                    "text-xs font-mono font-bold px-2.5 py-1 rounded-md shadow-lg border border-primary-foreground/50"
                  )}>
                    {currentJobToSwipe.matchPercentage}% Match
                  </div>
                </CardHeader>
                <CardContent className="p-3 space-y-2">
                  <CardTitle className="text-lg font-bold text-foreground line-clamp-2">{currentJobToSwipe.title}</CardTitle>
                  <div className="text-xs">
                    <span className="font-medium text-primary">{currentJobToSwipe.company}</span>
                    <span className="text-muted-foreground"> - {currentJobToSwipe.location}</span>
                  </div>
                  <div className="pt-0.5 space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3 text-primary/80" />
                      <span>{currentJobToSwipe.jobType} &middot; {currentJobToSwipe.experienceLevel}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-3 w-3 text-primary/80" />
                      <span>Posted: {currentJobToSwipe.postedDate}</span>
                    </div>
                  </div>
                  <Separator className="my-1.5 border-primary/30" />
                  {currentJobToSwipe.skills && currentJobToSwipe.skills.length > 0 && (
                    <div className="pb-0.5">
                      <h4 className="text-[11px] font-semibold text-primary mb-1">Key Skills:</h4>
                      <div className="flex flex-wrap gap-1">
                        {currentJobToSwipe.skills.slice(0, 5).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary/90 border-primary/30">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                   <p className="text-[11px] text-muted-foreground line-clamp-4 h-16">
                      {currentJobToSwipe.description}
                  </p>
                </CardContent>
              </div>
              <CardFooter className="p-2 flex justify-around border-t border-primary/30 bg-transparent">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:bg-destructive/15 font-semibold w-full mr-1 transition-all duration-200 ease-out transform hover:scale-[1.03] rounded-lg p-2 flex items-center justify-center gap-1 text-xs"
                  onClick={(e) => { e.stopPropagation(); handleSwipe('left'); }}
                >
                  <XCircle className="mr-1 h-4 w-4" /> Decline
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:bg-primary/15 font-semibold w-full ml-1 transition-all duration-200 ease-out transform hover:scale-[1.03] rounded-lg p-2 flex items-center justify-center gap-1 text-xs"
                  onClick={(e) => { e.stopPropagation(); handleSwipe('right'); }}
                >
                  <CheckCircle className="mr-1 h-4 w-4" /> Apply
                </Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
            <div className="text-center text-muted-foreground p-4">
                <p className="text-sm mb-2">No more jobs right now!</p>
                <Button onClick={() => { setCurrentIndex(0); setJobsToSwipe([...initialJobsData]); setCardKey(k => k + 1); }} variant="outline" size="sm">
                    Refresh Feed
                </Button>
            </div>
        )}
        {feedback && (
          <div className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out animate-feedback-fade z-10",
            feedback === 'Applied' ? 'text-green-500' : 'text-red-500'
          )}>
            <p className="text-3xl font-extrabold p-3 bg-background/80 rounded-xl shadow-2xl border border-border">
              {feedback === 'Applied' ? 'Applied!' : 'Declined'}
            </p>
          </div>
        )}
      </div>
    </MobileAppLayout>
  );
}

