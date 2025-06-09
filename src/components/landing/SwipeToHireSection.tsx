
'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rocket, Lightbulb, Flame, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';

const initialJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Tech Innovators Inc.",
    location: "Remote",
    description: "Join our dynamic team to build next-gen web applications using React and Next.js. Lead frontend projects and mentor junior developers.",
    matchPercentage: 92,
    image: "https://placehold.co/400x250.png?text=Frontend+Dev",
    dataAiHint: "software engineer",
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "Creative Solutions Co.",
    location: "New York, NY",
    description: "Design intuitive and engaging user experiences for mobile and web platforms. Strong portfolio in user-centered design required.",
    matchPercentage: 88,
    image: "https://placehold.co/400x250.png?text=UX+Designer",
    dataAiHint: "designer portfolio",
  },
  {
    id: 3,
    title: "Product Manager - AI",
    company: "FutureAI Corp.",
    location: "San Francisco, CA",
    description: "Define and drive the product strategy for our cutting-edge AI platform. Experience in AI/ML products is a plus.",
    matchPercentage: 95,
    image: "https://placehold.co/400x250.png?text=Product+Manager",
    dataAiHint: "AI product",
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "Analytics Pro",
    location: "Austin, TX",
    description: "Analyze large datasets to extract actionable insights and build predictive models. Proficient in Python, R, and SQL.",
    matchPercentage: 90,
    image: "https://placehold.co/400x250.png?text=Data+Scientist",
    dataAiHint: "data charts",
  },
];

const features = [
  {
    icon: <Rocket className="h-7 w-7 text-primary" />,
    text: "Collaborate in Hyper-Speed: Team decisions, instantly synced.",
  },
  {
    icon: <Lightbulb className="h-7 w-7 text-primary" />,
    text: "Intelligent Matchmaking: AI uncovers hidden gems you'd miss.",
  },
  {
    icon: <Flame className="h-7 w-7 text-primary" />,
    text: "Hire on the Fly: Seamless, intuitive, and blazing fast – from anywhere.",
  },
];

export function SwipeToHireSection() {
  const [sectionRef, isSectionVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2, triggerOnce: true });
  const [titleRef, isTitleVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2, triggerOnce: true });
  const [subtitleRef, isSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2, triggerOnce: true });
  const [featuresRef, areFeaturesVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });
  const [interactiveAreaRef, isInteractiveAreaVisible] = useScrollAnimation<HTMLDivElement>({threshold: 0.2, triggerOnce: true});

  const [jobs, setJobs] = useState(initialJobs);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [feedback, setFeedback] = useState<'Applied' | 'Rejected' | null>(null);
  const [cardKey, setCardKey] = useState(0); // Used to re-trigger animations on new card

  const currentJob = jobs[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    setFeedback(direction === 'right' ? 'Applied' : 'Rejected');

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % jobs.length);
      setSwipeDirection(null);
      setFeedback(null);
      setCardKey(prevKey => prevKey + 1); // Change key to force re-mount or re-animate
    }, 500); // Match this with animation duration
  };

  const cardAnimationClasses = () => {
    if (swipeDirection === 'right') {
      return 'animate-swipe-right';
    }
    if (swipeDirection === 'left') {
      return 'animate-swipe-left';
    }
    return 'animate-card-enter'; // Initial enter animation for new cards
  };
  
  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-24 bg-background"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 items-center">
          {/* Interactive Job Card Area */}
          <div 
            ref={interactiveAreaRef}
            className={cn(
              "relative w-full max-w-md mx-auto h-[550px] md:h-[600px] flex flex-col items-center justify-center opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isInteractiveAreaVisible && "opacity-100 translate-y-0 delay-300"
            )}
            style={{ transitionDelay: isInteractiveAreaVisible ? '300ms' : '0ms' }}
          >
            {currentJob && (
              <div key={cardKey} className={cn("absolute w-full", cardAnimationClasses())}>
                <Card className="shadow-xl rounded-xl overflow-hidden w-full max-w-sm mx-auto">
                  <CardHeader className="p-0 relative">
                    <Image 
                      src={currentJob.image} 
                      alt={currentJob.title} 
                      width={400} 
                      height={250} 
                      data-ai-hint={currentJob.dataAiHint}
                      className="object-cover w-full h-48 sm:h-56" 
                    />
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {currentJob.matchPercentage}% Match
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <CardTitle className="text-xl sm:text-2xl font-bold">{currentJob.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mt-1">{currentJob.company} - {currentJob.location}</CardDescription>
                    <p className="text-sm text-foreground mt-3 line-clamp-3">{currentJob.description}</p>
                  </CardContent>
                  <CardFooter className="p-4 sm:p-6 flex justify-around border-t">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive w-28 sm:w-32"
                      onClick={() => handleSwipe('left')}
                    >
                      <XCircle className="mr-2 h-5 w-5" /> Reject
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-primary text-primary hover:bg-primary/10 hover:text-primary w-28 sm:w-32"
                      onClick={() => handleSwipe('right')}
                    >
                      <CheckCircle className="mr-2 h-5 w-5" /> Apply
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
            {feedback && (
              <div className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out animate-feedback-fade",
                feedback === 'Applied' ? 'text-green-500' : 'text-red-500'
              )}>
                <p className="text-5xl sm:text-6xl font-extrabold p-4 bg-background/80 rounded-lg shadow-2xl">
                  {feedback}
                </p>
              </div>
            )}
            {!currentJob && (
              <div className="text-center text-muted-foreground">
                <p className="text-xl mb-4">No more jobs for now!</p>
                <Button onClick={() => { setCurrentIndex(0); setCardKey(k => k + 1); }} variant="outline">
                  <RotateCcw className="mr-2 h-4 w-4" /> Restart
                </Button>
              </div>
            )}
          </div>

          {/* Text Content Area */}
          <div className="md:order-first">
            <h2 
              ref={titleRef}
              className={cn(
                "text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight mb-6 opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isTitleVisible && "opacity-100 translate-y-0"
              )}
            >
              Unlock Talent Instantly: The <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Swipe Revolution</span>
            </h2>
            <p 
              ref={subtitleRef}
              className={cn(
                "text-lg text-muted-foreground mb-8 opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isSubtitleVisible && "opacity-100 translate-y-0 delay-150"
              )}
              style={{ transitionDelay: isSubtitleVisible ? '150ms' : '0ms' }}
            >
              Ditch the drudgery of traditional hiring. HyreSense transforms recruitment into an engaging, intuitive experience. Swipe through a curated stream of top-tier talent and assemble your dream team with unprecedented speed and precision.
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
                      "flex items-start gap-3 p-3 bg-card rounded-lg shadow-md opacity-0 translate-y-5 transition-all duration-500 ease-out",
                      isFeatureItemVisible && "opacity-100 translate-y-0"
                    )}
                    style={{ transitionDelay: isFeatureItemVisible ? `${index * 100 + 300}ms` : '0ms' }}
                  >
                    <span className="flex-shrink-0 mt-1">{feature.icon}</span>
                    <p className="text-foreground">{feature.text}</p>
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
