
'use client';

import { UserPlus, Copy, BarChartBig, Briefcase } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const steps = [
  {
    icon: <UserPlus className="h-10 w-10 text-primary" />,
    title: "Create Profile",
    description: "Sign up and build your standout profile in minutes. Showcase your skills and experience."
  },
  {
    icon: <Copy className="h-10 w-10 text-primary" />,
    title: "AI Matching",
    description: "Job seekers discover AI-matched opportunities. Employers review AI-matched candidates."
  },
  {
    icon: <BarChartBig className="h-10 w-10 text-primary" />,
    title: "Get Insights",
    description: "Receive AI-powered skill suggestions or hiring analytics to make informed decisions."
  },
  {
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    title: "Apply or Hire",
    description: "Seamlessly move to the application or hiring phase with the best matches."
  }
];

export function HowItWorksSection() {
  const [sectionRef, isSectionVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.1, triggerOnce: true });
  const [titleRef, isTitleVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2, triggerOnce: true });
  const [subtitleRef, isSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2, triggerOnce: true });

  return (
    <section 
      id="how-it-works" 
      ref={sectionRef}
      className="py-16 sm:py-24 bg-secondary/30 dark:bg-slate-800/50"
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
            Simple & Effective
          </h2>
          <p 
            ref={subtitleRef}
            className={cn(
              "mt-2 text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isSubtitleVisible && "opacity-100 translate-y-0 delay-200"
            )}
            style={{ transitionDelay: isSubtitleVisible ? '200ms' : '0ms' }}
          >
            How <span style={{ color: '#4670bf' }}>hyre<span style={{color:'#7a5fdb'}}>SENSE</span></span> Works
          </p>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-5 left-0 right-0 h-0.5 bg-border -z-10" style={{ width: 'calc(100% - 8rem)', margin: '0 auto' }}></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            {steps.map((step, index) => {
              const [stepRef, isStepVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });
              return (
                <div 
                  key={step.title} 
                  ref={stepRef}
                  className={cn(
                    "flex flex-col items-center text-center p-4 opacity-0 translate-y-10 transition-all duration-500 ease-out",
                    isStepVisible && "opacity-100 translate-y-0"
                  )}
                  style={{ transitionDelay: isStepVisible ? `${index * 150}ms` : '0ms' }}
                >
                  <div className="relative mb-4">
                    <div className="flex items-center justify-center h-20 w-20 rounded-full bg-card shadow-md border-2 border-primary">
                      {step.icon}
                    </div>
                    {index < steps.length -1 && <div className="md:hidden absolute top-full left-1/2 w-0.5 h-8 bg-border -translate-x-1/2"></div> }
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
