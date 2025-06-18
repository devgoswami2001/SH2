
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Edit3, FileText, UploadCloud, Briefcase, GraduationCap, Award, Star, Building2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { MobileAppLayout } from '@/components/layout/MobileAppLayout'; // Adjust path as necessary

// --- Data Structures (Copied from MobileAppDemo.tsx) ---
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

const userProfileData: ProfileData = {
  name: "Alex Chen",
  avatarUrl: "https://placehold.co/128x128.png?text=AC",
  dataAiHintAvatar: "profile person",
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

// --- Helper Functions (Copied from MobileAppDemo.tsx) ---
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


export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>(userProfileData);

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
    <MobileAppLayout activeView="profile" pageTitle="My Profile">
      <ScrollArea className="flex-grow bg-muted/20 dark:bg-slate-800/40">
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
    </MobileAppLayout>
  );
}
