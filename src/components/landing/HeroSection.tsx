
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { MobileAppDemo } from '@/components/landing/MobileAppDemo'; // Import MobileAppDemo

export function HeroSection() {
  const [titleRef, isTitleVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2, triggerOnce: true });
  const [textRef, isTextVisible] = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2, triggerOnce: true });
  const [buttonsRef, areButtonsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });
  const [phoneContainerRef, isPhoneContainerVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });
  const [dashboardImageContainerRef, isDashboardImageVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });

  // Define a scale factor for the MobileAppDemo
  const mobileDemoScale = 0.75; // Adjust as needed to fit design

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
          <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mt-2">Find and Hire Talent</span>
        </h1>
        <p
          ref={textRef}
          className={cn(
            "mt-6 max-w-md mx-auto text-lg text-muted-foreground sm:text-xl md:mt-8 md:max-w-3xl opacity-0 translate-y-10 transition-all duration-700 ease-out",
            isTextVisible && "opacity-100 translate-y-0 delay-200"
          )}
          style={{ transitionDelay: isTextVisible ? '200ms' : '0ms' }}
        >
          AI-powered job matching. <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">hyreSENSE</span> connects top talent with innovative companies, faster and smarter.
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
            className="w-full sm:w-auto group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.02]"
          >
            For Job Seekers
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            For Employers
          </Button>
        </div>
      </div>
      <div className="mt-16 md:mt-24 container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col md:flex-row justify-center items-center gap-8">
          {/* Container for MobileAppDemo */}
          <div
            ref={phoneContainerRef}
            className={cn(
              "relative group opacity-0 transition-all duration-1000 ease-out",
              isPhoneContainerVisible ? "opacity-100 scale-100 delay-300" : "scale-90",
              // Set base size for the container that holds the scaled MobileAppDemo
              // These dimensions are roughly MobileAppDemo's original * scale factor
            )}
             style={{ 
              width: `${375 * mobileDemoScale}px`, 
              height: `${780 * mobileDemoScale}px`,
              transitionDelay: isPhoneContainerVisible ? '300ms' : '0ms' 
            }}
          >
            <div className={cn(
                "absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-[48px] blur-md opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt",
                "group-hover:animate-hover-glow-effect"
              )}></div>
            <div 
              className="relative" 
              style={{ 
                transform: `scale(${mobileDemoScale})`, 
                transformOrigin: 'top left',
                width: '375px', // Original width of MobileAppDemo
                height: '780px' // Original height of MobileAppDemo
              }}
            >
              <MobileAppDemo />
            </div>
          </div>

          {/* Dashboard Image Placeholder */}
          <div
            ref={dashboardImageContainerRef}
            className={cn(
              "relative w-full max-w-xl md:w-[500px] md:h-[350px] group mt-8 md:mt-0 opacity-0 transition-all duration-1000 ease-out",
               isDashboardImageVisible ? "opacity-100 scale-100 delay-500" : "scale-90"
            )}
            style={{ transitionDelay: isDashboardImageVisible ? '500ms' : '0ms' }}
          >
            <div className={cn(
              "absolute -inset-0.5 bg-gradient-to-r from-accent to-primary rounded-xl blur-md opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt-opposite",
              "group-hover:animate-hover-glow-effect"
            )}></div>
            <Image
              src="https://placehold.co/500x350.png"
              alt="HyreSence Dashboard"
              width={500}
              height={350}
              data-ai-hint="dashboard analytics"
              className="relative rounded-xl shadow-2xl object-cover border-4 border-background"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
