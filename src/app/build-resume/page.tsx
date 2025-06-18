
'use client';

import React, { useState, type ChangeEvent } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Briefcase, BookOpen, Sparkles, LinkIcon, Award, Save, PlusCircle, Trash2, Target, MapPin, DollarSign } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface ExperienceEntry {
  id: string;
  jobTitle: string;
  company: string;
  jobLocation: string;
  jobStartDate: string;
  jobEndDate: string;
  jobResponsibilities: string;
}

interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  eduLocation: string;
  gradDate: string;
  eduDetails: string;
}

interface ProjectEntry {
  id: string;
  projectTitle: string;
  projectDescription: string;
  projectLink: string;
}

const SectionWrapper: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <Card className="bg-card/80 backdrop-blur-md shadow-lg border border-border/30 rounded-xl mb-[10px]">
    <CardHeader className="pb-3 pt-4 px-4">
      <CardTitle className="text-base font-semibold text-primary flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="px-4 pb-4 space-y-3">
      {children}
    </CardContent>
  </Card>
);

export default function BuildResumePage() {
  const [pageContainerRef, isPageContainerVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });
  const router = useRouter();

  const [professionalSummary, setProfessionalSummary] = useState('');
  const [skills, setSkills] = useState('');

  const [experiences, setExperiences] = useState<ExperienceEntry[]>([
    { id: `exp-${Date.now()}`, jobTitle: '', company: '', jobLocation: '', jobStartDate: '', jobEndDate: '', jobResponsibilities: '' }
  ]);

  const [educations, setEducations] = useState<EducationEntry[]>([
    { id: `edu-${Date.now()}`, degree: '', institution: '', eduLocation: '', gradDate: '', eduDetails: ''}
  ]);

  const [projects, setProjects] = useState<ProjectEntry[]>([
    { id: `proj-${Date.now()}`, projectTitle: '', projectDescription: '', projectLink: ''}
  ]);
  
  const [links, setLinks] = useState({ portfolioLink: '', linkedinLink: '', githubLink: '' });

  const [preferredRole, setPreferredRole] = useState('');
  const [preferredLocation, setPreferredLocation] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');


  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<any>>, field?: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (field) {
      setter((prev: any) => ({ ...prev, [field]: e.target.value }));
    } else {
      setter(e.target.value);
    }
  };

  // Experience Handlers
  const handleExperienceChange = (index: number, field: keyof ExperienceEntry, value: string) => {
    setExperiences(prev =>
      prev.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp))
    );
  };

  const addExperience = () => {
    setExperiences(prev => [...prev, { id: `exp-${Date.now()}`, jobTitle: '', company: '', jobLocation: '', jobStartDate: '', jobEndDate: '', jobResponsibilities: '' }]);
  };

  const removeExperience = (id: string) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id));
  };
  
  // Education Handlers
  const handleEducationChange = (index: number, field: keyof EducationEntry, value: string) => {
    setEducations(prev =>
      prev.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu))
    );
  };

  const addEducation = () => {
    setEducations(prev => [...prev, { id: `edu-${Date.now()}`, degree: '', institution: '', eduLocation: '', gradDate: '', eduDetails: '' }]);
  };

  const removeEducation = (id: string) => {
    setEducations(prev => prev.filter(edu => edu.id !== id));
  };

  // Project Handlers
  const handleProjectChange = (index: number, field: keyof ProjectEntry, value: string) => {
    setProjects(prev =>
      prev.map((proj, i) => (i === index ? { ...proj, [field]: value } : proj))
    );
  };

  const addProject = () => {
    setProjects(prev => [...prev, { id: `proj-${Date.now()}`, projectTitle: '', projectDescription: '', projectLink: '' }]);
  };

  const removeProject = (id: string) => {
    setProjects(prev => prev.filter(proj => proj.id !== id));
  };


  const handleSaveResume = (e: React.FormEvent) => {
    e.preventDefault();
    const resumeData = {
      professionalSummary,
      experiences,
      educations,
      skills,
      projects,
      links,
      preferredRole,
      preferredLocation,
      expectedSalary,
    };
    console.log("Resume Data:", resumeData);
    // alert("Resume saved! (Check console for data - Placeholder)");
    router.push('/job-feed'); 
  };

  return (
    <div
      ref={pageContainerRef}
      className={cn(
        "min-h-screen flex flex-col items-center justify-center bg-gradient-animated p-4 overflow-hidden opacity-0 translate-y-10 transition-all duration-1000 ease-out",
        isPageContainerVisible && "opacity-100 translate-y-0"
      )}
    >
      <div className="absolute inset-0 opacity-20 dark:opacity-15"></div>
      <div className="relative w-[375px] h-[780px] bg-slate-900 rounded-[48px] border-[10px] border-slate-950 shadow-2xl overflow-hidden z-10">
        <div className="h-full w-full bg-muted/30 dark:bg-slate-900/40 flex flex-col rounded-[38px] overflow-hidden">
          <header className="p-4 border-b border-border/50 bg-card/90 backdrop-blur-sm flex items-center justify-between sticky top-0 z-20 min-h-[60px]">
            <Button variant="ghost" size="icon" className="text-primary" onClick={() => router.back()}>
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div className="flex flex-col items-center">
              <Award className="h-5 w-5 text-primary mb-0.5 opacity-80" />
              <h1 className="text-md font-semibold text-foreground -mt-0.5">Complete Your Profile</h1>
            </div>
            <Image src="/logo.png" alt="HyreSense Logo" width={30} height={22} className="rounded-sm" />
          </header>

          <ScrollArea className="flex-grow">
            <form onSubmit={handleSaveResume} className="p-4 space-y-0">
              <SectionWrapper title="Professional Summary" icon={<Sparkles className="h-5 w-5" />}>
                <Textarea
                  id="summary"
                  placeholder="Write a brief summary of your career, skills, and goals..."
                  rows={4}
                  value={professionalSummary}
                  onChange={handleInputChange(setProfessionalSummary)}
                  className="text-xs resize-none bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70"
                />
              </SectionWrapper>

              <SectionWrapper title="Work Experience" icon={<Briefcase className="h-5 w-5" />}>
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="space-y-3 border-b border-border/30 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
                    {experiences.length > 1 && (
                       <div className="flex justify-between items-center">
                         <Label className="text-xs font-semibold text-muted-foreground">Experience #{index + 1}</Label>
                         <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive/70 hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => removeExperience(exp.id)}
                         >
                            <Trash2 className="h-4 w-4" />
                         </Button>
                       </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor={`jobTitle-${exp.id}`} className="text-xs">Job Title</Label>
                      <Input id={`jobTitle-${exp.id}`} placeholder="e.g., Senior Software Engineer" value={exp.jobTitle} onChange={(e) => handleExperienceChange(index, 'jobTitle', e.target.value)} className="text-xs h-9 bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`company-${exp.id}`} className="text-xs">Company</Label>
                      <Input id={`company-${exp.id}`} placeholder="e.g., Tech Solutions Inc." value={exp.company} onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} className="text-xs h-9 bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`jobLocation-${exp.id}`} className="text-xs">Location</Label>
                      <Input id={`jobLocation-${exp.id}`} placeholder="e.g., New York, NY" value={exp.jobLocation} onChange={(e) => handleExperienceChange(index, 'jobLocation', e.target.value)} className="text-xs h-9 bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor={`jobStartDate-${exp.id}`} className="text-xs">Start Date</Label>
                        <Input id={`jobStartDate-${exp.id}`} type="text" placeholder="MM/YYYY" value={exp.jobStartDate} onChange={(e) => handleExperienceChange(index, 'jobStartDate', e.target.value)} className="text-xs h-9 bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`jobEndDate-${exp.id}`} className="text-xs">End Date</Label>
                        <Input id={`jobEndDate-${exp.id}`} type="text" placeholder="MM/YYYY or Present" value={exp.jobEndDate} onChange={(e) => handleExperienceChange(index, 'jobEndDate', e.target.value)} className="text-xs h-9 bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`jobResponsibilities-${exp.id}`} className="text-xs">Responsibilities / Achievements</Label>
                      <Textarea id={`jobResponsibilities-${exp.id}`} placeholder="Describe your key tasks and accomplishments..." rows={3} value={exp.jobResponsibilities} onChange={(e) => handleExperienceChange(index, 'jobResponsibilities', e.target.value)} className="text-xs resize-none bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70" />
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" className="w-full mt-2 text-xs h-8 border-dashed border-primary/50 text-primary hover:bg-primary/10" onClick={addExperience}>
                  <PlusCircle className="h-4 w-4 mr-1.5" /> Add Another Experience
                </Button>
              </SectionWrapper>

              <SectionWrapper title="Education" icon={<BookOpen className="h-5 w-5" />}>
                {educations.map((edu, index) => (
                  <div key={edu.id} className="space-y-3 border-b border-border/30 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
                     {educations.length > 1 && (
                       <div className="flex justify-between items-center">
                         <Label className="text-xs font-semibold text-muted-foreground">Education #{index + 1}</Label>
                         <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive/70 hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => removeEducation(edu.id)}
                         >
                            <Trash2 className="h-4 w-4" />
                         </Button>
                       </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor={`degree-${edu.id}`} className="text-xs">Degree / Certificate</Label>
                      <Input id={`degree-${edu.id}`} placeholder="e.g., B.S. in Computer Science" value={edu.degree} onChange={(e) => handleEducationChange(index, 'degree', e.target.value)} className="text-xs h-9 bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`institution-${edu.id}`} className="text-xs">Institution</Label>
                      <Input id={`institution-${edu.id}`} placeholder="e.g., State University" value={edu.institution} onChange={(e) => handleEducationChange(index, 'institution', e.target.value)} className="text-xs h-9 bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`eduLocation-${edu.id}`} className="text-xs">Location</Label>
                      <Input id={`eduLocation-${edu.id}`} placeholder="e.g., City, State" value={edu.eduLocation} onChange={(e) => handleEducationChange(index, 'eduLocation', e.target.value)} className="text-xs h-9 bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`gradDate-${edu.id}`} className="text-xs">Graduation Date</Label>
                      <Input id={`gradDate-${edu.id}`} type="text" placeholder="MM/YYYY or Expected MM/YYYY" value={edu.gradDate} onChange={(e) => handleEducationChange(index, 'gradDate', e.target.value)} className="text-xs h-9 bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`eduDetails-${edu.id}`} className="text-xs">Relevant Coursework / Honors (Optional)</Label>
                      <Textarea id={`eduDetails-${edu.id}`} placeholder="e.g., Dean's List, Capstone Project..." rows={2} value={edu.eduDetails} onChange={(e) => handleEducationChange(index, 'eduDetails', e.target.value)} className="text-xs resize-none bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70" />
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" className="w-full mt-2 text-xs h-8 border-dashed border-primary/50 text-primary hover:bg-primary/10" onClick={addEducation}>
                  <PlusCircle className="h-4 w-4 mr-1.5" /> Add Another Education
                </Button>
              </SectionWrapper>

              <SectionWrapper title="Skills" icon={<Award className="h-5 w-5" />}>
                <Textarea
                  id="skills"
                  placeholder="e.g., JavaScript, React, Project Management, Figma (comma-separated)"
                  rows={3}
                  value={skills}
                  onChange={handleInputChange(setSkills)}
                  className="text-xs resize-none bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70"
                />
              </SectionWrapper>
              
              <SectionWrapper title="Projects (Optional)" icon={<Briefcase className="h-5 w-5 opacity-70" />}>
                {projects.map((proj, index) => (
                  <div key={proj.id} className="space-y-3 border-b border-border/30 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
                    {projects.length > 1 && (
                       <div className="flex justify-between items-center">
                         <Label className="text-xs font-semibold text-muted-foreground">Project #{index + 1}</Label>
                         <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive/70 hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => removeProject(proj.id)}
                         >
                            <Trash2 className="h-4 w-4" />
                         </Button>
                       </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor={`projectTitle-${proj.id}`} className="text-xs">Project Title</Label>
                      <Input id={`projectTitle-${proj.id}`} placeholder="e.g., Personal Portfolio Website" value={proj.projectTitle} onChange={(e) => handleProjectChange(index, 'projectTitle', e.target.value)} className="text-xs h-9 bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`projectDescription-${proj.id}`} className="text-xs">Description</Label>
                      <Textarea id={`projectDescription-${proj.id}`} placeholder="Briefly describe your project..." rows={2} value={proj.projectDescription} onChange={(e) => handleProjectChange(index, 'projectDescription', e.target.value)} className="text-xs resize-none bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`projectLink-${proj.id}`} className="text-xs">Project Link (Optional)</Label>
                      <Input id={`projectLink-${proj.id}`} placeholder="https://github.com/yourproject" value={proj.projectLink} onChange={(e) => handleProjectChange(index, 'projectLink', e.target.value)} className="text-xs h-9 bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70" />
                    </div>
                  </div>
                ))}
                 <Button type="button" variant="outline" size="sm" className="w-full mt-2 text-xs h-8 border-dashed border-primary/50 text-primary hover:bg-primary/10" onClick={addProject}>
                  <PlusCircle className="h-4 w-4 mr-1.5" /> Add Another Project
                </Button>
              </SectionWrapper>

              <SectionWrapper title="Links" icon={<LinkIcon className="h-5 w-5" />}>
                <div className="space-y-2">
                  <Label htmlFor="portfolioLink" className="text-xs">Portfolio Website (Optional)</Label>
                  <Input id="portfolioLink" placeholder="https://yourportfolio.com" value={links.portfolioLink} onChange={handleInputChange(setLinks, 'portfolioLink')} className="text-xs h-9 bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedinLink" className="text-xs">LinkedIn Profile (Optional)</Label>
                  <Input id="linkedinLink" placeholder="https://linkedin.com/in/yourprofile" value={links.linkedinLink} onChange={handleInputChange(setLinks, 'linkedinLink')} className="text-xs h-9 bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="githubLink" className="text-xs">GitHub Profile (Optional)</Label>
                  <Input id="githubLink" placeholder="https://github.com/yourusername" value={links.githubLink} onChange={handleInputChange(setLinks, 'githubLink')} className="text-xs h-9 bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70" />
                </div>
              </SectionWrapper>

              <SectionWrapper title="Job Preferences" icon={<Target className="h-5 w-5" />}>
                <div className="space-y-2">
                  <Label htmlFor="preferredRole" className="text-xs">Preferred Role</Label>
                  <Input id="preferredRole" placeholder="e.g., Senior Software Engineer, Product Manager" value={preferredRole} onChange={handleInputChange(setPreferredRole)} className="text-xs h-9 bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredLocation" className="text-xs">Preferred Location(s)</Label>
                  <Input id="preferredLocation" placeholder="e.g., New York, NY; Remote; San Francisco Bay Area" value={preferredLocation} onChange={handleInputChange(setPreferredLocation)} className="text-xs h-9 bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedSalary" className="text-xs">Expected Salary (Optional)</Label>
                  <Input id="expectedSalary" placeholder="e.g., $120,000 per year, or desired range" value={expectedSalary} onChange={handleInputChange(setExpectedSalary)} className="text-xs h-9 bg-background/70 dark:bg-slate-700/50 border-border/50 focus:border-primary/70" />
                </div>
              </SectionWrapper>

              <div className="pt-3 pb-1">
                <Button type="submit" className="w-full h-11 text-sm font-semibold group bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30">
                  <Save className="mr-2 h-4 w-4" /> Save Profile
                </Button>
              </div>
            </form>
          </ScrollArea>
        </div>
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
    </div>
  );
}

