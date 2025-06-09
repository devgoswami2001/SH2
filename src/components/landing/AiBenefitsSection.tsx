
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, BarChart3, Target, UsersRound } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const benefits = [
  {
    icon: <Brain className="h-8 w-8 text-accent" />, // Adjusted icon size for new container
    title: "Precision Matchmaking",
    description: "Our AI doesn't just suggest; it anticipates. Uncover perfect-fit candidates and roles with uncanny accuracy."
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-accent" />, // Adjusted icon size
    title: "Market Pulse, Live",
    description: "Navigate the talent landscape with real-time, actionable intelligence. Make data-driven decisions, instantly."
  },
  {
    icon: <Target className="h-8 w-8 text-accent" />, // Adjusted icon size
    title: "Unlock Your Potential",
    description: "Pinpoint skill gaps and receive AI-guided paths to mastery, empowering your career journey or talent development."
  },
  {
    icon: <UsersRound className="h-8 w-8 text-accent" />, // Adjusted icon size
    title: "Hire Tomorrow's Stars",
    description: "Our AI foresees talent needs and uncovers high-potential candidates, giving you a competitive edge in securing top performers."
  }
];

export function AiBenefitsSection() {
  const [sectionRef, isSectionVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2, triggerOnce: true });
  const [titleRef, isTitleVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2, triggerOnce: true });
  const [subtitleRef, isSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2, triggerOnce: true });

  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="py-16 sm:py-24 bg-background"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            ref={titleRef}
            className={cn(
              "text-base font-semibold text-primary tracking-wide uppercase opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isTitleVisible && "opacity-100 translate-y-0"
            )}
          >
            The HyreSence Edge
          </h2>
          <p 
            ref={subtitleRef}
            className={cn(
              "mt-2 text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isSubtitleVisible && "opacity-100 translate-y-0 delay-200"
            )}
            style={{ transitionDelay: isSubtitleVisible ? '200ms' : '0ms' }}
          >
            Experience Recruitment, Reimagined by AI
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const [cardRef, isCardVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });
            return (
              <div
                key={benefit.title}
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
                      "p-3 rounded-xl bg-accent/10 inline-block ring-2 ring-accent/30 mb-3 transition-all duration-300",
                      "group-hover/card:scale-110 group-hover/card:shadow-md group-hover/card:shadow-accent/25 group-hover/card:ring-accent/50"
                    )}>
                      {benefit.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-xl mb-2">{benefit.title}</CardTitle>
                    <p className="text-muted-foreground">{benefit.description}</p>
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
