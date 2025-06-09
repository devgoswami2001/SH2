
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart2, Filter, Sparkles, Target } from 'lucide-react'; // Added Target, removed Users
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: "Quantum-Leap Hiring AI",
    description: "Our AI doesn't just sift; it discerns. Unearth ideal candidates with predictive accuracy, aligning skills, experience, and your unique company DNA.",
    visual: (
      <div className="mt-6 p-3 bg-foreground/5 dark:bg-foreground/10 border border-primary/20 rounded-lg text-left transition-shadow duration-300 hover:shadow-md hover:shadow-accent/20">
        <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap">
          <span className="text-primary/80 block mb-1">&gt; HYRE_AI_MATCH_</span>
          <span className="text-foreground/90">Candidate: <strong>Alex Chen</strong></span>
          <span className="text-foreground/90 block">Score: <strong className="text-accent font-semibold">94.7%</strong> (Cultural & Skill Synergy)</span>
        </pre>
      </div>
    )
  },
  {
    icon: <Target className="h-8 w-8 text-primary" />, // Changed from BarChart2 to Target for "Precision Analytics"
    title: "Precision Talent Blueprint",
    description: "Navigate the talent-scape with hyper-accurate analytics. Visualize candidate fit, forecast team dynamics, and architect your workforce with strategic foresight.",
    visual: <Image src="https://placehold.co/300x180.png" alt="Futuristic Analytics Dashboard" width={300} height={180} data-ai-hint="futuristic analytics" className="rounded-lg shadow-xl mx-auto mt-6 border-2 border-primary/30" />
  },
  {
    icon: <Filter className="h-8 w-8 text-primary" />,
    title: "Hyper-Intuitive Candidate Filters",
    description: "Define your ideal. Our intelligent filters and AI-calibrated scores let you sculpt candidate pools with unparalleled precision and speed.",
     visual: (
      <div className="mt-6 p-3 bg-foreground/5 dark:bg-foreground/10 border border-primary/20 rounded-lg text-left transition-shadow duration-300 hover:shadow-md hover:shadow-accent/20">
        <p className="text-xs font-mono text-muted-foreground">
          <span className="text-primary/80 block mb-1">&gt; FILTER_ACTIVE_</span>
          <span className="text-foreground/90">Profile Type: <strong>Innovator</strong></span>
          <span className="text-foreground/90 block">Key Attributes: <strong className="text-accent">Adaptability, Strategic Vision</strong></span>
           <span className="text-foreground/90 block">Experience Tier: <strong className="text-accent">Lead+</strong></span>
        </p>
      </div>
    )
  }
];

export function EmployersSection() {
  const [sectionRef, isSectionVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.05, triggerOnce: true });
  const [titleRef, isTitleVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.1, triggerOnce: true });
  const [subtitleRef, isSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.1, triggerOnce: true });
  
  return (
    <section 
      id="employers" 
      ref={sectionRef}
      className="py-16 sm:py-24 bg-secondary/30 dark:bg-slate-800/50 overflow-hidden" // Added overflow-hidden
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
            For Visionary Builders
          </h2>
          <p 
            ref={subtitleRef}
            className={cn(
              "mt-2 text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isSubtitleVisible && "opacity-100 translate-y-0 delay-200"
            )}
            style={{ transitionDelay: isSubtitleVisible ? '200ms' : '0ms' }}
          >
            Assemble Your Dream Team, <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Smarter & Faster</span>
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
                  "hover:scale-[1.04] hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/40 hover:ring-2 hover:ring-primary/80" // Enhanced hover effect
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
