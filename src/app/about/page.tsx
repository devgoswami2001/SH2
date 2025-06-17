
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Lightbulb, Rocket, Users, Heart, Sparkles, CheckCircle, MessageSquareQuote, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string | React.ReactNode;
  delay?: number;
  bgColorClass?: string;
  textColorClass?: string;
  iconColorClass?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description, delay = 0, bgColorClass = "bg-card", textColorClass = "text-foreground", iconColorClass = "text-primary" }) => {
  const [cardRef, isCardVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });
  return (
    <div
      ref={cardRef}
      className={cn(
        "opacity-0 translate-y-10 transition-all duration-500 ease-out",
        isCardVisible && "opacity-100 translate-y-0"
      )}
      style={{ transitionDelay: isCardVisible ? `${delay}ms` : '0ms' }}
    >
      <Card className={cn("shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full border-2 border-transparent hover:border-accent", bgColorClass)}>
        <CardHeader className="items-center text-center pt-6 pb-4">
          <div className={cn("p-4 bg-background/50 dark:bg-slate-700/50 rounded-full inline-block mb-3 ring-2 ring-offset-2 ring-offset-card ring-accent/50", iconColorClass)}>
            {icon}
          </div>
          <CardTitle className={cn("text-2xl", textColorClass)}>{title}</CardTitle>
        </CardHeader>
        <CardContent className={cn("text-center pb-6 px-6", textColorClass === "text-primary-foreground" ? "text-primary-foreground/90" : "text-muted-foreground")}>
          {typeof description === 'string' ? <p>{description}</p> : description}
        </CardContent>
      </Card>
    </div>
  );
};

export default function AboutUsPage() {
  const [heroTitleRef, isHeroTitleVisible] = useScrollAnimation<HTMLHeadingElement>();
  const [heroSubtitleRef, isHeroSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>();
  const [introTitleRef, isIntroTitleRefVisible] = useScrollAnimation<HTMLHeadingElement>();
  const [storyTitleRef, isStoryTitleRefVisible] = useScrollAnimation<HTMLHeadingElement>();
  const [ctaVisualRef, isCtaVisualVisible] = useScrollAnimation<HTMLDivElement>();
  const [ctaTitleRef, isCtaTitleRefVisible] = useScrollAnimation<HTMLHeadingElement>();
  const [ctaButtonRef, isCtaButtonVisible] = useScrollAnimation<HTMLDivElement>();


  const introParagraphs = [
    {
      icon: <MessageSquareQuote className="h-10 w-10 text-primary" />,
      title: "Redefining Recruitment",
      text: "Here at HyreSense, the Swipe based job portal, we’re redefining the way people find jobs and companies hire talent. Our mission is simple — make job hunting and hiring fast, smart, and human.",
      delay: 0
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: "Effortless Experience",
      text: "Gone are the days of filling out long applications, uploading the same resume again and again, or endlessly scrolling through irrelevant job listings. We’ve built a platform that lets job seekers apply to opportunities in seconds with just a swipe — and helps employers discover top candidates faster than ever before.",
      delay: 150
    }
  ];

  const storyParagraphs = [
     {
      icon: <Heart className="h-10 w-10 text-accent" />,
      title: "Born from Simplicity",
      text: "HyreSense was born out of a simple idea: Job hunting and hiring shouldn’t be slow, outdated, or frustrating.",
      delay: 0
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-accent" />,
      title: "Mobile-First, Smart Matching",
      text: "We’ve created a mobile-first, swipe-enabled platform that puts speed, simplicity, and smart-matching at the heart of the job market. For candidates, it means quick applications. For recruiters, it means faster closures.",
      delay: 150
    }
  ];


  return (
    <div className="text-foreground bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-transparent to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            ref={heroTitleRef}
            className={cn(
              "text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isHeroTitleVisible && "opacity-100 translate-y-0"
            )}
          >
            Meet <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">HyreSense</span>
          </h1>
          <p
            ref={heroSubtitleRef}
            className={cn(
              "mt-6 max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isHeroSubtitleVisible && "opacity-100 translate-y-0 delay-200"
            )}
            style={{ transitionDelay: isHeroSubtitleVisible ? '200ms' : '0ms' }}
          >
            Connecting Futures, One Swipe at a Time. We're passionate about making job hunting and hiring faster, smarter, and more human.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <h2
              ref={introTitleRef}
              className={cn(
                "text-3xl lg:text-4xl font-extrabold tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isIntroTitleRefVisible && "opacity-100 translate-y-0"
              )}
            >
              Our Approach to a Better Job Market
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {introParagraphs.map((item, index) => (
              <InfoCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={<p className="text-base">{item.text}</p>}
                delay={item.delay}
                bgColorClass="bg-card dark:bg-slate-800/70"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
       <section className="py-16 sm:py-24 bg-secondary/30 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <h2
              ref={storyTitleRef}
              className={cn(
                "text-3xl lg:text-4xl font-extrabold tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isStoryTitleRefVisible && "opacity-100 translate-y-0"
              )}
            >
              The <span className="text-accent">HyreSense</span> Story
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {storyParagraphs.map((item, index) => (
              <InfoCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={<p className="text-base">{item.text}</p>}
                delay={item.delay}
                bgColorClass="bg-card dark:bg-slate-800/70"
                iconColorClass="text-accent"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <InfoCard
              icon={<Lightbulb className="h-12 w-12" />}
              title="Our Vision"
              description="To make job search and recruitment effortless by creating the most intuitive, swipe-first job platform that connects talent with opportunity instantly."
              delay={0}
              bgColorClass="bg-gradient-to-br from-primary/80 to-primary/70 dark:from-primary/70 dark:to-primary/60"
              textColorClass="text-primary-foreground"
              iconColorClass="text-primary-foreground/80 bg-white/20"
            />
            <InfoCard
              icon={<Rocket className="h-12 w-12" />}
              title="Our Mission"
              description="To empower professionals and companies to find the best match in seconds — not weeks — through a modern, mobile-first hiring experience."
              delay={150}
              bgColorClass="bg-gradient-to-br from-accent/80 to-accent/70 dark:from-accent/70 dark:to-accent/60"
              textColorClass="text-primary-foreground"
              iconColorClass="text-primary-foreground/80 bg-white/20"
            />
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <div
            ref={ctaVisualRef}
            className={cn(
              "relative w-64 h-64 sm:w-72 sm:h-72 mx-auto mb-16 group opacity-0 scale-90 transition-all duration-1000 ease-out",
              isCtaVisualVisible && "opacity-100 scale-100 delay-100"
            )}
            style={{ transitionDelay: isCtaVisualVisible ? '100ms' : '0ms' }}
          >
            {/* Background Glows */}
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse_slow opacity-70 blur-2xl group-hover:opacity-90 transition-opacity duration-700"></div>
            <div 
              className="absolute inset-4 rounded-full bg-accent/10 animate-pulse_slow opacity-60 blur-xl group-hover:opacity-80 transition-opacity duration-700"
              style={{ animationDelay: '400ms' }}
            ></div>

            {/* Central Logo Element */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-5 sm:p-6 bg-card/80 dark:bg-slate-800/70 backdrop-blur-md rounded-full shadow-2xl border-2 border-primary/30 group-hover:border-accent/50 transition-all duration-300 transform group-hover:scale-105">
                <Image 
                  src="/logo.png" 
                  alt="HyreSense Revolution Icon" 
                  width={96}
                  height={60} 
                  className="opacity-90 group-hover:opacity-100 transition-opacity duration-300" 
                />
              </div>
            </div>

            {/* Surrounding Animated Dots */}
            {[
              { pos: "top-3 left-1/2 -translate-x-1/2", delay: "0ms", color: "bg-primary/70" },
              { pos: "bottom-3 left-1/2 -translate-x-1/2", delay: "600ms", color: "bg-primary/70" },
              { pos: "left-3 top-1/2 -translate-y-1/2", delay: "300ms", color: "bg-accent/70" },
              { pos: "right-3 top-1/2 -translate-y-1/2", delay: "900ms", color: "bg-accent/70" },
            ].map((dot, i) => (
              <div
                key={i}
                className={cn(
                  "absolute w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full opacity-70 group-hover:opacity-90 transition-opacity duration-500 animate-pulse_fast",
                  dot.color,
                  dot.pos
                )}
                style={{ animationDelay: dot.delay, animationDuration: '2.5s' }}
              ></div>
            ))}
            {[
              { pos: "top-10 left-10", delay: "100ms", color: "bg-accent/50" },
              { pos: "top-10 right-10", delay: "400ms", color: "bg-primary/50" },
              { pos: "bottom-10 left-10", delay: "700ms", color: "bg-primary/50" },
              { pos: "bottom-10 right-10", delay: "1000ms", color: "bg-accent/50" },
            ].map((dot, i) => (
              <div
                key={`corner-${i}`}
                className={cn(
                  "absolute w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-500 animate-pulse_fast",
                  dot.color,
                  dot.pos
                )}
                style={{ animationDelay: dot.delay, animationDuration: '3s' }}
              ></div>
            ))}
          </div>
          <h2 
            ref={ctaTitleRef}
            className={cn(
              "text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isCtaTitleRefVisible && "opacity-100 translate-y-0 delay-200"
            )}
             style={{ transitionDelay: isCtaTitleRefVisible ? '200ms' : '0ms' }}
          >
            Join the <span className="text-primary">HyreSense</span> Revolution
          </h2>
          <p 
            className={cn(
              "mt-4 text-lg text-muted-foreground max-w-xl mx-auto opacity-0 translate-y-10 transition-all duration-700 ease-out",
               isCtaTitleRefVisible && "opacity-100 translate-y-0 delay-400" 
            )}
            style={{ transitionDelay: isCtaTitleRefVisible ? '400ms' : '0ms' }}
          >
            Ready to experience a smarter way to find jobs or hire talent? Explore HyreSense and see the difference AI can make.
          </p>
          <div 
            ref={ctaButtonRef}
            className={cn(
              "mt-10 opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isCtaButtonVisible && "opacity-100 translate-y-0 delay-600" 
            )}
            style={{ transitionDelay: isCtaButtonVisible ? '600ms' : '0ms' }}
          >
            <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105">
              <Link href="/features">Discover Our Features</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

