
'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, PackageSearch } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { MobileAppLayout } from '@/components/layout/MobileAppLayout'; 
import type { AppJob, JobStatus } from '@/app/job-feed/page'; 

// --- Helper Functions (Copied from MobileAppDemo.tsx) ---
const getStatusBadgeClass = (status?: JobStatus): string => {
    switch (status) {
        case "Pending":
            return "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-700/30 dark:text-blue-300 dark:border-blue-500/50";
        case "Interview Scheduled":
            return "bg-green-100 text-green-700 border-green-300 dark:bg-green-700/30 dark:text-green-300 dark:border-green-500/50";
        case "Offer Received":
            return "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-600/30 dark:text-yellow-300 dark:border-yellow-500/50";
        case "Hired":
            return "bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-700/30 dark:text-purple-300 dark:border-purple-500/50";
        case "Rejected":
            return "bg-red-100 text-red-700 border-red-300 dark:bg-red-700/30 dark:text-red-300 dark:border-red-500/50";
        default:
            return "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-700/30 dark:text-gray-300 dark:border-gray-500/50";
    }
};

// Demo data for applied jobs
const initialAppliedJobs: AppJob[] = [
    { 
        id: 'demo-applied-1', 
        title: "Senior Frontend Developer", 
        company: "Innovatech Solutions Ltd.", 
        location: "New York, NY (Hybrid)", 
        matchPercentage: 92,
        applicationStatus: "Interview Scheduled",
        description: "Lead frontend projects, mentor junior developers.",
        image: "https://placehold.co/300x180.png",
        dataAiHint: "software development",
        skills: ["React", "Next.js", "TypeScript"],
        experienceLevel: "Senior Level",
        jobType: "Full-Time",
        postedDate: "Applied 2 days ago" // Using postedDate for "Applied Date" for demo
    },
    { 
        id: 'demo-applied-2', 
        title: "Digital Marketing Manager", 
        company: "ConnectSphere Inc.", 
        location: "San Francisco, CA (Remote)", 
        matchPercentage: 88,
        applicationStatus: "Offer Received",
        description: "Develop and execute digital marketing campaigns.",
        image: "https://placehold.co/300x180.png",
        dataAiHint: "marketing campaign",
        skills: ["SEO", "SEM", "Social Media"],
        experienceLevel: "Manager",
        jobType: "Full-Time",
        postedDate: "Applied 5 days ago"
    },
    {
        id: 'demo-applied-3',
        title: "Data Scientist",
        company: "Insightful AI",
        location: "Remote",
        description: "Develop machine learning models and analyze complex datasets.",
        matchPercentage: 85,
        image: "https://placehold.co/300x180.png",
        dataAiHint: "data science dashboard",
        skills: ["Python", "Machine Learning", "SQL"],
        experienceLevel: "Mid-Senior Level",
        jobType: "Full-Time",
        postedDate: "Applied 1 week ago",
        applicationStatus: "Pending",
    },
    {
        id: 'demo-applied-4',
        title: "Cloud Engineer",
        company: "SkyNet Works",
        location: "New York, NY",
        description: "Design, implement, and manage cloud infrastructure.",
        matchPercentage: 90,
        image: "https://placehold.co/300x180.png",
        dataAiHint: "cloud computing",
        skills: ["AWS", "Azure", "Kubernetes"],
        experienceLevel: "Senior",
        jobType: "Full-Time",
        postedDate: "Applied 10 days ago",
        applicationStatus: "Rejected",
    }
  ];


const AppliedJobCard: React.FC<{ job: AppJob, onClick: () => void }> = ({ job, onClick }) => {
    return (
        <Card
            className="bg-card/80 backdrop-blur-md shadow-lg overflow-hidden border border-border/30 mb-3 rounded-xl cursor-pointer hover:border-primary/50 transition-all duration-200 hover:shadow-primary/20 dark:bg-slate-800/60"
            onClick={onClick}
        >
            <CardContent className="p-3 space-y-1.5">
                <div className="flex justify-between items-start">
                    <h3 className="text-base font-semibold text-foreground line-clamp-2 leading-tight">{job.title}</h3>
                    {job.applicationStatus && (
                        <Badge className={cn("text-xs px-2 py-0.5 whitespace-nowrap", getStatusBadgeClass(job.applicationStatus))}>
                            {job.applicationStatus}
                        </Badge>
                    )}
                </div>
                <p className="text-xs text-primary font-medium">{job.company}</p>
                <p className="text-xs text-muted-foreground">{job.location}</p>
                 <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-0.5">
                    <CalendarDays className="h-3 w-3 text-primary/80" />
                    <span>{job.postedDate}</span> 
                </div>
            </CardContent>
        </Card>
    );
};

export default function AppliedJobsPage() {
  const [appliedJobs, setAppliedJobs] = useState<AppJob[]>(initialAppliedJobs);
  const [selectedJobForDetails, setSelectedJobForDetails] = useState<AppJob | null>(null);

  const handleCardClick = (job: AppJob) => {
    setSelectedJobForDetails(job);
  };

  return (
    <MobileAppLayout 
        activeView="applied" 
        pageTitle="Applied Jobs"
        selectedJobForDetails={selectedJobForDetails}
        setSelectedJobForDetails={setSelectedJobForDetails}
    >
      <div className="h-full w-full flex flex-col">
        <ScrollArea className="flex-grow p-3 bg-muted/20 dark:bg-slate-900/30">
            {appliedJobs.length > 0 ? (
                appliedJobs.map(job => (
                    <AppliedJobCard
                        key={job.id}
                        job={job}
                        onClick={() => handleCardClick(job)}
                    />
                ))
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-10">
                    <PackageSearch className="h-16 w-16 text-primary/30 mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-1">No Applied Jobs Yet</h3>
                    <p className="text-sm">Start swiping in the Job Feed to apply for positions!</p>
                    <Button
                        variant="outline"
                        size="sm"
                        className="mt-6"
                        asChild
                    >
                       <Link href="/job-feed">Go to Job Feed</Link>
                    </Button>
                </div>
            )}
        </ScrollArea>
      </div>
    </MobileAppLayout>
  );
}
