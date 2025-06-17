
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { MobileAppDemo } from '@/components/landing/MobileAppDemo'; 

export function HeroSection() {
  const [titleRef, isTitleVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2, triggerOnce: true });
  const [textRef, isTextVisible] = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2, triggerOnce: true });
  const [buttonsRef, areButtonsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });
  const [phoneContainerRef, isPhoneContainerVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });
  const [dashboardImageContainerRef, isDashboardImageVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });

  const mobileDemoScale = 0.75; 

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
          <div
            ref={phoneContainerRef}
            className={cn(
              "relative group opacity-0 transition-all duration-1000 ease-out",
              isPhoneContainerVisible ? "opacity-100 scale-100 delay-300" : "scale-90",
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
                width: '375px', 
                height: '780px' 
              }}
            >
              <MobileAppDemo />
            </div>
          </div>

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
            
            <div 
              className="relative rounded-xl shadow-2xl bg-card/80 backdrop-blur-sm border-2 border-primary/30 w-full h-full p-4 sm:p-6 flex flex-col justify-between overflow-hidden"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-primary">AI Talent Dashboard</h3>
                <div className="flex space-x-1.5">
                  <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse_fast"></span>
                  <span className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse_fast [animation-delay:200ms]"></span>
                  <span className="h-2 w-2 bg-primary rounded-full animate-pulse_fast [animation-delay:400ms]"></span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 flex-grow">
                <div className="bg-background/40 dark:bg-slate-800/60 p-2 sm:p-3 rounded-lg shadow-md flex flex-col items-center justify-center transition-all duration-300 group-hover:bg-background/60">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        className="text-primary/20 dark:text-primary/30"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        strokeWidth="3"
                      />
                      <path
                        className="text-accent"
                        strokeDasharray="92, 100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        style={{transition: 'stroke-dasharray 0.5s ease-out'}}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl sm:text-2xl font-bold text-accent">92%</span>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs mt-1.5 sm:mt-2 text-muted-foreground text-center">Avg. Match Score</p>
                </div>

                <div className="bg-background/40 dark:bg-slate-800/60 p-2 sm:p-3 rounded-lg shadow-md transition-all duration-300 group-hover:bg-background/60">
                  <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-1.5 sm:mb-2">Candidate Pipeline</h4>
                  <div className="space-y-1.5 sm:space-y-2">
                    {[
                      { label: "Sourced", value: 75, color: "bg-primary" },
                      { label: "Screened", value: 50, color: "bg-accent" },
                      { label: "Interviewing", value: 25, color: "bg-green-500" },
                    ].map((item) => (
                      <div key={item.label}>
                        <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5">{item.label}</p>
                        <div className="h-2 sm:h-2.5 w-full bg-muted/70 dark:bg-slate-700/50 rounded-full overflow-hidden">
                          <div
                            className={cn("h-full rounded-full transition-all duration-500 ease-out", item.color)}
                            style={{ width: `${isDashboardImageVisible ? item.value : 0}%` }} // Animate width on visibility
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-muted-foreground text-center border-t border-primary/20 dark:border-primary/30 pt-2 sm:pt-3">
                Real-time Analytics & Insights &bull; Last Synced: <span className="text-foreground/80">Just now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
