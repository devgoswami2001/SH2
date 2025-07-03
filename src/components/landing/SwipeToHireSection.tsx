
'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw, Search, Sparkles, Send, Briefcase, CalendarDays } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';

const initialJobs = [
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
      <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16 items-center">
          <div 
            ref={interactiveAreaRef}
            className={cn(
              "relative w-full max-w-md mx-auto h-[650px] md:h-[700px] flex flex-col items-center justify-center opacity-0 translate-y-10 transition-all duration-700 ease-out", 
              isInteractiveAreaVisible && "opacity-100 translate-y-0 delay-300"
            )}
            style={{ transitionDelay: isInteractiveAreaVisible ? '300ms' : '0ms' }}
          >
            {currentJob ? (
              <div key={cardKey} className={cn("absolute w-full group/card", cardAnimationClasses())}>
                <Card className={cn(
                  "bg-gradient-to-br from-card/70 via-card/60 to-card/70 backdrop-blur-lg",
                  "rounded-2xl overflow-hidden w-full max-w-sm mx-auto",
                  "border border-primary/40",
                  "shadow-[0_0_15px_0px_hsl(var(--primary)/0.2),_0_0_25px_0px_hsl(var(--accent)/0.15)]",
                  "hover:shadow-[0_0_20px_3px_hsl(var(--primary)/0.3),_0_0_40px_3px_hsl(var(--accent)/0.25)]",
                  "transition-all duration-300 ease-out"
                )}>
                  <CardContent className="p-4 sm:p-5 space-y-3">
                     <div className="flex justify-between items-start mb-2">
                        <div className="flex items-start gap-3 flex-grow overflow-hidden">
                           <div className="p-1 bg-white rounded-md shadow-sm w-12 h-12 flex items-center justify-center flex-shrink-0">
                             <Image 
                               src={currentJob.image} 
                               alt={`${currentJob.company} logo`}
                               width={40} 
                               height={40} 
                               data-ai-hint={currentJob.dataAiHint}
                               className="object-contain w-full h-full"
                             />
                           </div>
                           <div className="overflow-hidden">
                              <CardTitle className="text-xl sm:text-2xl font-bold text-foreground line-clamp-2 leading-tight">{currentJob.title}</CardTitle>
                              <div className="text-xs sm:text-sm mt-1">
                                <span className="font-medium text-primary">{currentJob.company}</span>
                                <span className="text-muted-foreground"> - {currentJob.location}</span>
                              </div>
                           </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-primary/70 backdrop-blur-md text-primary-foreground text-xs font-mono font-bold px-3 py-1.5 rounded-md shadow-lg border border-primary-foreground/50 whitespace-nowrap ml-2"
                        >
                          {currentJob.matchPercentage}% Match
                        </Badge>
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
                    
                    <p className="text-xs text-muted-foreground line-clamp-3 h-12 sm:h-12">
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
                      <XCircle className="mr-1 h-4 w-4 sm:h-5 sm:w-5" /> Reject
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
            ) : (
              <div className="text-center text-muted-foreground">
                <p className="text-lg mb-4">No more jobs on this frequency for now!</p>
                <Button onClick={() => { setCurrentIndex(0); setJobs(initialJobs); setCardKey(k => k + 1); }} variant="outline" className="hover:bg-primary/10">
                  <RotateCcw className="mr-2 h-4 w-4" /> Rescan for Jobs
                </Button>
              </div>
            )}
            {feedback && (
              <div className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out animate-feedback-fade z-10",
                feedback === 'Applied' ? 'text-green-500' : 'text-red-500'
              )}>
                <p className="text-5xl sm:text-6xl font-extrabold p-4 bg-background/80 rounded-xl shadow-2xl">
                  {feedback === 'Applied' ? 'Applied!' : 'Rejected'}
                </p>
              </div>
            )}
            {!currentJob && jobs.length > 0 && ( // Show this if currentJob is null but jobs array isn't empty (means end of list)
              <div className="text-center text-muted-foreground p-4">
                  <p className="text-lg mb-4">You've reached the end of the job list!</p>
                  <Button onClick={() => { setCurrentIndex(0); setJobs(initialJobs); setCardKey(k => k + 1); }} variant="outline" size="lg" className="hover:bg-primary/10">
                      <RotateCcw className="mr-2 h-5 w-5" /> Restart Feed
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
