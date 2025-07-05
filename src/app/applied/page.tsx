
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, PackageSearch } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { MobileAppLayout } from '@/components/layout/MobileAppLayout'; 
import { DesktopSidebar } from '@/components/layout/DesktopSidebar';
import { JobDetailsView } from '@/app/job-feed/page';
import type { AppJob, JobStatus } from '@/app/job-feed/page'; 

// --- Helper Functions ---
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
        description: "Lead frontend projects, mentor junior developers, and contribute to our design system. We're looking for an expert in React and Next.js to join our fast-paced team and drive innovation.",
        image: "https://placehold.co/300x180.png",
        dataAiHint: "software development",
        skills: ["React", "Next.js", "TypeScript", "Redux", "GraphQL"],
        experienceLevel: "Senior Level",
        jobType: "Full-Time",
        postedDate: "Applied 2 days ago" 
    },
    { 
        id: 'demo-applied-2', 
        title: "Digital Marketing Manager", 
        company: "ConnectSphere Inc.", 
        location: "San Francisco, CA (Remote)", 
        matchPercentage: 88,
        applicationStatus: "Offer Received",
        description: "Develop and execute digital marketing campaigns across all channels. This role requires a strategic thinker with a proven track record in SEO, SEM, and social media marketing.",
        image: "https://placehold.co/300x180.png",
        dataAiHint: "marketing campaign",
        skills: ["SEO", "SEM", "Social Media", "Content Marketing", "Google Analytics"],
        experienceLevel: "Manager",
        jobType: "Full-Time",
        postedDate: "Applied 5 days ago"
    },
    {
        id: 'demo-applied-3',
        title: "Data Scientist",
        company: "Insightful AI",
        location: "Remote",
        description: "Develop machine learning models and analyze complex datasets. You'll be working on cutting-edge problems to derive actionable insights for our clients. PhD or Masters in a quantitative field preferred.",
        matchPercentage: 85,
        image: "https://placehold.co/300x180.png",
        dataAiHint: "data science dashboard",
        skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "PyTorch"],
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
        description: "Design, implement, and manage cloud infrastructure on AWS and Azure. Focus on infrastructure as code (IaC), automation, scalability, and security.",
        matchPercentage: 90,
        image: "https://placehold.co/300x180.png",
        dataAiHint: "cloud computing",
        skills: ["AWS", "Azure", "Kubernetes", "Terraform", "CI/CD"],
        experienceLevel: "Senior",
        jobType: "Full-Time",
        postedDate: "Applied 10 days ago",
        applicationStatus: "Rejected",
    }
  ];

const AppliedJobCard: React.FC<{ job: AppJob; onClick: () => void, isSelected?: boolean }> = ({ job, onClick, isSelected }) => {
    return (
        <Card
            className={cn(
                "bg-card/80 backdrop-blur-md shadow-lg overflow-hidden border border-border/30 mb-3 rounded-xl cursor-pointer hover:border-primary/50 transition-all duration-200 hover:shadow-primary/20 dark:bg-slate-800/60",
                "md:bg-card md:shadow-md md:hover:bg-accent/10 md:dark:hover:bg-accent/10",
                isSelected && "md:bg-accent/10 md:border-primary/60 md:dark:bg-accent/10"
            )}
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

const NoJobsPlaceholder: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-10">
        <PackageSearch className="h-16 w-16 text-primary/30 mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-1">No Applied Jobs Yet</h3>
        <p className="text-sm">Start swiping in the Job Feed to apply for positions!</p>
        <Button variant="outline" size="sm" className="mt-6" asChild>
            <Link href="/job-feed">Go to Job Feed</Link>
        </Button>
    </div>
);

export default function AppliedJobsPage() {
  const [appliedJobs, setAppliedJobs] = useState<AppJob[]>(initialAppliedJobs);
  const [selectedJob, setSelectedJob] = useState<AppJob | null>(appliedJobs[0] || null);

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
                {appliedJobs.length > 0 ? (
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
      <div className="hidden md:flex h-screen bg-background">
        <DesktopSidebar />
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-0 overflow-hidden">
          {/* Jobs List Panel */}
          <div className="lg:col-span-1 xl:col-span-1 border-r border-border flex flex-col">
            <header className="p-4 border-b border-border bg-card/90 backdrop-blur-sm sticky top-0 z-10">
              <h1 className="text-xl font-semibold text-foreground">Applied Jobs ({appliedJobs.length})</h1>
            </header>
            <ScrollArea className="flex-grow">
              <div className="p-4">
                {appliedJobs.length > 0 ? (
                  appliedJobs.map(job => (
                    <AppliedJobCard
                      key={job.id}
                      job={job}
                      onClick={() => setSelectedJob(job)}
                      isSelected={selectedJob?.id === job.id}
                    />
                  ))
                ) : (
                  <NoJobsPlaceholder />
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Job Details Panel */}
          <div className="lg:col-span-2 xl:col-span-3 overflow-y-auto">
            {selectedJob ? (
                <JobDetailsView job={selectedJob} onBack={() => setSelectedJob(null)} />
            ) : (
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
