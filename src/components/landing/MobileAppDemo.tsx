
'use client';

import React, { useState, useEffect, useRef, type ChangeEvent, type FormEvent } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Compass, LayoutGrid, User, Brain, Briefcase, CalendarDays, Sparkles, ArrowLeft, ListChecks, Search, Heart, MessageCircle, Share2, ThumbsUp, PackageSearch, Edit3, FileText, UploadCloud, Award, GraduationCap, MapPin, Building, Star, Building2, Send } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

// --- Data Structures ---
type JobStatus = "Pending" | "Interview Scheduled" | "Offer Received" | "Hired" | "Rejected";

interface AppJobBase {
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

interface AppJob extends AppJobBase {
  applicationStatus?: JobStatus;
}

interface CompanyPost {
  id: string;
  companyName: string;
  companyLogoUrl: string;
  dataAiHintLogo: string;
  postImageUrl?: string;
  dataAiHintPost?: string;
  postText: string;
  likes: number;
  comments: number;
  shares: number;
  timeAgo: string;
}

interface DreamJob {
  id: string;
  title: string;
  company: string;
  logoUrl: string;
  dataAiHintLogo: string;
  status: "Actively Pursuing" | "Watching" | "Applied";
}

interface FollowedCompany {
  id: string;
  companyName: string;
  logoUrl: string;
  dataAiHintLogo: string;
  isDreamCompany: boolean;
}

interface ProfileData {
  name: string;
  avatarUrl: string;
  dataAiHintAvatar: string;
  title: string;
  bio: string;
  profileCompletion: number;
  experiences: {
    id: string;
    role: string;
    company: string;
    logoUrl: string;
    dataAiHintLogo: string;
    duration: string;
    location: string;
    descriptionPoints: string[];
  }[];
  education: {
    id: string;
    degree: string;
    institution: string;
    logoUrl: string;
    dataAiHintLogo: string;
    duration: string;
  }[];
  skills: string[];
  resumeUrl?: string;
  dreamJobs: DreamJob[];
  following: FollowedCompany[];
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  avatar?: string;
  dataAiHintAvatar?: string;
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
    description: "Join the Amazon Transportation team to define and analyze complex business problems. You will work with large datasets, build analytical frameworks, and liaise with operations teams to streamline processes and drive efficiency.",
    matchPercentage: 89,
    image: "https://static.vecteezy.com/system/resources/previews/014/018/563/non_2x/amazon-logo-on-transparent-background-free-vector.jpg",
    dataAiHint: "amazon warehouse",
    skills: ["Excel VBA", "SQL", "ETL", "Tableau", "Data Analysis"],
    experienceLevel: "Analyst (1+ years)",
    jobType: "Full-Time",
    postedDate: "Jul 03, 2025",
  },
];

const companyPostsData: CompanyPost[] = [
  {
    id: 'post1',
    companyName: 'Innovatech Solutions Ltd.',
    companyLogoUrl: 'https://placehold.co/48x48.png?text=IS',
    dataAiHintLogo: "company logo initial",
    postImageUrl: 'https://placehold.co/350x190.png',
    dataAiHintPost: "office team",
    postText: 'Exciting news! We are expanding our frontend team. Looking for passionate #React developers to join us on groundbreaking projects. #FrontendDev #Hiring',
    likes: 125,
    comments: 18,
    shares: 7,
    timeAgo: '2h ago'
  },
  {
    id: 'post2',
    companyName: 'ConnectSphere Inc.',
    companyLogoUrl: 'https://placehold.co/48x48.png?text=CS',
    dataAiHintLogo: "company logo initial",
    postImageUrl: 'https://placehold.co/350x190.png',
    dataAiHintPost: "marketing campaign",
    postText: 'Our latest digital marketing campaign just launched! Check out how we are leveraging #AI to boost engagement. #DigitalMarketing #AIinMarketing #Innovation',
    likes: 230,
    comments: 45,
    shares: 15,
    timeAgo: '5h ago'
  },
  {
    id: 'post3',
    companyName: 'PixelPerfect Studios',
    companyLogoUrl: 'https://placehold.co/48x48.png?text=PP',
    dataAiHintLogo: "company logo initial",
    postImageUrl: 'https://placehold.co/350x190.png',
    dataAiHintPost: "design studio",
    postText: "We're thrilled to share a sneak peek of our new mobile app interface, designed with user experience at its core. What do you think? #UIDesign #UX #ProductDesign",
    likes: 180,
    comments: 30,
    shares: 10,
    timeAgo: '1d ago'
  },
];

const userProfileData: ProfileData = {
  name: "Alex Chen",
  avatarUrl: "https://placehold.co/128x128.png?text=AC",
  dataAiHintAvatar: "profile picture person",
  title: "Senior UX Designer | AI Enthusiast",
  bio: "Crafting intuitive digital experiences where design meets AI. Passionate about user-centric solutions and continuous learning.",
  profileCompletion: 85,
  experiences: [
    {
      id: "exp1",
      role: "Lead UX Designer",
      company: "Innovatech Solutions Ltd.",
      logoUrl: "https://placehold.co/48x48.png?text=ISL",
      dataAiHintLogo: "company logo initial",
      duration: "Jan 2022 - Present",
      location: "New York, NY",
      descriptionPoints: [
        "Led a team of 5 designers in creating user-centric solutions for enterprise SaaS products.",
        "Spearheaded the redesign of the flagship platform, resulting in a 20% increase in user satisfaction.",
        "Implemented a new design system, improving consistency and development efficiency."
      ],
    },
    {
      id: "exp2",
      role: "UX/UI Designer",
      company: "ConnectSphere Inc.",
      logoUrl: "https://placehold.co/48x48.png?text=CSI",
      dataAiHintLogo: "company logo initial",
      duration: "Jun 2019 - Dec 2021",
      location: "San Francisco, CA",
      descriptionPoints: [
        "Designed and prototyped mobile and web interfaces for social networking platforms.",
        "Conducted user research and usability testing to iterate on designs and improve user engagement.",
      ],
    },
  ],
  education: [
    {
      id: "edu1",
      degree: "M.S. in Human-Computer Interaction",
      institution: "Tech University Global",
      logoUrl: "https://placehold.co/48x48.png?text=TUG",
      dataAiHintLogo: "university logo initial",
      duration: "2017 - 2019",
    },
    {
      id: "edu2",
      degree: "B.S. in Graphic Design",
      institution: "Creative Arts College",
      logoUrl: "https://placehold.co/48x48.png?text=CAC",
      dataAiHintLogo: "college logo initial",
      duration: "2013 - 2017",
    },
  ],
  skills: ["UX Design", "UI Design", "Prototyping", "User Research", "Figma", "Adobe XD", "Agile", "Interaction Design", "Wireframing", "Design Systems", "Problem Solving", "AI Integration"],
  resumeUrl: "#",
  dreamJobs: [
    {
      id: "dream1",
      title: "AI Ethicist & Researcher",
      company: "OpenFuture AI Lab",
      logoUrl: "https://placehold.co/48x48.png?text=OF",
      dataAiHintLogo: "company logo initial",
      status: "Actively Pursuing",
    },
    {
      id: "dream2",
      title: "Lead Product Designer, XR",
      company: "Nova Realities Inc.",
      logoUrl: "https://placehold.co/48x48.png?text=NR",
      dataAiHintLogo: "company logo initial",
      status: "Watching",
    },
     {
      id: "dream3",
      title: "Principal Machine Learning Engineer",
      company: "QuantumLeap AI",
      logoUrl: "https://placehold.co/48x48.png?text=QL",
      dataAiHintLogo: "company logo initial",
      status: "Applied",
    },
  ],
  following: [
    {
      id: "follow1",
      companyName: "Innovatech Solutions Ltd.",
      logoUrl: "https://placehold.co/48x48.png?text=ISL",
      dataAiHintLogo: "company logo initial",
      isDreamCompany: false,
    },
    {
      id: "follow2",
      companyName: "OpenFuture AI Lab",
      logoUrl: "https://placehold.co/48x48.png?text=OF",
      dataAiHintLogo: "company logo initial",
      isDreamCompany: true,
    },
    {
      id: "follow3",
      companyName: "Google",
      logoUrl: "https://placehold.co/48x48.png?text=G",
      dataAiHintLogo: "company logo initial",
      isDreamCompany: true,
    },
     {
      id: "follow4",
      companyName: "ConnectSphere Inc.",
      logoUrl: "https://placehold.co/48x48.png?text=CSI",
      dataAiHintLogo: "company logo initial",
      isDreamCompany: false,
    },
     {
      id: "follow5",
      companyName: "Nova Realities Inc.",
      logoUrl: "https://placehold.co/48x48.png?text=NR",
      dataAiHintLogo: "company logo initial",
      isDreamCompany: true,
    },
  ],
};


type ViewMode = 'swiping' | 'details' | 'explore' | 'applied' | 'profile' | 'ai_assist';

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

const getDreamJobStatusBadgeClass = (status: DreamJob["status"]): string => {
    switch (status) {
        case "Actively Pursuing":
            return "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-700/30 dark:text-emerald-300 dark:border-emerald-500/50";
        case "Watching":
            return "bg-sky-100 text-sky-700 border-sky-300 dark:bg-sky-700/30 dark:text-sky-300 dark:border-sky-500/50";
        case "Applied":
            return "bg-indigo-100 text-indigo-700 border-indigo-300 dark:bg-indigo-700/30 dark:text-indigo-300 dark:border-indigo-500/50";
        default:
            return "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-700/30 dark:text-slate-300 dark:border-slate-500/50";
    }
};

// --- Child Components ---
const JobDetailsView: React.FC<{ job: AppJob, onBack: () => void }> = ({ job, onBack }) => {
  return (
    <div className="h-full w-full flex flex-col">
         <header className="p-3 border-b border-border/50 bg-background/80 backdrop-blur-sm flex items-center justify-between sticky top-0 z-10 min-h-[56px] mt-5">
            <Button variant="ghost" size="icon" className="text-primary -ml-2" onClick={onBack}>
                <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="text-base font-semibold text-foreground truncate px-2 flex-1 text-center">
                {job.title}
            </span>
            <Image src="/logo.png" alt="HyreSense Logo" width={28} height={20} className="rounded-sm ml-1"/>
        </header>
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

const CompanyPostCard: React.FC<{ post: CompanyPost }> = ({ post }) => {
  const renderPostText = (text: string) => {
    const parts = text.split(/(#\w+)/g);
    return parts.map((part, index) =>
      part.startsWith('#') ? (
        <span key={index} className="text-primary hover:underline cursor-pointer">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <Card className="bg-card/90 backdrop-blur-md shadow-lg overflow-hidden border border-border/30 mb-3.5 rounded-xl dark:bg-slate-800/60">
      <CardHeader className="flex flex-row items-center gap-3 p-3">
        <Avatar className="h-10 w-10 border-2 border-primary/40">
          <AvatarImage src={post.companyLogoUrl} alt={post.companyName} data-ai-hint={post.dataAiHintLogo} />
          <AvatarFallback>{post.companyName.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <p className="text-sm font-semibold text-foreground leading-tight">{post.companyName}</p>
          <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-sm text-foreground px-3 pb-2.5 leading-normal">
          {renderPostText(post.postText)}
        </p>
        {post.postImageUrl && (
          <Image
            src={post.postImageUrl}
            alt="Post image"
            width={375}
            height={210}
            data-ai-hint={post.dataAiHintPost || "company post"}
            className="w-full object-cover aspect-video"
          />
        )}
      </CardContent>
       <div className="px-3 py-2 text-xs text-muted-foreground flex justify-between items-center border-t border-border/30">
        <div className="flex items-center gap-1">
            <ThumbsUp className="h-3.5 w-3.5 text-primary/70" />
            <span>{post.likes}</span>
        </div>
        <div className="flex items-center gap-2">
            <span>{post.comments} Comments</span>
            <span>&middot;</span>
            <span>{post.shares} Shares</span>
        </div>
      </div>
      <CardFooter className="p-0 grid grid-cols-3 border-t border-border/30">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-none flex-1 h-9 text-xs items-center justify-center gap-1.5 border-r border-border/30">
              <ThumbsUp className="h-4 w-4" /> Like
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-none flex-1 h-9 text-xs items-center justify-center gap-1.5 border-r border-border/30">
              <MessageCircle className="h-4 w-4" /> Comment
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-none flex-1 h-9 text-xs items-center justify-center gap-1.5">
              <Share2 className="h-4 w-4" /> Share
          </Button>
      </CardFooter>
    </Card>
  );
};

const ExploreView: React.FC<{ posts: CompanyPost[], onBack: () => void }> = ({ posts, onBack }) => {
  return (
    <div className="h-full w-full flex flex-col">
      <header className="p-3 border-b border-border/50 bg-background/80 backdrop-blur-sm flex items-center justify-between sticky top-0 z-10 min-h-[56px] mt-5">
        <Button variant="ghost" size="icon" className="text-primary -ml-2" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-grow mx-2 relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
            type="search"
            placeholder="Microsoft, Google..."
            className="w-full h-9 pl-8 pr-2 text-xs rounded-md bg-muted border-border/50 focus:bg-background focus:border-primary/50"
            />
        </div>
        <Image src="/logo.png" alt="HyreSense Logo" width={30} height={22} className="ml-1 rounded-sm" />
      </header>
      <ScrollArea className="flex-grow p-2 bg-muted/30 dark:bg-slate-800/40">
        {posts.map(post => (
          <CompanyPostCard key={post.id} post={post} />
        ))}
      </ScrollArea>
    </div>
  );
};

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
                    <span>Applied: {job.postedDate}</span> {/* Assuming postedDate is used as appliedDate for demo */}
                </div>
            </CardContent>
        </Card>
    );
};

const ProfileView: React.FC<{ profile: ProfileData; onBack: () => void }> = ({ profile, onBack }) => {
  const placeholderAction = (action: string) => {
    alert(`${action} - Feature coming soon!`);
  };

  const SectionCard: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode; className?: string }> =
    ({ title, icon: Icon, children, className }) => (
    <Card className={cn("shadow-xl border-border/40 rounded-xl bg-card/80 backdrop-blur-md overflow-hidden mx-auto", className)} style={{ maxWidth: '297px' }}>
      <CardHeader className="p-3.5 pb-2">
        <CardTitle className="text-md font-semibold text-foreground flex items-center gap-2.5">
          <span className="p-1.5 bg-gradient-to-br from-primary/15 to-accent/15 rounded-full text-primary shadow-inner">
            <Icon className="h-4 w-4" />
          </span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3.5 pt-1 space-y-3">
        {children}
      </CardContent>
    </Card>
  );

  const ProfileListItem: React.FC<{avatarUrl?: string; dataAiHintAvatar?: string; fallbackText: string; title: string; subtitle: string; subtitleSecondary?: string; actionButton?: React.ReactNode; onClick?: () => void; children?: React.ReactNode; badge?: React.ReactNode}> =
    ({ avatarUrl, dataAiHintAvatar, fallbackText, title, subtitle, subtitleSecondary, actionButton, onClick, children, badge}) => (
    <div
        className={cn(
            "flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 shadow-sm hover:shadow-md dark:bg-slate-700/30 dark:hover:bg-slate-700/50 overflow-hidden",
            onClick && "cursor-pointer"
        )}
        onClick={onClick}
    >
        {avatarUrl && (
            <Avatar className="h-11 w-11 border-2 border-primary/20 shrink-0 shadow-md">
                <AvatarImage src={avatarUrl} alt={fallbackText} data-ai-hint={dataAiHintAvatar} />
                <AvatarFallback>{fallbackText.substring(0,1)}</AvatarFallback>
            </Avatar>
        )}
        <div className="flex-grow overflow-hidden">
            <div className="flex justify-between items-start">
                <div className="overflow-hidden mr-1">
                    <h4 className="text-sm font-semibold text-foreground leading-tight truncate">{title}</h4>
                    <p className="text-xs text-primary truncate">{subtitle}</p>
                    {subtitleSecondary && <p className="text-xs text-muted-foreground truncate">{subtitleSecondary}</p>}
                </div>
                {badge && <div className="ml-2 shrink-0">{badge}</div>}
            </div>
            {children && <div className="mt-1.5 text-xs text-muted-foreground/90 space-y-0.5">{children}</div>}
        </div>
        {actionButton && <div className="ml-2 shrink-0 self-center">{actionButton}</div>}
    </div>
  );


  return (
    <div className="h-full w-full flex flex-col">
      <header className="p-3 border-b border-border/50 bg-background/80 backdrop-blur-sm flex items-center justify-between sticky top-0 z-10 min-h-[56px] mt-5">
        <Button variant="ghost" size="icon" className="text-primary -ml-2" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <span className="text-base font-semibold text-foreground truncate px-2 flex-1 text-center">
          Profile
        </span>
        <Image src="/logo.png" alt="HyreSense Logo" width={28} height={20} className="rounded-sm ml-1" />
      </header>

      <ScrollArea className="flex-grow bg-muted/30 dark:bg-slate-800/40">
        <div className="p-3.5 space-y-4">
          {/* Profile Header */}
          <Card className="shadow-2xl border-border/30 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 via-card/90 to-accent/20 dark:from-primary/30 dark:via-slate-800/80 dark:to-accent/30 mx-auto" style={{ maxWidth: '297px' }}>
            <CardContent className="p-4 text-center relative">
                <div className="absolute top-3 right-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary hover:bg-primary/10 rounded-full group transition-all duration-300 hover:scale-110 hover:shadow-md"
                        onClick={() => placeholderAction('Edit Profile')}
                    >
                        <Edit3 className="h-4 w-4 group-hover:rotate-[15deg] transition-transform" />
                    </Button>
                </div>
              <Avatar className="h-24 w-24 mx-auto mb-3 border-4 border-background ring-2 ring-primary shadow-lg">
                <AvatarImage src={profile.avatarUrl} alt={profile.name} data-ai-hint={profile.dataAiHintAvatar} />
                <AvatarFallback className="text-3xl bg-muted">{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold text-foreground">{profile.name}</h2>
              <p className="text-sm text-primary font-medium">{profile.title}</p>
              <p className="text-xs text-muted-foreground mt-2 px-2 leading-relaxed">{profile.bio}</p>
            </CardContent>
          </Card>

          {/* Profile Completion & Resume */}
          <SectionCard title="Career Toolkit" icon={Briefcase}>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-medium text-muted-foreground">Profile Completion</span>
                <span className="text-sm font-semibold text-primary">{profile.profileCompletion}%</span>
              </div>
              <Progress value={profile.profileCompletion} className="h-2.5 [&>div]:bg-gradient-to-r [&>div]:from-accent [&>div]:to-primary shadow-inner" />
            </div>
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <Button variant="outline" size="sm" className="text-xs hover:border-primary/60 hover:bg-primary/5 border-border/50 h-9" onClick={() => placeholderAction('View Resume')}>
                <FileText className="mr-1.5 h-3.5 w-3.5" /> View Resume
              </Button>
              <Button variant="outline" size="sm" className="text-xs hover:border-primary/60 hover:bg-primary/5 border-border/50 h-9" onClick={() => placeholderAction('Upload New')}>
                <UploadCloud className="mr-1.5 h-3.5 w-3.5" /> Upload New
              </Button>
            </div>
          </SectionCard>

          {/* Dream Jobs Section */}
          <SectionCard title="Dream Roles" icon={Star}>
            {profile.dreamJobs.length > 0 ? profile.dreamJobs.map(job => (
              <ProfileListItem
                key={job.id}
                avatarUrl={job.logoUrl}
                dataAiHintAvatar={job.dataAiHintLogo}
                fallbackText={job.company}
                title={job.title}
                subtitle={job.company}
                onClick={() => placeholderAction(`View ${job.title}`)}
                badge={<Badge className={cn("text-[10px] px-1.5 py-0.5 whitespace-nowrap self-start mt-0.5", getDreamJobStatusBadgeClass(job.status))}>
                           {job.status}
                       </Badge>}
              />
            )) : <p className="text-xs text-muted-foreground text-center py-2">No dream jobs added yet.</p>}
          </SectionCard>

          {/* Following Section */}
          <SectionCard title="Companies I'm Watching" icon={Building2}>
            {profile.following.length > 0 ? profile.following.map(co => (
              <ProfileListItem
                key={co.id}
                avatarUrl={co.logoUrl}
                dataAiHintAvatar={co.dataAiHintLogo}
                fallbackText={co.companyName}
                title={co.companyName}
                subtitle={co.isDreamCompany ? "Dream Company" : "Following"}
                onClick={() => placeholderAction(`View ${co.companyName}`)}
                actionButton={
                    <Button variant="ghost" size="sm" className="text-xs text-primary hover:bg-primary/10 h-7 px-2" onClick={(e) => { e.stopPropagation(); placeholderAction(`Jobs at ${co.companyName}`);}}>View Jobs</Button>
                }
                badge={co.isDreamCompany && <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />}
              />
            )) : <p className="text-xs text-muted-foreground text-center py-2">Not following any companies yet.</p>}
          </SectionCard>


          {/* Experience Section */}
          <SectionCard title="Experience" icon={Briefcase}>
            {profile.experiences.map(exp => (
              <ProfileListItem
                key={exp.id}
                avatarUrl={exp.logoUrl}
                dataAiHintAvatar={exp.dataAiHintLogo}
                fallbackText={exp.company}
                title={exp.role}
                subtitle={exp.company}
                subtitleSecondary={`${exp.duration} · ${exp.location}`}
              >
                <ul className="list-disc list-inside space-y-0.5 pl-1">
                  {exp.descriptionPoints.map((point, i) => (
                    <li key={i} className="leading-snug">{point}</li>
                  ))}
                </ul>
              </ProfileListItem>
            ))}
          </SectionCard>

          {/* Education Section */}
          <SectionCard title="Education" icon={GraduationCap}>
            {profile.education.map(edu => (
              <ProfileListItem
                key={edu.id}
                avatarUrl={edu.logoUrl}
                dataAiHintAvatar={edu.dataAiHintLogo}
                fallbackText={edu.institution}
                title={edu.degree}
                subtitle={edu.institution}
                subtitleSecondary={edu.duration}
              />
            ))}
          </SectionCard>

          {/* Skills Section */}
          <SectionCard title="Skills & Expertise" icon={Award}>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map(skill => (
                <Badge key={skill} variant="secondary" className="text-xs px-2.5 py-1 bg-primary/10 text-primary/90 border-primary/30 hover:bg-primary/20 transition-colors shadow-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </SectionCard>
        </div>
      </ScrollArea>
    </div>
  );
};

const AiAssistView: React.FC<{ onBack: () => void; isActive: boolean }> = ({ onBack, isActive }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'initial-ai',
      text: "Hello! I'm HyreSense AI. How can I assist you with your career goals or job search today?",
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: "/logo.png",
      dataAiHintAvatar: "ai assistant logo"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [renderInputArea, setRenderInputArea] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const viewContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (isActive) {
      if (viewContainerRef.current) {
        viewContainerRef.current.focus({ preventScroll: true });
      }
      requestAnimationFrame(() => {
        setTimeout(() => {
          setRenderInputArea(true);
          if (textareaRef.current && document.activeElement === textareaRef.current) {
            textareaRef.current.blur();
          }
          if (viewContainerRef.current && document.activeElement !== viewContainerRef.current) {
             viewContainerRef.current.focus({ preventScroll: true });
          }
        }, 50); 
      });
    } else {
      setRenderInputArea(false);
    }
  }, [isActive]);


  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `ai-${Date.now()}`,
        text: `Thanks for reaching out! I'm still in my learning phase. You mentioned: "${userMessage.text}". I'll be able to provide more detailed assistance soon!`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: "/logo.png",
        dataAiHintAvatar: "ai assistant logo"
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1200);
  };

  return (
    <div
      ref={viewContainerRef}
      tabIndex={-1}
      className="h-full w-full flex flex-col bg-muted/20 dark:bg-slate-900/30 outline-none"
    >
      <header className="p-3 border-b border-border/50 bg-background/80 backdrop-blur-sm flex items-center justify-between sticky top-0 z-10 min-h-[56px]">
        <Button variant="ghost" size="icon" className="text-primary -ml-2" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <span className="text-base font-semibold text-foreground truncate px-2 flex-1 text-center">AI Assistant</span>
        <Image src="/logo.png" alt="HyreSense Logo" width={28} height={20} className="rounded-sm ml-1" />
      </header>

      <ScrollArea className="flex-grow">
        <div className="p-3 space-y-3">
            {messages.map((msg) => (
            <div
                key={msg.id}
                className={cn(
                "flex w-full mb-2 items-end gap-2",
                msg.sender === 'user' ? "justify-end" : "justify-start"
                )}
            >
                {msg.sender === 'ai' && (
                    <Avatar className="h-7 w-7 self-start border border-primary/30 shadow-sm">
                        {msg.avatar ? <AvatarImage src={msg.avatar} alt="AI Avatar" data-ai-hint={msg.dataAiHintAvatar}/> : <AvatarImage src="/logo.png" alt="AI Avatar" data-ai-hint="ai logo" />}
                        <AvatarFallback><Brain className="h-4 w-4 text-primary"/></AvatarFallback>
                    </Avatar>
                )}
                <div
                className={cn(
                    "max-w-[75%] p-2.5 rounded-xl shadow-md text-sm",
                    msg.sender === 'user'
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-card text-card-foreground border border-border/50 rounded-bl-none dark:bg-slate-800"
                )}
                >
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                {msg.timestamp && (
                    <p className={cn(
                        "text-xs mt-1.5 opacity-70",
                        msg.sender === 'user' ? 'text-right text-primary-foreground/70' : 'text-left text-muted-foreground'
                    )}>
                    {msg.timestamp}
                    </p>
                )}
                </div>
                 {msg.sender === 'user' && (
                     <Avatar className="h-7 w-7 self-start border border-border/30 shadow-sm">
                        <AvatarImage src={userProfileData.avatarUrl} alt="User Avatar" data-ai-hint={userProfileData.dataAiHintAvatar} />
                        <AvatarFallback>{userProfileData.name.substring(0,1)}</AvatarFallback>
                    </Avatar>
                )}
            </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {renderInputArea && (
        <div className="p-3 border-t border-border/50 bg-background/90 backdrop-blur-sm flex items-center gap-2 sticky bottom-0">
            <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about career advice, resume tips..."
            className="flex-grow resize-none rounded-xl border-border/60 focus-visible:ring-primary/50 h-10 min-h-[40px] max-h-[100px] py-2 text-sm"
            rows={1}
            onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
                }
            }}
            />
            <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="rounded-full h-10 w-10 shrink-0 bg-primary hover:bg-primary/90 disabled:bg-muted transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send</span>
            </Button>
        </div>
      )}
    </div>
  );
};


// --- Main Component ---
export function MobileAppDemo() {
  const [jobsToSwipe, setJobsToSwipe] = useState(initialJobsData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<'Applied' | 'Rejected' | null>(null);
  const [cardKey, setCardKey] = useState(0);

  const [viewMode, setViewMode] = useState<ViewMode>('swiping');
  const [previousViewMode, setPreviousViewMode] = useState<ViewMode | null>(null);
  const [selectedJobForDetails, setSelectedJobForDetails] = useState<AppJob | null>(null);
  const scrollPositionRef = useRef<number>(0);

  const [appliedJobs, setAppliedJobs] = useState<AppJob[]>([
    { ...initialJobsData[0], applicationStatus: "Interview Scheduled" },
    { ...initialJobsData[1], applicationStatus: "Offer Received" },
    {
        id: 'demo-applied-3',
        title: "Data Scientist",
        company: "Insightful AI",
        location: "Remote",
        description: "Develop machine learning models and analyze complex datasets to drive business decisions. Strong Python, SQL, and statistical modeling skills required.",
        matchPercentage: 85,
        image: "https://placehold.co/300x180.png",
        dataAiHint: "data science dashboard",
        skills: ["Python", "Machine Learning", "SQL", "Statistics", "Pandas"],
        experienceLevel: "Mid-Senior Level",
        jobType: "Full-Time",
        postedDate: "4 days ago",
        applicationStatus: "Pending",
    },
    {
        id: 'demo-applied-4',
        title: "Cloud Engineer",
        company: "SkyNet Works",
        location: "New York, NY",
        description: "Design, implement, and manage cloud infrastructure on AWS/Azure. Focus on automation, scalability, and security.",
        matchPercentage: 90,
        image: "https://placehold.co/300x180.png",
        dataAiHint: "cloud computing",
        skills: ["AWS", "Azure", "Kubernetes", "Terraform", "CI/CD"],
        experienceLevel: "Senior",
        jobType: "Full-Time",
        postedDate: "1 week ago",
        applicationStatus: "Rejected",
    }
  ]);

  // Swipe interaction state
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
          setSwipeDirection('right');
      } else if (dragOffset < -SWIPE_THRESHOLD) {
          setSwipeDirection('left');
      } else {
          setDragOffset(0);
      }
  };
  
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


  const navItems = [
    { label: "Explore", icon: Compass, view: 'explore' as ViewMode },
    { label: "Job Feed", icon: LayoutGrid, view: 'swiping' as ViewMode },
    { label: "Applied", icon: ListChecks, view: 'applied' as ViewMode },
    { label: "Profile", icon: User, view: 'profile' as ViewMode },
    { label: "AI Assist", icon: Brain, view: 'ai_assist' as ViewMode },
  ];

  const handleCardClick = (job: AppJob, fromView: ViewMode) => {
    setPreviousViewMode(fromView);
    setSelectedJobForDetails(job);
    setViewMode('details');
  };

  const handleNavClick = (targetView: ViewMode) => {
    if (targetView === 'ai_assist' && viewMode !== 'ai_assist') {
      scrollPositionRef.current = window.scrollY;
    }

    if (viewMode === targetView && targetView !== 'swiping' && targetView !== 'explore') {
      setPreviousViewMode(targetView);
      setViewMode('swiping');
    } else {
      setPreviousViewMode(viewMode);
      setViewMode(targetView);
    }
    setSelectedJobForDetails(null);
  };
  
  const handleBackNavigation = () => {
    if (selectedJobForDetails) {
        setSelectedJobForDetails(null);
        if (previousViewMode) {
            setViewMode(previousViewMode);
            setPreviousViewMode(null);
        } else {
            setViewMode('swiping'); // Default fallback
        }
    } else if (previousViewMode) {
        setViewMode(previousViewMode);
        setPreviousViewMode(null);
    } else {
        setViewMode('swiping'); // Default fallback if no previous view is set
    }
  };


 useEffect(() => {
    if (viewMode === 'ai_assist') {
        requestAnimationFrame(() => {
             window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' });
        });
    }
  }, [viewMode]);


  const renderHeaderContent = () => {
    if (viewMode === 'swiping') {
        return (
            <>
                <div className="flex items-center gap-2">
                    <Image src="/logo.png" alt="HyreSense Logo" width={28} height={20} className="rounded-sm"/>
                    <span className="text-lg font-bold text-primary">hyreSENSE</span>
                </div>
                <div className="text-center flex-1 px-2 truncate"></div>
                <Sparkles className="h-5 w-5 text-accent"/>
            </>
        );
    }
    // These views (details, explore, profile, ai_assist) render their own headers internally or don't need this main one.
    if (viewMode === 'details' || viewMode === 'explore' || viewMode === 'profile' || viewMode === 'ai_assist') {
        return null;
    }

    let title = viewMode.replace('_', ' ');
    if (viewMode === 'applied') title = "Applied Jobs";

    return (
        <>
            <Button variant="ghost" size="icon" className="text-primary -ml-2" onClick={handleBackNavigation}>
                <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="text-base font-semibold text-foreground truncate px-2 flex-1 text-center capitalize">
                {title}
            </span>
             <Image src="/logo.png" alt="HyreSense Logo" width={28} height={20} className="rounded-sm ml-1"/>
        </>
    );
  };


  return (
    <div className="flex justify-center items-center p-4 bg-transparent">
      <div className="relative w-[375px] h-[780px] bg-slate-900 rounded-[48px] border-[10px] border-slate-950 shadow-2xl overflow-hidden">
        
        <div className="h-full w-full bg-card flex flex-col rounded-[38px] overflow-hidden">
          { (viewMode === 'swiping' || (viewMode === 'applied' && appliedJobs.length > 0)) && (
            <header className="p-3 border-b border-border/50 bg-background/80 backdrop-blur-sm flex items-center justify-between sticky top-0 z-10 min-h-[56px]">
              {renderHeaderContent()}
            </header>
          )}

          <main className="flex-grow flex flex-col relative overflow-hidden">
            {viewMode === 'swiping' && (
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
                    <Card
                      className={cn(
                        "bg-gradient-to-br from-card/80 via-card/70 to-card/80 backdrop-blur-lg",
                        "rounded-2xl overflow-hidden w-full",
                        "border border-primary/40",
                        "shadow-[0_0_15px_0px_hsl(var(--primary)/0.2),_0_0_25px_0px_hsl(var(--accent)/0.15)]",
                        "transition-all duration-300 ease-out"
                      )}
                    >
                      <div onClick={(e) => { e.stopPropagation(); handleCardClick(currentJobToSwipe, 'swiping'); }}>
                        <CardContent className="p-4 space-y-3">
                           <div className="flex justify-between items-start mb-2">
                             <div className="flex items-start gap-3 flex-grow overflow-hidden">
                                <div className="p-1 bg-white rounded-md shadow-sm w-12 h-12 flex items-center justify-center flex-shrink-0">
                                  <Image 
                                    src={currentJobToSwipe.image} 
                                    alt={`${currentJobToSwipe.company} logo`}
                                    width={40} 
                                    height={40} 
                                    data-ai-hint={currentJobToSwipe.dataAiHint}
                                    className="object-contain w-full h-full"
                                  />
                                </div>
                                <div className="overflow-hidden">
                                   <CardTitle className="text-xl font-bold text-foreground line-clamp-2 leading-tight">{currentJobToSwipe.title}</CardTitle>
                                   <div className="text-sm mt-1">
                                     <span className="font-medium text-primary">{currentJobToSwipe.company}</span>
                                     <span className="text-muted-foreground"> - {currentJobToSwipe.location}</span>
                                   </div>
                                </div>
                             </div>
                             <Badge
                               variant="secondary"
                               className="bg-primary/70 backdrop-blur-md text-primary-foreground text-sm font-mono font-bold px-2.5 py-1 rounded-md shadow-lg border border-primary-foreground/50 whitespace-nowrap ml-2"
                             >
                               {currentJobToSwipe.matchPercentage}% Match
                             </Badge>
                           </div>
                           
                           <div className="pt-1 space-y-1.5 text-sm text-muted-foreground">
                             <div className="flex items-center gap-1.5">
                               <Briefcase className="h-4 w-4 text-primary/80" />
                               <span>{currentJobToSwipe.jobType} &middot; {currentJobToSwipe.experienceLevel}</span>
                             </div>
                             <div className="flex items-center gap-1.5">
                               <CalendarDays className="h-4 w-4 text-primary/80" />
                               <span>Posted: {currentJobToSwipe.postedDate}</span>
                             </div>
                           </div>
 
                           <Separator className="my-2 border-primary/30" />
 
                           {currentJobToSwipe.skills && currentJobToSwipe.skills.length > 0 && (
                             <div className="pb-1">
                               <h4 className="text-xs font-semibold text-primary mb-1.5">Key Skills:</h4>
                               <div className="flex flex-wrap gap-1.5">
                                 {currentJobToSwipe.skills.slice(0, 5).map((skill, index) => (
                                   <Badge key={index} variant="secondary" className="text-xs px-2 py-1 bg-primary/10 text-primary/90 border-primary/30">
                                     {skill}
                                   </Badge>
                                 ))}
                               </div>
                             </div>
                           )}
                           <p className="text-xs text-muted-foreground line-clamp-5 h-32">
                               {currentJobToSwipe.description}
                           </p>
                         </CardContent>
                       </div>
                    </Card>
                  </div>
                ) : (
                    <div className="text-center text-muted-foreground p-4">
                        <p className="text-sm mb-2">No more jobs right now!</p>
                        <Button onClick={() => { setCurrentIndex(0); setJobsToSwipe(initialJobsData); setCardKey(k => k + 1); }} variant="outline" size="sm">
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
            )}
            {viewMode === 'details' && selectedJobForDetails && (
              <JobDetailsView job={selectedJobForDetails} onBack={handleBackNavigation} />
            )}
             {viewMode === 'explore' && (
              <ExploreView posts={companyPostsData} onBack={handleBackNavigation} />
            )}
            {viewMode === 'applied' && (
                <div className="h-full w-full flex flex-col">
                    
                    <ScrollArea className="flex-grow p-3 bg-muted/20 dark:bg-slate-900/30">
                        {appliedJobs.length > 0 ? (
                            appliedJobs.map(job => (
                                <AppliedJobCard
                                    key={job.id}
                                    job={job}
                                    onClick={() => handleCardClick(job, 'applied')}
                                />
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-10">
                                 <header className="p-3 border-b border-border/50 bg-background/80 backdrop-blur-sm flex items-center justify-between sticky top-0 z-10 min-h-[56px] w-full mb-6">
                                    {renderHeaderContent()}
                                </header>
                                <PackageSearch className="h-16 w-16 text-primary/30 mb-4" />
                                <h3 className="text-lg font-semibold text-foreground mb-1">No Applied Jobs Yet</h3>
                                <p className="text-sm">Start swiping in the Job Feed to apply for positions!</p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-6"
                                    onClick={() => handleNavClick('swiping')}
                                >
                                    Go to Job Feed
                                </Button>
                            </div>
                        )}
                    </ScrollArea>
                </div>
            )}
            {viewMode === 'profile' && (
              <ProfileView profile={userProfileData} onBack={handleBackNavigation} />
            )}
            {viewMode === 'ai_assist' && (
                 <AiAssistView onBack={handleBackNavigation} isActive={viewMode === 'ai_assist'} />
            )}
          </main>

          <nav className="px-2 py-2.5 border-t border-border/50 bg-background/80 backdrop-blur-sm flex justify-around items-center sticky bottom-0 z-10 min-h-[60px]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = viewMode === item.view;
              return (
                <Button
                  key={item.label}
                  variant="ghost"
                  onClick={() => handleNavClick(item.view)}
                  disabled={item.view !== 'swiping'}
                  className={cn(
                    "flex flex-col items-center h-auto p-1.5 rounded-md w-1/5",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-primary/80"
                  )}
                >
                  <Icon className={cn("h-5 w-5 mb-0.5", isActive ? "stroke-[2.5px]" : "")} />
                  <span className={cn("text-[10px] leading-tight", isActive ? "font-semibold" : "font-normal")}>{item.label}</span>
                </Button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
