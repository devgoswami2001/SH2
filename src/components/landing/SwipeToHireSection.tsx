
'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw, Search, Sparkles, Send, Briefcase, CalendarDays, Workflow } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';

const initialJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Innovatech Solutions Ltd.",
    location: "New York, NY (Hybrid)",
    description: "Join our dynamic team to build next-gen web applications using React, Next.js, and TypeScript. Lead frontend projects and mentor junior developers.",
    matchPercentage: 92,
    image: "https://placehold.co/400x250.png",
    dataAiHint: "software development team",
    skills: ["React", "Next.js", "TypeScript", "Agile"],
    experienceLevel: "Senior Level",
    jobType: "Full-Time",
    postedDate: "3 days ago",
  },
  {
    id: 2,
    title: "Digital Marketing Manager",
    company: "ConnectSphere Inc.",
    location: "San Francisco, CA (Remote)",
    description: "Develop and execute innovative digital marketing campaigns across SEO, SEM, and social media. Analyze performance and optimize for ROI.",
    matchPercentage: 88,
    image: "https://placehold.co/400x250.png",
    dataAiHint: "marketing analytics",
    skills: ["SEO", "SEM", "Social Media Marketing", "Google Analytics"],
    experienceLevel: "Manager",
    jobType: "Full-Time",
    postedDate: "1 week ago",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "PixelPerfect Studios",
    location: "Austin, TX (On-site)",
    description: "Craft intuitive and visually appealing user interfaces for mobile and web applications. Conduct user research and create wireframes and prototypes.",
    matchPercentage: 95,
    image: "https://placehold.co/400x250.png",
    dataAiHint: "ui design wireframe",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    experienceLevel: "Mid-Senior Level",
    jobType: "Full-Time",
    postedDate: "5 days ago",
  },
  {
    id: 4,
    title: "Customer Success Manager",
    company: "SupportFirst Co.",
    location: "Chicago, IL (Hybrid)",
    description: "Build strong relationships with key clients, ensuring their success and satisfaction with our SaaS platform. Drive adoption and identify upsell opportunities.",
    matchPercentage: 90,
    image: "https://placehold.co/400x250.png",
    dataAiHint: "customer support meeting",
    skills: ["Client Relations", "SaaS", "Problem Solving", "Communication"],
    experienceLevel: "Manager",
    jobType: "Full-Time",
    postedDate: "2 days ago",
  },
];

const features = [
  {
    icon: <Search className="h-7 w-7 text-primary" />,
    text: "AI-Powered Discovery: Let our AI chart your course to roles perfectly aligned with your skills and aspirations.",
  },
  {
    icon: <Sparkles className="h-7 w-7 text-primary" />,
    text: "Engaging Job Hunt: Swipe through a universe of opportunities, transforming your search into an exciting journey.",
  },
  {
    icon: <Send className="h-7 w-7 text-primary" />,
    text: "Instant Applications: Apply from anywhere, on any device, with a single tap. Your next career move is closer than you think.",
  },
];

export function SwipeToHireSection() {
  const [sectionRef, isSectionVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2, triggerOnce: true });
  const [titleRef, isTitleVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2, triggerOnce: true });
  const [subtitleRef, isSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2, triggerOnce: true });
  const [featuresRef, areFeaturesVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });
  const [interactiveAreaRef, isInteractiveAreaVisible] = useScrollAnimation<HTMLDivElement>({threshold: 0.1, triggerOnce: true });

  const [jobs, setJobs] = useState(initialJobs);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [feedback, setFeedback] = useState<'Applied' | 'Rejected' | null>(null);
  const [cardKey, setCardKey] = useState(0);

  const currentJob = jobs[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    setFeedback(direction === 'right' ? 'Applied' : 'Rejected');

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % jobs.length);
      setSwipeDirection(null);
      setFeedback(null);
      setCardKey(prevKey => prevKey + 1);
    }, 500); 
  };

  const cardAnimationClasses = () => {
    if (swipeDirection === 'right') {
      return 'animate-swipe-right';
    }
    if (swipeDirection === 'left') {
      return 'animate-swipe-left';
    }
    return 'animate-card-enter';
  };
  
  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-24 bg-background"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16 items-center">
          <div 
            ref={interactiveAreaRef}
            className={cn(
              "relative w-full max-w-md mx-auto h-[650px] md:h-[700px] flex flex-col items-center justify-center opacity-0 translate-y-10 transition-all duration-700 ease-out", 
              isInteractiveAreaVisible && "opacity-100 translate-y-0 delay-300"
            )}
            style={{ transitionDelay: isInteractiveAreaVisible ? '300ms' : '0ms' }}
          >
            {currentJob && (
              <div key={cardKey} className={cn("absolute w-full group/card", cardAnimationClasses())}>
                <Card className={cn(
                  "bg-gradient-to-br from-card/70 via-card/60 to-card/70 backdrop-blur-lg",
                  "rounded-2xl overflow-hidden w-full max-w-sm mx-auto",
                  "border border-primary/40",
                  "shadow-[0_0_15px_0px_hsl(var(--primary)/0.2),_0_0_25px_0px_hsl(var(--accent)/0.15)]",
                  "hover:shadow-[0_0_20px_3px_hsl(var(--primary)/0.3),_0_0_40px_3px_hsl(var(--accent)/0.25)]",
                  "transition-all duration-300 ease-out"
                )}>
                  <CardHeader className="p-0 relative">
                    <Image 
                      src={currentJob.image} 
                      alt={currentJob.title} 
                      width={400} 
                      height={220} 
                      data-ai-hint={currentJob.dataAiHint}
                      className="object-cover w-full h-52 sm:h-56 group-hover/card:scale-105 transition-transform duration-300 ease-out"
                    />
                    <div className={cn(
                      "absolute bottom-3 left-3 bg-primary/70 backdrop-blur-md text-primary-foreground",
                      "text-xs font-mono font-bold px-3 py-1.5 rounded-md shadow-lg border border-primary-foreground/50"
                    )}>
                      {currentJob.matchPercentage}% Match
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-5 space-y-2.5">
                    <CardTitle className="text-xl sm:text-2xl font-bold text-foreground line-clamp-2">{currentJob.title}</CardTitle>
                    <div className="text-xs sm:text-sm">
                      <span className="font-medium text-primary">{currentJob.company}</span>
                      <span className="text-muted-foreground"> - {currentJob.location}</span>
                    </div>

                    <div className="pt-1 space-y-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5 text-primary/80" />
                        <span>{currentJob.jobType} &middot; {currentJob.experienceLevel}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5 text-primary/80" />
                        <span>Posted: {currentJob.postedDate}</span>
                      </div>
                    </div>
                    
                    <Separator className="my-2.5 border-primary/30" />

                    {currentJob.skills && currentJob.skills.length > 0 && (
                      <div className="pb-1">
                        <h4 className="text-xs font-semibold text-primary mb-1.5">Key Skills:</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {currentJob.skills.slice(0, 4).map((skill, index) => ( 
                            <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5 bg-primary/10 text-primary/90 border-primary/30 hover:bg-primary/20">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground line-clamp-2 h-8 sm:h-8">
                        {currentJob.description}
                    </p>
                  </CardContent>
                  <CardFooter className="p-3 sm:p-4 flex justify-around border-t border-primary/30 bg-transparent">
                    <Button 
                      variant="ghost" 
                      size="lg" 
                      className="text-destructive hover:bg-destructive/15 dark:hover:bg-destructive/25 hover:shadow-[0_0_12px_2px_hsl(var(--destructive)/0.4)] font-semibold w-full mr-1.5 transition-all duration-200 ease-out transform hover:scale-[1.03] rounded-lg p-2.5 flex items-center justify-center gap-1.5 text-sm"
                      onClick={() => handleSwipe('left')}
                    >
                      <XCircle className="mr-1 h-4 w-4 sm:h-5 sm:w-5" /> Decline
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="lg" 
                      className="text-primary hover:bg-primary/15 dark:hover:bg-primary/25 hover:shadow-[0_0_12px_2px_hsl(var(--primary)/0.4)] font-semibold w-full ml-1.5 transition-all duration-200 ease-out transform hover:scale-[1.03] rounded-lg p-2.5 flex items-center justify-center gap-1.5 text-sm"
                      onClick={() => handleSwipe('right')}
                    >
                      <CheckCircle className="mr-1 h-4 w-4 sm:h-5 sm:w-5" /> Apply
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
            {feedback && (
              <div className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out animate-feedback-fade z-10",
                feedback === 'Applied' ? 'text-green-500' : 'text-red-500'
              )}>
                <p className="text-5xl sm:text-6xl font-extrabold p-4 bg-background/80 rounded-xl shadow-2xl">
                  {feedback === 'Applied' ? 'Applied!' : 'Declined'}
                </p>
              </div>
            )}
            {!currentJob && (
              <div className="text-center text-muted-foreground">
                <p className="text-lg mb-4">No more jobs on this frequency for now!</p>
                <Button onClick={() => { setCurrentIndex(0); setCardKey(k => k + 1); }} variant="outline" className="hover:bg-primary/10">
                  <RotateCcw className="mr-2 h-4 w-4" /> Rescan for Jobs
                </Button>
              </div>
            )}
          </div>

          <div className="md:order-first">
            <h2 
              ref={titleRef}
              className={cn(
                "text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight mb-6 opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isTitleVisible && "opacity-100 translate-y-0"
              )}
            >
              Swipe Your Way to <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Your Next Role</span>
            </h2>
            <p 
              ref={subtitleRef}
              className={cn(
                "text-lg text-muted-foreground mb-8 opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isSubtitleVisible && "opacity-100 translate-y-0 delay-150"
              )}
              style={{ transitionDelay: isSubtitleVisible ? '150ms' : '0ms' }}
            >
              Job hunting, reimagined. HyreSense transforms your job search into an exhilarating experience. Swipe through a personalized stream of opportunities, discover roles that ignite your passion, and apply with a simple, satisfying gesture.
            </p>
            <div 
              ref={featuresRef}
              className={cn(
                "space-y-4 opacity-0 translate-y-10 transition-all duration-700 ease-out",
                 areFeaturesVisible && "opacity-100 translate-y-0 delay-300"
              )}
              style={{ transitionDelay: areFeaturesVisible ? '300ms' : '0ms' }}
            >
              {features.map((feature, index) => {
                const [featureItemRef, isFeatureItemVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });
                return (
                  <div 
                    key={index}
                    ref={featureItemRef}
                    className={cn(
                      "flex items-start gap-3 p-4 bg-card/70 backdrop-blur-sm rounded-lg shadow-lg border border-border/30 opacity-0 translate-y-5 transition-all duration-500 ease-out",
                      isFeatureItemVisible && "opacity-100 translate-y-0 hover:shadow-primary/20 hover:scale-[1.02]"
                    )}
                    style={{ transitionDelay: isFeatureItemVisible ? `${index * 100 + 300}ms` : '0ms' }}
                  >
                    <span className="flex-shrink-0 mt-1 p-2 bg-primary/10 rounded-full text-primary">{feature.icon}</span>
                    <p className="text-foreground pt-1">{feature.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

