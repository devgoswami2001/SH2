
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Briefcase, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const [titleRef, isTitleVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2, triggerOnce: true });
  const [textRef, isTextVisible] = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2, triggerOnce: true });
  const [buttonsRef, areButtonsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });
  const [dashboardImageContainerRef, isDashboardImageVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="relative pt-20 pb-12 md:pt-32 md:pb-20 overflow-x-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1
          ref={titleRef}
          className={cn(
            "text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl opacity-0 translate-y-10 transition-all duration-700 ease-out",
            isTitleVisible && "opacity-100 translate-y-0"
          )}
        >
          <span className="block">Revolutionize How You</span>
          <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Find Job and Hire Talent
          </span>
        </h1>
        <p
          ref={textRef}
          className={cn(
            "mt-6 max-w-md mx-auto text-lg text-muted-foreground sm:text-xl md:mt-8 md:max-w-3xl opacity-0 translate-y-10 transition-all duration-700 ease-out",
            isTextVisible && "opacity-100 translate-y-0 delay-200"
          )}
          style={{ transitionDelay: isTextVisible ? '200ms' : '0ms' }}
        >
          AI-powered job matching. <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">HyreSense</span> connects top talent with innovative companies, faster and smarter.
        </p>
        <div
          ref={buttonsRef}
          className={cn(
            "mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4 opacity-0 translate-y-10 transition-all duration-700 ease-out",
            areButtonsVisible && "opacity-100 translate-y-0 delay-400"
          )}
           style={{ transitionDelay: areButtonsVisible ? '400ms' : '0ms' }}
        >
          <Button
            size="lg"
            asChild
            className="w-full sm:w-auto group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.02]"
          >
            <Link href="/job-seekers">
              For Job Seekers
              <Briefcase className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/employers">
              For Recruiter
            </Link>
          </Button>
        </div>
      </div>
      {/* <div className="mt-16 md:mt-24 w-full">
        <div 
          ref={dashboardImageContainerRef}
          className={cn(
            "relative w-full max-w-4xl mx-auto opacity-0 transition-all duration-1000 ease-out",
            isDashboardImageVisible ? "opacity-100 scale-100 delay-300" : "scale-90"
          )}
          style={{ transitionDelay: isDashboardImageVisible ? '300ms' : '0ms' }}
        >
           <Image
              src="https://placehold.co/1200x600/e0e7ff/4a5568?text=Gudda"
              alt="A doll"
              width={1200}
              height={600}
              data-ai-hint="doll"
              className="rounded-xl shadow-2xl border-2 border-primary/20"
            />
        </div>
      </div> */}
    </section>
  );
}
