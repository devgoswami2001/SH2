
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Smartphone, Lightbulb, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <Smartphone className="h-7 w-7 text-primary" />,
    title: "Intuitive Swipe-Apply",
    description: "Glide through opportunities. Our sleek swipe interface makes job hunting effortless and engaging, not a chore.",
    visual: (
      <div className="mt-6 w-32 mx-auto group">
        <Image 
          src="https://placehold.co/150x300.png" 
          alt="Swipe interface mockup" 
          width={120} 
          height={240} 
          data-ai-hint="futuristic interface" // Updated data-ai-hint
          className="rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105 border-2 border-primary/30" 
        />
      </div>
    )
  },
  {
    icon: <Lightbulb className="h-7 w-7 text-primary" />,
    title: "AI Co-Pilot for Skills",
    description: "Unlock your potential. Our AI analyzes your profile, revealing hidden skill gaps and charting your course to mastery.",
    visual: (
      <div className="mt-6 p-3 bg-foreground/5 dark:bg-foreground/10 border border-primary/20 rounded-lg text-left transition-shadow duration-300 hover:shadow-md hover:shadow-accent/20"> {/* Added hover shadow */}
        <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap">
          <span className="text-primary/80 block mb-1">&gt; AI INSIGHT_</span>
          <span className="text-foreground/90">Consider mastering </span>
          <strong className="text-accent font-semibold">Quantum Algorithms</strong>
          <span className="text-foreground/90"> to enhance your profile for Advanced Research roles.</span>
        </pre>
      </div>
    )
  },
  {
    icon: <TrendingUp className="h-7 w-7 text-primary" />,
    title: "Profile Power Meter",
    description: "Visualize your career trajectory. Our dynamic tracker shows your profile's impact, guiding you to full potential.",
    visual: (
      <div className="mt-6 space-y-3">
        <div className="flex justify-between text-sm font-medium text-muted-foreground">
          <span>Profile Impact Score</span>
          <span className="text-primary font-bold">85%</span>
        </div>
        <Progress value={85} aria-label="Profile Impact Score 85%" className="h-3 bg-primary/20 [&>div]:bg-gradient-to-r [&>div]:from-accent [&>div]:to-primary" />
         <p className="text-xs text-muted-foreground text-center mt-1">Next Milestone: Amplify 'Projects' for peak visibility!</p>
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
            For Future Shapers
          </h2>
          <p 
            ref={subtitleRef}
            className={cn(
              "mt-2 text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isSubtitleVisible && "opacity-100 translate-y-0 delay-200"
            )}
            style={{ transitionDelay: isSubtitleVisible ? '200ms' : '0ms' }}
          >
            Architect Your Ascent, Intelligently
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
