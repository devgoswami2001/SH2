
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Briefcase, CalendarDays, ArrowLeft, XCircle, CheckCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { MobileAppLayout } from '@/components/layout/MobileAppLayout';
import { DesktopSidebar } from '@/components/layout/DesktopSidebar';

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
    title: "Software Engineer",
    company: "Microsoft",
    location: "India (Up to 100% work from home)",
    description: "Join Azure Cloud to build and optimize a world-class distributed file system. This role provides a unique opportunity to work on software and hardware optimizations at a massive scale, influencing the future of Azure Storage.",
    matchPercentage: 94,
    image: "https://uhf.microsoft.com/images/microsoft/RE1Mu3b.png",
    dataAiHint: "microsoft office",
    skills: ["C", "C++", "C#", "Java", "Python", "Distributed Systems"],
    experienceLevel: "Entry-level",
    jobType: "Full-Time",
    postedDate: "Jul 03, 2025",
  },
  {
    id: 2,
    title: "Software Engineer 2",
    company: "Microsoft",
    location: "India (Up to 50% work from home)",
    description: "Join Microsoft Security to build cloud solutions that provide security, compliance, and data governance for Office 365. You will develop large-scale distributed services and ensure they are reliable, scalable, and secure.",
    matchPercentage: 91,
    image: "https://uhf.microsoft.com/images/microsoft/RE1Mu3b.png",
    dataAiHint: "microsoft security",
    skills: ["C#", "Java", "C++", "Azure", "AWS", "Google Cloud", "DevOps", "CI/CD"],
    experienceLevel: "Mid-level (3+ years)",
    jobType: "Full-Time",
    postedDate: "Jul 03, 2025",
  },
  {
    id: 3,
    title: "Business Analyst I, AOP",
    company: "Amazon",
    location: "Hyderabad, India",
    description: "Join the Amazon Transportation team to define and analyze complex business problems. You will work with large datasets, build analytical frameworks, and liaise with operations teams to streamline the process.",
    matchPercentage: 89,
    image: "https://static.vecteezy.com/system/resources/previews/014/018/563/non_2x/amazon-logo-on-transparent-background-free-vector.jpg",
    dataAiHint: "amazon warehouse",
    skills: ["Excel VBA", "SQL", "ETL", "Tableau", "Data Analysis"],
    experienceLevel: "Analyst (1+ years)",
    jobType: "Full-Time",
    postedDate: "Jul 03, 2025",
  },
];

export const JobDetailsView: React.FC<{ job: AppJob; onBack?: () => void, isDesktop?: boolean }> = ({ job, onBack, isDesktop }) => {
  return (
    <div className="h-full w-full flex flex-col bg-card md:bg-transparent">
        {!isDesktop && (
            <header className="p-3 border-b border-border/50 bg-background/80 backdrop-blur-sm flex items-center justify-between sticky top-0 z-10 min-h-[56px]">
                <Button variant="ghost" size="icon" className="text-primary -ml-2" onClick={onBack}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <span className="text-base font-semibold text-foreground truncate px-2 flex-1 text-center">
                    {job.title}
                </span>
                <Image src="/logo.png" alt="HyreSense Logo" width={28} height={20} className="rounded-sm ml-1"/>
            </header>
        )}
        <ScrollArea className="flex-grow">
            <div className={cn("space-y-4 p-4", isDesktop && "p-8")}>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                         <Image
                            src={job.image}
                            alt={job.title}
                            width={400}
                            height={225}
                            data-ai-hint={job.dataAiHint}
                            className="object-cover w-full rounded-lg"
                        />
                    </div>
                    <div className="md:w-2/3">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{job.title}</h2>
                        <div className="text-base mt-1">
                            <span className="font-medium text-primary">{job.company}</span>
                            <span className="text-muted-foreground"> - {job.location}</span>
                        </div>
                        <div className="pt-3 space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-primary/80" />
                                <span>{job.jobType} &middot; {job.experienceLevel}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4 text-primary/80" />
                                <span>Posted: {job.postedDate}</span>
                            </div>
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
                                        <Badge key={index} variant="secondary" className="text-sm px-3 py-1 bg-primary/10 text-primary/90 border-primary/30">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                        <Button
                            className="w-full mt-8"
                            onClick={(e) => { e.stopPropagation(); alert(`Applying to ${job.title}...`); }}
                            size="lg"
                        >
                            Apply Now
                        </Button>
                    </div>
                </div>
            </div>
        </ScrollArea>
    </div>
  );
};


export default function JobFeedPage() {
  const [jobsToSwipe, setJobsToSwipe] = useState([...initialJobsData]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<'Applied' | 'Rejected' | null>(null);
  const [cardKey, setCardKey] = useState(0);
  const [selectedJobForDetails, setSelectedJobForDetails] = useState<AppJob | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<AppJob[]>([]);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const currentJobToSwipe = jobsToSwipe[currentIndex];
  
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

      if (dragOffset > SWIPE_THRESHOLD) {
          handleSwipeAction('right');
      } else if (dragOffset < -SWIPE_THRESHOLD) {
          handleSwipeAction('left');
      } else {
          setDragOffset(0);
      }
  };
  
  const handleSwipeAction = (direction: 'left' | 'right') => {
      setSwipeDirection(direction);
  }

  const handleTransitionEnd = () => {
    if (swipeDirection) {
        if (swipeDirection === 'right' && currentJobToSwipe) {
            setAppliedJobs(prevAppliedJobs => {
                const jobExists = prevAppliedJobs.find(job => job.id === currentJobToSwipe.id);
                if (jobExists) { return prevAppliedJobs; }
                return [{ ...currentJobToSwipe, applicationStatus: "Pending" }, ...prevAppliedJobs];
            });
        }
        
        setFeedback(swipeDirection === 'right' ? 'Applied' : 'Rejected');

        const timer = setTimeout(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % jobsToSwipe.length);
            setCardKey(prevKey => prevKey + 1);
            
            setFeedback(null);
            setSwipeDirection(null);
            setDragOffset(0);
        }, 400);

        return () => clearTimeout(timer);
    }
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
      if (isDragging) {
          return 'none';
      }
      return 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  };

  const handleCardClick = (job: AppJob) => {
    setSelectedJobForDetails(job);
  };

  const JobCard = ({ job, isDesktop }: { job: AppJob, isDesktop?: boolean }) => (
    <Card
        className={cn(
            "bg-gradient-to-br from-card/80 via-card/70 to-card/80 backdrop-blur-lg",
            "rounded-2xl overflow-hidden",
            "border border-primary/40",
            "shadow-[0_0_15px_0px_hsl(var(--primary)/0.2),_0_0_25px_0px_hsl(var(--accent)/0.15)]",
            "transition-all duration-300 ease-out",
            isDesktop ? "w-full max-w-sm mx-auto" : "w-full"
        )}
    >
        <div onClick={(e) => { e.stopPropagation(); handleCardClick(job); }}>
            <CardContent className="p-4 space-y-3">
                <div className="flex items-start gap-3 mb-2">
                    <div className="flex flex-col items-center flex-shrink-0 gap-2">
                        <div className="p-1 bg-white rounded-md shadow-sm w-12 h-12 flex items-center justify-center">
                            <Image
                                src={job.image}
                                alt={`${job.company} logo`}
                                width={40}
                                height={40}
                                data-ai-hint={job.dataAiHint}
                                className="object-contain w-full h-full"
                            />
                        </div>
                        <Badge
                            variant="secondary"
                            className="bg-primary/70 backdrop-blur-md text-primary-foreground text-xs font-mono font-bold px-2 py-0.5 rounded-md shadow-lg border border-primary-foreground/50 whitespace-nowrap"
                        >
                            {job.matchPercentage}% Match
                        </Badge>
                    </div>
                    <div className="overflow-hidden flex-grow pt-1">
                        <CardTitle className="text-xl font-bold text-foreground line-clamp-2 leading-tight">{job.title}</CardTitle>
                        <div className="text-sm mt-1">
                            <span className="font-medium text-primary">{job.company}</span>
                            <span className="text-muted-foreground"> - {job.location}</span>
                        </div>
                    </div>
                </div>
            
                <div className="pt-1 space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4 text-primary/80" />
                    <span>{job.jobType} &middot; {job.experienceLevel}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4 text-primary/80" />
                    <span>Posted: {job.postedDate}</span>
                    </div>
                </div>

                <Separator className="my-2 border-primary/30" />

                {job.skills && job.skills.length > 0 && (
                    <div className="pb-1">
                    <h4 className="text-xs font-semibold text-primary mb-1.5">Key Skills:</h4>
                    <div className="flex flex-wrap gap-1.5">
                        {job.skills.slice(0, 5).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs px-2 py-1 bg-primary/10 text-primary/90 border-primary/30">
                            {skill}
                        </Badge>
                        ))}
                    </div>
                    </div>
                )}
                <p className="text-xs text-muted-foreground line-clamp-5 h-[100px]">
                    {job.description}
                </p>
            </CardContent>
        </div>
        {isDesktop && (
             <CardFooter className="p-3 sm:p-4 flex justify-around border-t border-primary/30 bg-transparent">
                <Button 
                    variant="ghost" 
                    size="lg" 
                    className="text-destructive hover:bg-destructive/15 dark:hover:bg-destructive/25 hover:shadow-[0_0_12px_2px_hsl(var(--destructive)/0.4)] font-semibold w-full mr-1.5 transition-all duration-200 ease-out transform hover:scale-[1.03] rounded-lg p-2.5 flex items-center justify-center gap-1.5 text-sm"
                    onClick={() => handleSwipeAction('left')}
                >
                    <XCircle className="mr-1 h-4 w-4 sm:h-5 sm:w-5" /> Decline
                </Button>
                <Button 
                    variant="ghost" 
                    size="lg" 
                    className="text-primary hover:bg-primary/15 dark:hover:bg-primary/25 hover:shadow-[0_0_12px_2px_hsl(var(--primary)/0.4)] font-semibold w-full ml-1.5 transition-all duration-200 ease-out transform hover:scale-[1.03] rounded-lg p-2.5 flex items-center justify-center gap-1.5 text-sm"
                    onClick={() => handleSwipeAction('right')}
                >
                    <CheckCircle className="mr-1 h-4 w-4 sm:h-5 sm:w-5" /> Apply
                </Button>
            </CardFooter>
        )}
    </Card>
  );

  const NoMoreJobs = () => (
    <div className="text-center text-muted-foreground p-4">
        <p className="text-lg mb-2">No more jobs right now!</p>
        <Button onClick={() => { setCurrentIndex(0); setJobsToSwipe([...initialJobsData]); setCardKey(k => k + 1); }} variant="outline" size="sm">
            Refresh Feed
        </Button>
    </div>
  );

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden">
        <MobileAppLayout 
            activeView="swiping" 
            selectedJobForDetails={selectedJobForDetails}
            setSelectedJobForDetails={setSelectedJobForDetails}
        >
          <div className="flex-grow flex items-center justify-center p-3 relative overflow-hidden bg-muted/20 dark:bg-slate-900/30">
            {currentJobToSwipe ? (
                <div
                    key={cardKey}
                    className="absolute w-[90%] max-w-xs group/card cursor-grab active:cursor-grabbing"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                    onTransitionEnd={handleTransitionEnd}
                    style={{
                        transform: getTransformStyle(),
                        transition: getTransitionStyle(),
                        touchAction: 'none',
                    }}
                >
                  <JobCard job={currentJobToSwipe} />
                </div>
            ) : <NoMoreJobs />}
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
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex h-screen bg-muted/40">
        <DesktopSidebar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {currentJobToSwipe ? (
                <div
                    key={cardKey}
                    className="absolute"
                    onTransitionEnd={handleTransitionEnd}
                    style={{
                        transform: getTransformStyle(),
                        transition: getTransitionStyle(),
                    }}
                >
                    <JobCard job={currentJobToSwipe} isDesktop />
                </div>
            ) : <NoMoreJobs />}
             {feedback && (
              <div className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out animate-feedback-fade z-10",
                feedback === 'Applied' ? 'text-green-500' : 'text-red-500'
              )}>
                <p className="text-5xl font-extrabold p-4 bg-background/80 rounded-xl shadow-2xl">
                  {feedback === 'Applied' ? 'Applied!' : 'Rejected'}
                </p>
              </div>
            )}
        </main>
      </div>
    </>
  );
}
