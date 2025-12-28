'use client';

import React, { useState, useEffect, type ChangeEvent } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ArrowLeft,
  Briefcase,
  BookOpen,
  Sparkles,
  Link as LinkIcon,
  Award,
  Save,
  PlusCircle,
  Trash2,
  Target,
  MapPin,
  DollarSign,
  Languages,
  Check,
  AlertCircle,
  FileText,
  FileSignature,
  Loader2,
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface EducationEntry {
  id?: string | number;
  degree: string;
  institution: string;
  start_date?: string;
  end_date?: string;
  cgpa?: string;
}
interface WorkExperienceEntry {
  id?: string | number;
  company: string;
  job_title: string;
  location?: string;
  start_date: string;
  end_date: string | null;
  responsibilities: string;
}
interface SkillEntry {
  id?: string | number;
  category: string;
  skills: string;
}
interface CertificationEntry {
  id?: string | number;
  certification: string;
  year: number | string;
}
interface ProjectEntry {
  id?: string | number;
  project_name: string;
  description: string;
  url?: string;
}
interface LanguageEntry {
  id?: string | number;
  language: string;
  proficiency: string;
}
interface AchievementEntry {
  id?: string | number;
  description: string;
}
interface Resume {
  id: number;
  title: string;
  is_default: boolean;
  is_active: boolean;
  experience_level: string;
  total_experience_years: number;
  total_experience_months: number;
  current_company: string;
  current_designation: string;
  notice_period: string;
  current_salary: number;
  education_data: {
    degree: string;
    institution: string;
    start_date?: string;
    end_date?: string;
    cgpa?: string;
  }[];
  work_experience_data: {
    company: string;
    job_title: string;
    location?: string;
    start_date: string;
    end_date: string | null;
    responsibilities: string[];
  }[];
  skills_data: { [key: string]: string[] };
  certifications_data: { certification: string; year: number }[];
  projects_data: { project_name: string; description: string; url?: string }[];
  languages_data: { language: string; proficiency: string }[];
  achievements_data: string[];
  keywords: string[];
}

const SectionWrapper: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onAdd?: () => void;
}> = ({ title, icon, onAdd, children }) => (
  <Card className="bg-card/80 backdrop-blur-md shadow-lg border border-border/30 rounded-xl mb-6 last:mb-0">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-xl md:text-2xl font-semibold text-primary flex items-center">
        {icon}
        <span className="ml-3">{title}</span>
      </CardTitle>
      {onAdd && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={onAdd}
          className="h-8 border-dashed border-primary/50 text-primary hover:bg-primary/10"
        >
          <PlusCircle className="h-4 w-4 mr-1.5" /> Add
        </Button>
      )}
    </CardHeader>
    <CardContent className="space-y-4 md:space-y-6">{children}</CardContent>
  </Card>
);

export default function EditProfilePage() {
  // scroll animation now used for the inner container only
  const [contentRef, isContentVisible] = useScrollAnimation<HTMLDivElement>({
    threshold: 0, // fire as soon as it hits viewport
    triggerOnce: true,
  });

  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resumeId, setResumeId] = useState<number | string | null>(null);

  const [title, setTitle] = useState('');
  const [isDefault, setIsDefault] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [experienceLevel, setExperienceLevel] = useState('');
  const [totalExperienceYears, setTotalExperienceYears] = useState<number | string>('');
  const [totalExperienceMonths, setTotalExperienceMonths] = useState<number | string>('');
  const [currentCompany, setCurrentCompany] = useState('');
  const [currentDesignation, setCurrentDesignation] = useState('');
  const [currentSalary, setCurrentSalary] = useState<number | string>('');
  const [noticePeriod, setNoticePeriod] = useState('');

  const [education, setEducation] = useState<EducationEntry[]>([
    { id: `new-${Date.now()}`, degree: '', institution: '', cgpa: '' },
  ]);
  const [workExperience, setWorkExperience] = useState<WorkExperienceEntry[]>([
    { id: `new-${Date.now()}`, company: '', job_title: '', start_date: '', end_date: '', responsibilities: '' },
  ]);
  const [skills, setSkills] = useState<SkillEntry[]>([
    { id: `new-${Date.now()}`, category: 'technical', skills: '' },
  ]);
  const [certifications, setCertifications] = useState<CertificationEntry[]>([
    { id: `new-${Date.now()}`, certification: '', year: '' },
  ]);
  const [projects, setProjects] = useState<ProjectEntry[]>([
    { id: `new-${Date.now()}`, project_name: '', description: '', url: '' },
  ]);
  const [languages, setLanguages] = useState<LanguageEntry[]>([
    { id: `new-${Date.now()}`, language: '', proficiency: 'native' },
  ]);
  const [achievements, setAchievements] = useState<AchievementEntry[]>([
    { id: `new-${Date.now()}`, description: '' },
  ]);
  const [keywords, setKeywords] = useState('');

  useEffect(() => {
    const fetchResume = async () => {
      const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      if (!accessToken) {
        toast({
          title: 'Unauthorized',
          description: 'Please log in to continue.',
          variant: 'destructive',
        });
        router.push('/login');
        return;
      }

      setIsFetching(true);
      try {
        const response = await fetch('https://backend.hyresense.com/api/v1/jobseeker/resumes/', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.ok) {
          const data = await response.json();
          const defaultResume: Resume | undefined =
            data.results?.find((r: Resume) => r.is_default) || data.results?.[0];

          if (defaultResume) {
            setResumeId(defaultResume.id);
            setTitle(defaultResume.title || '');
            setIsDefault(defaultResume.is_default);
            setIsActive(defaultResume.is_active);
            setExperienceLevel(defaultResume.experience_level || '');
            setTotalExperienceYears(defaultResume.total_experience_years || '');
            setTotalExperienceMonths(defaultResume.total_experience_months || '');
            setCurrentCompany(defaultResume.current_company || '');
            setCurrentDesignation(defaultResume.current_designation || '');
            setCurrentSalary(defaultResume.current_salary || '');
            setNoticePeriod(defaultResume.notice_period || '');
            setKeywords((defaultResume.keywords || []).join(', '));

            setEducation(
              defaultResume.education_data.length > 0
                ? defaultResume.education_data.map((edu, i) => ({ ...edu, id: `edu-${i}` }))
                : [{ id: `new-${Date.now()}`, degree: '', institution: '', cgpa: '' }],
            );

            setWorkExperience(
              defaultResume.work_experience_data.length > 0
                ? defaultResume.work_experience_data.map((exp, i) => ({
                    ...exp,
                    id: `exp-${i}`,
                    responsibilities: (exp.responsibilities || []).join('\n'),
                  }))
                : [
                    {
                      id: `new-${Date.now()}`,
                      company: '',
                      job_title: '',
                      start_date: '',
                      end_date: '',
                      responsibilities: '',
                    },
                  ],
            );

            const skillsData = defaultResume.skills_data || {};
            const formattedSkills = Object.entries(skillsData).map(([category, skillsList], i) => ({
              id: `skillcat-${i}`,
              category,
              skills: (skillsList || []).join(', '),
            }));
            setSkills(
              formattedSkills.length > 0
                ? formattedSkills
                : [{ id: `new-${Date.now()}`, category: 'technical', skills: '' }],
            );

            setCertifications(
              defaultResume.certifications_data.length > 0
                ? defaultResume.certifications_data.map((cert, i) => ({ ...cert, id: `cert-${i}` }))
                : [{ id: `new-${Date.now()}`, certification: '', year: '' }],
            );

            setProjects(
              defaultResume.projects_data.length > 0
                ? defaultResume.projects_data.map((proj, i) => ({ ...proj, id: `proj-${i}` }))
                : [{ id: `new-${Date.now()}`, project_name: '', description: '', url: '' }],
            );

            setLanguages(
              defaultResume.languages_data.length > 0
                ? defaultResume.languages_data.map((lang, i) => ({ ...lang, id: `lang-${i}` }))
                : [{ id: `new-${Date.now()}`, language: '', proficiency: 'native' }],
            );

            setAchievements(
              defaultResume.achievements_data.length > 0
                ? defaultResume.achievements_data.map((desc, i) => ({
                    id: `ach-${i}`,
                    description: desc,
                  }))
                : [{ id: `new-${Date.now()}`, description: '' }],
            );
          }
        } else if (response.status === 404) {
          toast({
            title: 'No Resume Found',
            description: 'Create your new resume below.',
          });
        } else {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Failed to fetch resume.');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsFetching(false);
      }
    };
    fetchResume();
  }, [router, toast]);

  const handleDynamicChange = <
    T extends { id?: string | number },
    K extends keyof Omit<T, 'id'>
  >(
    setState: React.Dispatch<React.SetStateAction<T[]>>,
    id: string | number,
    field: K,
    value: T[K],
  ) => {
    setState(prev => prev.map(item => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const addDynamicEntry = <T extends { id?: string | number }>(
    setState: React.Dispatch<React.SetStateAction<T[]>>,
    newEntry: T,
  ) => {
    setState(prev => [...prev, newEntry]);
  };

  const removeDynamicEntry = <T extends { id?: string | number }>(
    setState: React.Dispatch<React.SetStateAction<T[]>>,
    id?: string | number,
  ) => {
    if (!id) return;
    setState(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveResume = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (!accessToken) {
      toast({
        title: 'Authentication Error',
        description: 'You are not logged in.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    const skills_data = skills.reduce((acc, curr) => {
      const skillsList = curr.skills
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
      if (curr.category && skillsList.length > 0) {
        acc[curr.category] = skillsList;
      }
      return acc;
    }, {} as { [key: string]: string[] });

    const payload = {
      title,
      is_default: isDefault,
      is_active: isActive,
      experience_level: experienceLevel,
      total_experience_years: Number(totalExperienceYears) || 0,
      total_experience_months: Number(totalExperienceMonths) || 0,
      current_company: currentCompany,
      current_designation: currentDesignation,
      current_salary: Number(currentSalary) || 0,
      notice_period: noticePeriod,
      education_data: education
        .map(({ id, ...rest }) => rest)
        .filter(e => e.degree && e.institution),
      work_experience_data: workExperience
        .map(({ id, responsibilities, ...rest }) => ({
          ...rest,
          responsibilities: responsibilities.split('\n').filter(Boolean),
        }))
        .filter(e => e.company && e.job_title),
      skills_data,
      certifications_data: certifications
        .map(({ id, ...rest }) => ({ ...rest, year: Number(rest.year) || null }))
        .filter(c => c.certification),
      projects_data: projects.map(({ id, ...rest }) => rest).filter(p => p.project_name),
      languages_data: languages
        .map(({ id, ...rest }) => rest)
        .filter(l => l.language && l.proficiency),
      achievements_data: achievements.map(a => a.description).filter(Boolean),
      keywords: keywords
        .split(',')
        .map(k => k.trim())
        .filter(Boolean),
    };

    const url = resumeId
      ? `https://backend.hyresense.com/api/v1/jobseeker/resumes/${resumeId}/`
      : 'https://backend.hyresense.com/api/v1/jobseeker/resumes/';

    const method = resumeId ? 'PATCH' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = Object.entries(errorData)
          .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
          .join('; ');
        throw new Error(errorMessage || 'Failed to save resume. Please check your inputs.');
      }

      toast({
        title: 'Success!',
        description: 'Your resume has been saved successfully.',
      });
      router.push('/profile');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-animated">
        <Loader2 className="h-16 w-16 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-animated p-4 overflow-hidden">
      <div className="absolute inset-0 opacity-20 dark:opacity-15" />

      <div
        ref={contentRef}
        className={cn(
          'w-full max-w-4xl z-10 py-12 opacity-0 translate-y-10 transition-all duration-1000 ease-out',
          isContentVisible && 'opacity-100 translate-y-0',
        )}
      >
        <form onSubmit={handleSaveResume} className="w-full">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground">
                {resumeId ? 'Edit Your Resume' : 'Create Your Resume'}
              </h1>
              <p className="text-muted-foreground mt-1">
                This information will be visible to potential employers.
              </p>
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-11 text-base font-semibold group bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Save Resume
                </>
              )}
            </Button>
          </header>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Resume Details */}
          <SectionWrapper title="Resume Details" icon={<FileText className="h-6 w-6" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Resume Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Senior Developer Resume"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-6 pt-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_default"
                    checked={isDefault}
                    onCheckedChange={checked => setIsDefault(Boolean(checked))}
                  />
                  <Label htmlFor="is_default">Set as default resume</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_active"
                    checked={isActive}
                    onCheckedChange={checked => setIsActive(Boolean(checked))}
                  />
                  <Label htmlFor="is_active">Set as active</Label>
                </div>
              </div>
            </div>
          </SectionWrapper>

          {/* Current Status */}
          <SectionWrapper title="Current Status" icon={<Briefcase className="h-6 w-6" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Experience Level</Label>
                <Select onValueChange={setExperienceLevel} value={experienceLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fresher">Fresher (0-1 years)</SelectItem>
                    <SelectItem value="junior">Junior (1-3 years)</SelectItem>
                    <SelectItem value="mid_level">Mid-level (3-5 years)</SelectItem>
                    <SelectItem value="senior">Senior (5-8 years)</SelectItem>
                    <SelectItem value="lead">Lead/Principal (8+ years)</SelectItem>
                    <SelectItem value="executive">Executive/Director (10+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="totalExperienceYears">Total Experience (Years)</Label>
                  <Input
                    id="totalExperienceYears"
                    type="number"
                    placeholder="e.g., 5"
                    value={totalExperienceYears}
                    onChange={e => setTotalExperienceYears(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="totalExperienceMonths">Months</Label>
                  <Input
                    id="totalExperienceMonths"
                    type="number"
                    placeholder="e.g., 6"
                    value={totalExperienceMonths}
                    onChange={e => setTotalExperienceMonths(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currentCompany">Current Company</Label>
                <Input
                  id="currentCompany"
                  placeholder="e.g., Tech Corp"
                  value={currentCompany}
                  onChange={e => setCurrentCompany(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="currentDesignation">Current Designation</Label>
                <Input
                  id="currentDesignation"
                  placeholder="e.g., Senior Developer"
                  value={currentDesignation}
                  onChange={e => setCurrentDesignation(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currentSalary">Current Annual Salary (INR)</Label>
                <Input
                  id="currentSalary"
                  type="number"
                  placeholder="e.g., 1200000"
                  value={currentSalary}
                  onChange={e => setCurrentSalary(e.target.value)}
                />
              </div>
              <div>
                <Label>Notice Period</Label>
                <Select onValueChange={setNoticePeriod} value={noticePeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select notice period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="15_days">15 Days</SelectItem>
                    <SelectItem value="1_month">1 Month</SelectItem>
                    <SelectItem value="2_months">2 Months</SelectItem>
                    <SelectItem value="3_months">3+ Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </SectionWrapper>

          {/* Education */}
          <SectionWrapper
            title="Education"
            icon={<BookOpen className="h-6 w-6" />}
            onAdd={() =>
              addDynamicEntry(setEducation, {
                id: `new-${Date.now()}`,
                degree: '',
                institution: '',
                cgpa: '',
              })
            }
          >
            {education.map(edu => (
              <div
                key={edu.id}
                className="space-y-4 border-b border-border/30 pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0"
              >
                {education.length > 1 && (
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive/70 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => removeDynamicEntry(setEducation, edu.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Degree</Label>
                    <Input
                      placeholder="e.g., B.Tech"
                      value={edu.degree}
                      onChange={e =>
                        handleDynamicChange(setEducation, edu.id!, 'degree', e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Institution</Label>
                    <Input
                      placeholder="e.g., IIT Delhi"
                      value={edu.institution}
                      onChange={e =>
                        handleDynamicChange(setEducation, edu.id!, 'institution', e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="text"
                      placeholder="e.g., 2014-08"
                      value={edu.start_date || ''}
                      onChange={e =>
                        handleDynamicChange(setEducation, edu.id!, 'start_date', e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="text"
                      placeholder="e.g., 2018-05"
                      value={edu.end_date || ''}
                      onChange={e =>
                        handleDynamicChange(setEducation, edu.id!, 'end_date', e.target.value)
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label>Grade / CGPA</Label>
                  <Input
                    placeholder="e.g., 8.5 CGPA"
                    value={edu.cgpa || ''}
                    onChange={e =>
                      handleDynamicChange(setEducation, edu.id!, 'cgpa', e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </SectionWrapper>

          {/* Work Experience */}
          <SectionWrapper
            title="Work Experience"
            icon={<Briefcase className="h-6 w-6" />}
            onAdd={() =>
              addDynamicEntry(setWorkExperience, {
                id: `new-${Date.now()}`,
                company: '',
                job_title: '',
                start_date: '',
                end_date: '',
                responsibilities: '',
              })
            }
          >
            {workExperience.map(exp => (
              <div
                key={exp.id}
                className="space-y-4 border-b border-border/30 pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0"
              >
                {workExperience.length > 1 && (
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive/70 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => removeDynamicEntry(setWorkExperience, exp.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Company</Label>
                    <Input
                      placeholder="e.g., Tech Corp"
                      value={exp.company}
                      onChange={e =>
                        handleDynamicChange(setWorkExperience, exp.id!, 'company', e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Job Title</Label>
                    <Input
                      placeholder="e.g., Senior Developer"
                      value={exp.job_title}
                      onChange={e =>
                        handleDynamicChange(
                          setWorkExperience,
                          exp.id!,
                          'job_title',
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    placeholder="e.g., Bangalore"
                    value={exp.location || ''}
                    onChange={e =>
                      handleDynamicChange(setWorkExperience, exp.id!, 'location', e.target.value)
                    }
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="text"
                      placeholder="e.g., 2021-01"
                      value={exp.start_date}
                      onChange={e =>
                        handleDynamicChange(
                          setWorkExperience,
                          exp.id!,
                          'start_date',
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>End Date (leave blank or 'Present')</Label>
                    <Input
                      type="text"
                      placeholder="e.g., 2022-12"
                      value={exp.end_date ?? ''}
                      onChange={e =>
                        handleDynamicChange(setWorkExperience, exp.id!, 'end_date', e.target.value)
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label>Responsibilities (one per line)</Label>
                  <Textarea
                    placeholder="Describe your responsibilities and achievements..."
                    value={exp.responsibilities}
                    onChange={e =>
                      handleDynamicChange(
                        setWorkExperience,
                        exp.id!,
                        'responsibilities',
                        e.target.value,
                      )
                    }
                    rows={4}
                  />
                </div>
              </div>
            ))}
          </SectionWrapper>

          {/* Skills */}
          <SectionWrapper
            title="Skills"
            icon={<Award className="h-6 w-6" />}
            onAdd={() =>
              addDynamicEntry(setSkills, {
                id: `new-${Date.now()}`,
                category: '',
                skills: '',
              })
            }
          >
            {skills.map(skill => (
              <div
                key={skill.id}
                className="space-y-4 border-b border-border/30 pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0"
              >
                {skills.length > 1 && (
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive/70 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => removeDynamicEntry(setSkills, skill.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <Input
                      placeholder="e.g., technical"
                      value={skill.category}
                      onChange={e =>
                        handleDynamicChange(setSkills, skill.id!, 'category', e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Skills (comma-separated)</Label>
                    <Input
                      placeholder="e.g., Python, Django"
                      value={skill.skills}
                      onChange={e =>
                        handleDynamicChange(setSkills, skill.id!, 'skills', e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </SectionWrapper>

          {/* Certifications */}
          <SectionWrapper
            title="Certifications"
            icon={<Award className="h-6 w-6" />}
            onAdd={() =>
              addDynamicEntry(setCertifications, {
                id: `new-${Date.now()}`,
                certification: '',
                year: '',
              })
            }
          >
            {certifications.map(cert => (
              <div
                key={cert.id}
                className="space-y-4 border-b border-border/30 pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0"
              >
                {certifications.length > 1 && (
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive/70 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => removeDynamicEntry(setCertifications, cert.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Certification Name</Label>
                    <Input
                      placeholder="e.g., AWS Certified Developer"
                      value={cert.certification}
                      onChange={e =>
                        handleDynamicChange(
                          setCertifications,
                          cert.id!,
                          'certification',
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>Year</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 2022"
                      value={cert.year}
                      onChange={e =>
                        handleDynamicChange(setCertifications, cert.id!, 'year', e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </SectionWrapper>

          {/* Projects */}
          <SectionWrapper
            title="Projects"
            icon={<FileText className="h-6 w-6" />}
            onAdd={() =>
              addDynamicEntry(setProjects, {
                id: `new-${Date.now()}`,
                project_name: '',
                description: '',
                url: '',
              })
            }
          >
            {projects.map(proj => (
              <div
                key={proj.id}
                className="space-y-4 border-b border-border/30 pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0"
              >
                {projects.length > 1 && (
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive/70 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => removeDynamicEntry(setProjects, proj.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <div>
                  <Label>Project Name</Label>
                  <Input
                    placeholder="e.g., Job Portal"
                    value={proj.project_name}
                    onChange={e =>
                      handleDynamicChange(setProjects, proj.id!, 'project_name', e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Project URL</Label>
                  <Input
                    type="url"
                    placeholder="https://github.com/..."
                    value={proj.url || ''}
                    onChange={e =>
                      handleDynamicChange(setProjects, proj.id!, 'url', e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe the project..."
                    value={proj.description}
                    onChange={e =>
                      handleDynamicChange(setProjects, proj.id!, 'description', e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </SectionWrapper>

          {/* Languages */}
          <SectionWrapper
            title="Languages"
            icon={<Languages className="h-6 w-6" />}
            onAdd={() =>
              addDynamicEntry(setLanguages, {
                id: `new-${Date.now()}`,
                language: '',
                proficiency: 'native',
              })
            }
          >
            {languages.map(lang => (
              <div
                key={lang.id}
                className="space-y-4 border-b border-border/30 pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0"
              >
                {languages.length > 1 && (
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive/70 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => removeDynamicEntry(setLanguages, lang.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Language</Label>
                    <Input
                      placeholder="e.g., English"
                      value={lang.language}
                      onChange={e =>
                        handleDynamicChange(setLanguages, lang.id!, 'language', e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Proficiency</Label>
                    <Select
                      onValueChange={value =>
                        handleDynamicChange(setLanguages, lang.id!, 'proficiency', value)
                      }
                      value={lang.proficiency}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select proficiency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="fluent">Fluent</SelectItem>
                        <SelectItem value="native">Native</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </SectionWrapper>

          {/* Achievements */}
          <SectionWrapper
            title="Achievements"
            icon={<Award className="h-6 w-6" />}
            onAdd={() =>
              addDynamicEntry(setAchievements, {
                id: `new-${Date.now()}`,
                description: '',
              })
            }
          >
            {achievements.map(achieve => (
              <div
                key={achieve.id}
                className="space-y-4 border-b border-border/30 pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0"
              >
                {achievements.length > 1 && (
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive/70 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => removeDynamicEntry(setAchievements, achieve.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <div>
                  <Label>Achievement</Label>
                  <Input
                    placeholder="e.g., Employee of the Month"
                    value={achieve.description}
                    onChange={e =>
                      handleDynamicChange(
                        setAchievements,
                        achieve.id!,
                        'description',
                        e.target.value,
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </SectionWrapper>

          {/* Keywords */}
          <SectionWrapper title="Keywords" icon={<Sparkles className="h-6 w-6" />}>
            <div>
              <Label htmlFor="keywords">Keywords (comma-separated)</Label>
              <Input
                id="keywords"
                placeholder="e.g., Python, Django, Full Stack"
                value={keywords}
                onChange={e => setKeywords(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Help employers find you by listing relevant keywords.
              </p>
            </div>
          </SectionWrapper>
        </form>
      </div>

      <style jsx global>{`
        @keyframes pulse_slow_bg {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .bg-gradient-animated {
          background: linear-gradient(
            -45deg,
            hsl(var(--background)) 30%,
            hsl(var(--primary) / 0.05) 50%,
            hsl(var(--accent) / 0.05) 70%,
            hsl(var(--background)) 90%
          );
          background-size: 400% 400%;
          animation: pulse_slow_bg 15s ease infinite;
        }
      `}</style>
    </div>
  );
}
