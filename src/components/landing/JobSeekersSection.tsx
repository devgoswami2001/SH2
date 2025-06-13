
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Smartphone, Lightbulb, TrendingUp, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <Smartphone className="h-7 w-7 text-primary" />,
    title: "Easy Job Swiping",
    description: "Effortlessly browse job recommendations tailored to you. Our AI makes your job search intuitive and engaging.",
    visual: (
      <div className="mt-6 w-40 mx-auto group text-center">
        <Image 
          src="https://placehold.co/150x300.png" 
          alt="Swipe interface mockup" 
          width={130} 
          height={260} 
          data-ai-hint="job search interface"
          className="rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105 border-2 border-primary/40 inline-block" 
        />
        <p className="font-mono text-xs text-accent mt-3 animate-pulse">
          AI Matching Your Profile...
        </p>
      </div>
    )
  },
  {
    icon: <Lightbulb className="h-7 w-7 text-primary" />,
    title: "AI Skill Suggestions",
    description: "Get personalized advice from our AI. It analyzes your profile, identifies skills you can learn to advance, and suggests relevant resources.",
    visual: (
      <div className="mt-4 p-3 bg-foreground/5 dark:bg-foreground/10 border border-primary/30 rounded-lg text-left transition-shadow duration-300 hover:shadow-md hover:shadow-accent/20">
        <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap leading-relaxed">
          <span className="text-primary/80 block">&gt; HyreSense AI Analyzer</span>
          <span className="text-foreground/90 block">> Analyzing profile for: UI/UX Designer</span>
          <span className="text-foreground/90 block">> Identified Gap: <span className="text-green-400">Advanced Prototyping</span></span>
          <span className="text-foreground/90 text-sky-400 block">> Suggestion: Learn Figma for interactive designs.</span>
          <span className="text-foreground/70 text-xs block">> Resource: <span className="underline">Figma Masterclass on Udemy</span></span>
        </pre>
      </div>
    )
  },
  {
    icon: <TrendingUp className="h-7 w-7 text-primary" />,
    title: "Track Profile Strength",
    description: "See how your profile performs. Our tracker helps you understand what makes your profile stand out and gives tips to attract employers.",
    visual: (
      <div className="mt-4 space-y-3">
        <div className="flex justify-between items-baseline text-sm font-medium text-muted-foreground">
          <span>Profile Strength</span>
          <span className="text-2xl text-accent font-bold animate-pulse">85%</span>
        </div>
        <Progress value={85} aria-label="Profile Strength 85%" className="h-3.5 bg-primary/20 [&>div]:bg-gradient-to-r [&>div]:from-accent [&>div]:to-primary" />
        <div className="text-xs text-muted-foreground space-y-1 text-left pt-1">
            <p className="flex items-center"><Sparkles className="h-3.5 w-3.5 text-green-400 mr-1.5" />Views This Week: <strong className="ml-1 text-foreground/90">25</strong></p>
            <p>Tip: <span className="text-sky-400 font-medium">Add recent project details to improve visibility.</span></p>
        </div>
      </div>
    )
  }
];

export function JobSeekersSection() {
  const [sectionRef, isSectionVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.05, triggerOnce: true });
  const [titleRef, isTitleVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.1, triggerOnce: true });
  const [subtitleRef, isSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.1, triggerOnce: true });

  return (
    <section 
      id="job-seekers" 
      ref={sectionRef}
      className="py-16 sm:py-24 bg-background overflow-hidden"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className={cn(
              "text-base font-semibold text-primary tracking-wide uppercase opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isTitleVisible && "opacity-100 translate-y-0"
            )}
          >
            For Ambitious Job Seekers
          </h2>
          <p 
            ref={subtitleRef}
            className={cn(
              "mt-2 text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isSubtitleVisible && "opacity-100 translate-y-0 delay-200"
            )}
            style={{ transitionDelay: isSubtitleVisible ? '200ms' : '0ms' }}
          >
            Land Your Dream Job, <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Smarter & Faster</span>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const [cardRef, isCardVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });
            return (
              <div
                key={feature.title}
                ref={cardRef}
                className={cn(
                  "opacity-0 translate-y-10 transition-all duration-500 ease-out",
                  isCardVisible && "opacity-100 translate-y-0"
                )}
                style={{ transitionDelay: isCardVisible ? `${index * 150}ms` : '0ms' }}
              >
                <Card className={cn(
                  "group/card flex flex-col bg-gradient-to-br from-card/85 via-card/80 to-card/85 backdrop-blur-sm text-center shadow-xl transition-all duration-300 ease-out h-full",
                  "hover:scale-[1.04] hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/40 hover:ring-2 hover:ring-accent/80"
                )}>
                  <CardHeader className="items-center pt-8">
                    <div className={cn(
                      "p-3 rounded-xl bg-primary/10 inline-block ring-2 ring-primary/30 mb-3 transition-all duration-300",
                      "group-hover/card:scale-110 group-hover/card:shadow-md group-hover/card:shadow-primary/25 group-hover/card:ring-primary/50"
                    )}>
                      {feature.icon}
                    </div>
                    <CardTitle className="mt-2 text-xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between px-6 pb-8">
                    <CardDescription className="text-base text-muted-foreground mb-4">{feature.description}</CardDescription>
                    {feature.visual && <div className="mt-auto">{feature.visual}</div>}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
