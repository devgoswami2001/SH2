
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, UserPlus, Copy, BarChartBig, Lightbulb, Target, Rocket, Users, TrendingUp, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const steps = [
  {
    icon: <UserPlus className="h-10 w-10 text-primary" />,
    title: "1. Create Your Profile",
    description: "Job seekers build a standout profile showcasing skills and experience. Employers detail their company culture and job requirements."
  },
  {
    icon: <Copy className="h-10 w-10 text-primary" />,
    title: "2. AI-Powered Matching",
    description: "Our intelligent algorithms go to work! Job seekers discover AI-matched job opportunities. Employers receive a curated list of top candidates."
  },
  {
    icon: <BarChartBig className="h-10 w-10 text-primary" />,
    title: "3. Gain Valuable Insights",
    description: "Job seekers get AI-powered skill gap analysis and career advice. Employers access hiring analytics and candidate insights to make informed decisions."
  },
  {
    icon: <CheckCircle2 className="h-10 w-10 text-primary" />,
    title: "4. Connect & Succeed",
    description: "Seamlessly apply for matched jobs or initiate contact with ideal candidates. HyreSense facilitates the connection for successful placements."
  }
];

export default function HowItWorksPage() {
  const [heroTitleRef, isHeroTitleVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2, triggerOnce: true });
  const [heroSubtitleRef, isHeroSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2, triggerOnce: true });
  
  const [stepsSectionTitleRef, isStepsSectionTitleVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2, triggerOnce: true });
  const [stepsSectionSubtitleRef, isStepsSectionSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2, triggerOnce: true });

  const [drivingForceTitleRef, isDrivingForceTitleVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2, triggerOnce: true });
  const [drivingForceSubtitleRef, isDrivingForceSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2, triggerOnce: true });
  
  const [ctaImageRef, isCtaImageVisible] = useScrollAnimation<HTMLImageElement>({ threshold: 0.2, triggerOnce: true });
  const [ctaTitleRef, isCtaTitleVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2, triggerOnce: true });
  const [ctaSubtitleRef, isCtaSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2, triggerOnce: true });
  const [ctaButtonsRef, areCtaButtonsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });

  return (
    <div className="text-foreground py-12 sm:py-16">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 
            ref={heroTitleRef}
            className={cn(
              "text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isHeroTitleVisible && "opacity-100 translate-y-0"
            )}
          >
            How <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"><span style={{ color: '#4670bf' }}>hyre<span style={{color:'#7a5fdb'}}>SENSE</span></span></span> Works
          </h1>
          <p 
            ref={heroSubtitleRef}
            className={cn(
              "mt-6 max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isHeroSubtitleVisible && "opacity-100 translate-y-0 delay-200"
            )}
            style={{ transitionDelay: isHeroSubtitleVisible ? '200ms' : '0ms' }}
          >
            Discover the simple, intelligent process that connects talent with opportunity and empowers your career or hiring journey.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <h2 
              ref={stepsSectionTitleRef}
              className={cn(
                "text-3xl lg:text-4xl font-extrabold tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isStepsSectionTitleVisible && "opacity-100 translate-y-0"
              )}
            >
              Your Journey with <span style={{ color: '#4670bf' }}>hyre<span style={{color:'#7a5fdb'}}>SENSE</span></span>
            </h2>
            <p 
              ref={stepsSectionSubtitleRef}
              className={cn(
                "mt-4 text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isStepsSectionSubtitleVisible && "opacity-100 translate-y-0 delay-200"
              )}
              style={{ transitionDelay: isStepsSectionSubtitleVisible ? '200ms' : '0ms' }}
            >
              Four simple steps to unlock a smarter way to hire and get hired.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const [stepCardRef, isStepCardVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });
              return (
                <div
                  key={step.title}
                  ref={stepCardRef}
                  className={cn(
                    "opacity-0 translate-y-10 transition-all duration-500 ease-out",
                    isStepCardVisible && "opacity-100 translate-y-0"
                  )}
                  style={{ transitionDelay: isStepCardVisible ? `${index * 150}ms` : '0ms' }}
                >
                  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        {step.icon}
                        <CardTitle className="text-2xl">{step.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-base">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision, Mission, Goals Section */}
      <section className="py-16 sm:py-24 bg-secondary/30 dark:bg-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-16">
             <h2 
              ref={drivingForceTitleRef}
              className={cn(
                "text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isDrivingForceTitleVisible && "opacity-100 translate-y-0"
              )}
            >
              Our Driving Force
            </h2>
            <p 
              ref={drivingForceSubtitleRef}
              className={cn(
                "mt-4 text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isDrivingForceSubtitleVisible && "opacity-100 translate-y-0 delay-200"
              )}
              style={{ transitionDelay: isDrivingForceSubtitleVisible ? '200ms' : '0ms' }}
            >
              What we aim to achieve and the principles that guide us.
            </p>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {[
              { 
                icon: <Lightbulb className="h-10 w-10 text-primary" />, 
                title: "Our Vision", 
                content: "To be the leading AI-powered platform that redefines the talent landscape, making the hiring process transparent, efficient, and effective for all." 
              },
              { 
                icon: <Target className="h-10 w-10 text-primary" />, 
                title: "Our Mission", 
                content: "To empower job seekers and employers with intelligent, intuitive, and equitable tools that foster meaningful connections and drive career and organizational growth." 
              },
              { 
                icon: <Rocket className="h-10 w-10 text-primary" />, 
                title: "Our Goals", 
                content: (
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                        <Users className="h-5 w-5 text-accent mt-1 shrink-0" />
                        <p className="text-muted-foreground"><strong>For Job Seekers:</strong> Find fulfilling roles that match skills and aspirations quickly and easily.</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <Briefcase className="h-5 w-5 text-accent mt-1 shrink-0" />
                        <p className="text-muted-foreground"><strong>For Employers:</strong> Discover and hire top talent efficiently, reducing time-to-hire and improving match quality.</p>
                    </div>
                     <div className="flex items-start gap-2">
                        <TrendingUp className="h-5 w-5 text-accent mt-1 shrink-0" />
                        <p className="text-muted-foreground"><strong>Overall:</strong> Continuously innovate using AI to create a fair, intelligent, and dynamic job market.</p>
                    </div>
                  </div>
                ) 
              }
            ].map((item, index) => {
              const [cardRef, isCardVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });
              return (
                <div
                  key={item.title}
                  ref={cardRef}
                  className={cn(
                    "opacity-0 translate-y-10 transition-all duration-500 ease-out",
                    isCardVisible && "opacity-100 translate-y-0"
                  )}
                  style={{ transitionDelay: isCardVisible ? `${index * 150}ms` : '0ms' }}
                >
                  <Card className="shadow-lg h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        {item.icon}
                        <CardTitle className="text-2xl">{item.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {typeof item.content === 'string' ? <p className="text-muted-foreground">{item.content}</p> : item.content}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div
            ref={ctaImageRef}
            className={cn(
              "opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isCtaImageVisible && "opacity-100 translate-y-0"
            )}
          >
            <Image 
              src="https://placehold.co/600x300.png" 
              alt="Diverse team collaborating" 
              width={600} 
              height={300} 
              data-ai-hint="team collaboration"
              className="rounded-lg shadow-xl mx-auto mb-8"
            />
          </div>
          <h2 
            ref={ctaTitleRef}
            className={cn(
              "text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isCtaTitleVisible && "opacity-100 translate-y-0 delay-200"
            )}
            style={{ transitionDelay: isCtaTitleVisible ? '200ms' : '0ms' }}
          >
            Ready to Experience the <span style={{ color: '#4670bf' }}>hyre<span style={{color:'#7a5fdb'}}>SENSE</span></span> Difference?
          </h2>
          <p 
            ref={ctaSubtitleRef}
            className={cn(
              "mt-4 text-lg text-muted-foreground opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isCtaSubtitleVisible && "opacity-100 translate-y-0 delay-400"
            )}
            style={{ transitionDelay: isCtaSubtitleVisible ? '400ms' : '0ms' }}
          >
            Join our platform today and take the next step in your career or find the perfect addition to your team.
          </p>
          <div 
            ref={ctaButtonsRef}
            className={cn(
              "mt-10 flex flex-col sm:flex-row justify-center gap-4 opacity-0 translate-y-10 transition-all duration-700 ease-out",
              areCtaButtonsVisible && "opacity-100 translate-y-0 delay-600"
            )}
            style={{ transitionDelay: areCtaButtonsVisible ? '600ms' : '0ms' }}
          >
            <Button size="lg" asChild>
              <Link href="/">Get Started as a Job Seeker</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://talent-flow-seven.vercel.app/" target="_blank" rel="noopener noreferrer">Find Talent as an Employer</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
