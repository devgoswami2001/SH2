
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Brain, Zap, Target, Users, LineChart, Layers, Search, SlidersHorizontal, Sparkles, Telescope, BarChart3, TrendingUp, Shuffle, Network, Palette, Database, Filter, ChevronRight, Users2, FileText, ZapIcon, GraduationCap } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const featureHighlights = [
  {
    icon: <Brain className="h-10 w-10 text-accent" />,
    title: "Hyper-Intelligent AI Matching",
    description: "Our core AI delves beyond keywords, understanding nuanced skills, cultural alignments, and potential trajectories to forge perfect candidate-role connections. Experience matchmaking evolved.",
    tags: ["Precision AI", "Deep Learning", "Compatibility"],
    visual: (
      <div className="p-4 bg-foreground/5 dark:bg-foreground/10 border border-accent/20 rounded-lg aspect-video flex flex-col justify-center items-center space-y-3">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary/10 rounded-full"><Users className="h-6 w-6 text-primary" /></div>
          <Zap className="h-8 w-8 text-accent animate-pulse_fast" />
          <div className="p-3 bg-primary/10 rounded-full"><Target className="h-6 w-6 text-primary" /></div>
        </div>
        <Progress value={93} className="w-3/4 h-3 [&>div]:bg-gradient-to-r [&>div]:from-accent [&>div]:to-primary/80" />
        <p className="text-xs font-mono text-accent">MATCH SCORE: 93%</p>
      </div>
    )
  },
  {
    icon: <Layers className="h-10 w-10 text-accent" />,
    title: "Dynamic Skill Gap Cartography",
    description: "Visualize career progression like never before. Our AI maps your current skillset against aspirations, illuminating personalized development pathways and curated learning resources.",
    tags: ["Career Growth", "Personalized Learning", "Upskilling"],
    visual: (
        <div className="p-4 bg-foreground/5 dark:bg-foreground/10 border border-accent/20 rounded-lg aspect-video flex flex-col justify-center items-center space-y-2">
            <div className="w-full space-y-1.5">
                <div className="flex items-center justify-between text-xs text-muted-foreground"><span>Current: React</span><Badge variant="secondary" className="bg-primary/20 text-primary text-[10px]">70%</Badge></div>
                <Progress value={70} className="h-2.5 [&>div]:bg-primary" />
            </div>
            <div className="flex items-center justify-center text-accent my-1">
                <TrendingUp className="h-5 w-5" />
            </div>
            <div className="w-full space-y-1.5">
                <div className="flex items-center justify-between text-xs text-muted-foreground"><span>Target: AI/ML</span><Badge variant="secondary" className="bg-accent/20 text-accent text-[10px]">Needed</Badge></div>
                <Progress value={20} className="h-2.5 [&>div]:bg-accent" />
            </div>
            <p className="text-xs font-mono text-accent mt-1.5">PATHWAY IDENTIFIED</p>
        </div>
    )
  },
    {
    icon: <GraduationCap className="h-10 w-10 text-accent" />,
    title: "Hybrid Mock Interviews",
    description: "Experience the best of both worlds. Sharpen skills with an AI coach providing instant feedback, then refine your strategy with personalized insights from seasoned industry professionals.",
    tags: ["Interview Prep", "AI Coaching", "Expert Feedback"],
    visual: (
        <div className="p-4 bg-foreground/5 dark:bg-foreground/10 border border-accent/20 rounded-lg aspect-video flex flex-col justify-center items-center space-y-3">
        <div className="flex items-center space-x-4">
            <div className="flex flex-col items-center space-y-2 text-center">
            <Brain className="h-10 w-10 text-primary" />
            <p className="text-xs font-semibold text-primary">AI Coach</p>
            <Badge variant="secondary" className="bg-primary/10 text-primary/90 border-primary/20">Instant Feedback</Badge>
            </div>
            <Zap className="h-8 w-8 text-accent animate-pulse_fast shrink-0" />
            <div className="flex flex-col items-center space-y-2 text-center">
            <Users className="h-10 w-10 text-green-500" />
            <p className="text-xs font-semibold text-green-500">Human Expert</p>
            <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">In-depth Review</Badge>
            </div>
        </div>
        <p className="text-xs font-mono text-accent pt-4">PREPARE TO SUCCEED</p>
        </div>
    )
  },
  {
    icon: <LineChart className="h-10 w-10 text-accent" />,
    title: "Predictive Talent Analytics",
    description: "Empower hiring with foresight. HyreSense analyzes market trends and candidate data to forecast hiring needs, identify high-potential talent, and optimize acquisition strategies.",
    tags: ["Data-Driven Hiring", "Market Insights", "Strategic Workforce Planning"],
    visual: (
        <div className="p-4 bg-foreground/5 dark:bg-foreground/10 border border-accent/20 rounded-lg aspect-video flex flex-col justify-around items-start">
            <div className="w-full">
                <p className="text-xs text-primary/80 mb-0.5">Hiring Velocity</p>
                <div className="flex items-end space-x-1 h-10">
                    {[40, 60, 50, 80, 70].map((val, i) => (
                        <div key={i} className="w-1/5 bg-gradient-to-t from-primary to-accent rounded-t-sm" style={{ height: `${val}%`}}></div>
                    ))}
                </div>
            </div>
            <div className="w-full">
                <p className="text-xs text-accent/80 mb-0.5">Talent Pool Growth</p>
                 <div className="flex items-end space-x-1 h-10">
                    {[30, 45, 65, 70, 90].map((val, i) => (
                        <div key={i} className="w-1/5 bg-gradient-to-t from-accent to-primary/70 rounded-t-sm" style={{ height: `${val}%`}}></div>
                    ))}
                </div>
            </div>
            <p className="text-xs font-mono text-primary self-center mt-1">REAL-TIME ANALYTICS</p>
        </div>
    )
  },
  {
    icon: <SlidersHorizontal className="h-10 w-10 text-accent" />,
    title: "Adaptive Sourcing Engines",
    description: "For employers, tap into a continuously adapting talent stream. Our AI proactively sources and vets candidates, delivering a pipeline of qualified individuals ready for impact.",
    tags: ["Automated Sourcing", "Candidate Pipeline", "Efficient Recruitment"],
    visual: (
        <div className="p-4 bg-foreground/5 dark:bg-foreground/10 border border-accent/20 rounded-lg aspect-video flex flex-col justify-center items-center space-y-2">
            {[
                {icon: <Database className="h-5 w-5 text-primary/70"/>, label: "Sourcing", count: "10K+", color: "bg-primary/20"},
                {icon: <Filter className="h-5 w-5 text-primary/70"/>, label: "Screening", count: "5K+", color: "bg-primary/30"},
                {icon: <ZapIcon className="h-5 w-5 text-accent"/>, label: "Matched", count: "1K+", color: "bg-accent/30"},
                {icon: <Users2 className="h-5 w-5 text-green-500"/>, label: "Interviewing", count: "500+", color: "bg-green-500/30"},
            ].map(stage => (
                <div key={stage.label} className={cn("w-full flex items-center p-1.5 rounded-md shadow-sm", stage.color)}>
                    {stage.icon}
                    <span className="text-xs font-medium text-foreground/80 ml-2 flex-grow">{stage.label}</span>
                    <Badge variant="outline" className="text-xs border-foreground/30 text-foreground/70">{stage.count}</Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground ml-1 opacity-50"/>
                </div>
            ))}
        </div>
    )
  },
    {
    icon: <Search className="h-10 w-10 text-accent" />,
    title: "Intuitive Discovery Interfaces",
    description: "Job seeking and talent discovery, reimagined. Our sleek, swipe-based interfaces and dynamic dashboards make navigating the talent landscape engaging and effortless.",
    tags: ["User Experience", "Mobile First", "Engagement"],
    visual: (
        <div className="p-4 bg-foreground/5 dark:bg-foreground/10 border border-accent/20 rounded-lg aspect-video flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute w-40 h-56 bg-card border-2 border-primary/30 rounded-xl shadow-2xl -rotate-[15deg] translate-x-[-20px] opacity-70 transition-all group-hover:-rotate-[20deg] group-hover:scale-95">
                <div className="h-5 bg-primary/10 rounded-t-lg"></div>
                <div className="p-2 space-y-1">
                    <div className="h-3 w-3/4 bg-primary/20 rounded"></div>
                    <div className="h-2 w-1/2 bg-muted-foreground/20 rounded"></div>
                </div>
            </div>
            <div className="relative w-48 h-64 bg-card border-2 border-accent/70 rounded-xl shadow-2xl z-10 rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300">
                <div className="h-6 bg-accent/20 rounded-t-lg flex items-center px-2">
                    <Palette className="h-3 w-3 text-accent"/>
                </div>
                <div className="p-2.5 space-y-1.5">
                    <div className="h-4 w-full bg-accent/30 rounded"></div>
                    <div className="h-3 w-3/4 bg-muted-foreground/30 rounded"></div>
                    <div className="h-3 w-1/2 bg-muted-foreground/20 rounded"></div>
                </div>
            </div>
            <p className="text-xs font-mono text-primary absolute bottom-3 right-3 group-hover:text-accent transition-colors">MODERN UI/UX</p>
        </div>
    )
  }
];

const techPillars = [
  { name: "Generative AI", description: "For personalized content and insights." },
  { name: "Machine Learning", description: "Powering our predictive models." },
  { name: "Big Data Analytics", description: "For comprehensive market understanding." },
  { name: "Graph Technology", description: "Mapping complex talent relationships." }
];

export default function FeaturesPage() {
  const [heroTitleRef, isHeroTitleVisible] = useScrollAnimation<HTMLHeadingElement>();
  const [heroSubtitleRef, isHeroSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>();
  const [heroButtonRef, isHeroButtonVisible] = useScrollAnimation<HTMLDivElement>();
  const [heroImageRef, isHeroImageVisible] = useScrollAnimation<HTMLDivElement>();

  const useAnimatedTitle = (index: number) => { 
    const ref = React.useRef<HTMLHeadingElement>(null);
    const [isVisible, setIsVisible] = React.useState(false);
    const observerRef = React.useRef<IntersectionObserver | null>(null);

    React.useEffect(() => {
        const currentElement = ref.current;
        if (!currentElement) return;
        observerRef.current = new IntersectionObserver(
            (entries) => entries.forEach(entry => entry.isIntersecting && setIsVisible(true)),
            { threshold: 0.3, triggerOnce: true }
        );
        observerRef.current.observe(currentElement);
        return () => {
            if (observerRef.current && currentElement) observerRef.current.unobserve(currentElement);
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, []);
    return [ref, isVisible] as const;
  };

  const [mainFeaturesTitleRef, isMainFeaturesTitleVisible] = useAnimatedTitle(0);
  const [techPillarTitleRef, isTechPillarTitleVisible] = useAnimatedTitle(1);
  const [visionTitleRef, isVisionTitleVisible] = useAnimatedTitle(2);
  const [ctaTitleRef, isCtaTitleVisible] = useAnimatedTitle(3);
  const [ctaSubtitleRef, isCtaSubtitleVisible] = useAnimatedTitle(4); 
  const [ctaButtonRef, isCtaButtonVisible] = useAnimatedTitle(5); 

  return (
    <div className="text-foreground bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 min-h-[80vh] flex items-center bg-gradient-to-br from-background via-black/5 to-primary/10 dark:via-black/20 dark:to-primary/20">
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-center md:text-left">
            <h1
              ref={heroTitleRef}
              className={cn(
                "text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl opacity-0 translate-y-10 transition-all duration-1000 ease-out",
                isHeroTitleVisible && "opacity-100 translate-y-0"
              )}
            >
              The Future of Talent, <br />
              <span className="bg-gradient-to-r from-primary via-accent to-blue-400 bg-clip-text text-transparent">Forged by AI.</span>
            </h1>
            <p
              ref={heroSubtitleRef}
              className={cn(
                "mt-6 text-lg text-muted-foreground sm:text-xl max-w-xl opacity-0 translate-y-10 transition-all duration-1000 ease-out",
                isHeroSubtitleVisible && "opacity-100 translate-y-0 delay-300"
              )}
              style={{ transitionDelay: isHeroSubtitleVisible ? '300ms' : '0ms' }}
            >
              HyreSense is not just a platform; it's an ecosystem where potential meets precision. Discover features engineered to redefine recruitment and career navigation.
            </p>
            <div
              ref={heroButtonRef}
              className={cn(
                "mt-10 opacity-0 translate-y-10 transition-all duration-1000 ease-out",
                isHeroButtonVisible && "opacity-100 translate-y-0 delay-600"
              )}
              style={{ transitionDelay: isHeroButtonVisible ? '600ms' : '0ms' }}
            >
              <Button size="lg" asChild className="shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105 group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground">
                <Link href="#main-features">Explore Innovations <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /></Link>
              </Button>
            </div>
          </div>
          <div
            ref={heroImageRef}
            className={cn(
              "relative opacity-0 scale-90 transition-all duration-1200 ease-out",
              isHeroImageVisible && "opacity-100 scale-100 delay-200"
            )}
            style={{ transitionDelay: isHeroImageVisible ? '200ms' : '0ms' }}
          >
            <div className="p-6 bg-foreground/5 dark:bg-black/20 border border-primary/20 rounded-xl aspect-[6/5] shadow-2xl shadow-primary/20 dark:shadow-black/50 mx-auto flex items-center justify-center">
                <Network className="h-3/5 w-3/5 text-primary opacity-60 animate-pulse_slow"/>
            </div>
             <div className="absolute -inset-4 -z-10 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-2xl opacity-50 animate-pulse rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Main Features Showcase */}
      <section id="main-features" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2
              ref={mainFeaturesTitleRef}
              className={cn(
                "text-3xl lg:text-5xl font-extrabold tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isMainFeaturesTitleVisible && "opacity-100 translate-y-0"
              )}
            >
              Innovations That <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Empower</span>
            </h2>
          </div>

          {featureHighlights.map((feature, index) => {
            const [cardRef, isCardVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });
            const isEven = index % 2 === 0;
            return (
              <div
                key={feature.title}
                ref={cardRef}
                className={cn(
                  "group grid md:grid-cols-2 gap-12 items-center mb-20 md:mb-28 opacity-0 translate-y-16 transition-all duration-1000 ease-out", 
                  isCardVisible && "opacity-100 translate-y-0"
                )}
                style={{ transitionDelay: isCardVisible ? `${index * 100}ms` : '0ms' }}
              >
                <div className={cn("relative", isEven ? "md:order-1" : "md:order-2")}>
                  <div className="transition-transform duration-500 group-hover:scale-105">
                    {feature.visual}
                  </div>
                  <div className={cn(
                    "absolute -inset-8 -z-10 blur-3xl opacity-30 dark:opacity-20 rounded-full",
                     isEven ? "bg-gradient-to-tr from-accent/50 to-primary/30" : "bg-gradient-to-bl from-primary/50 to-accent/30",
                     "animate-pulse animation-delay-random group-hover:opacity-50 transition-opacity duration-500" 
                  )}></div>
                </div>
                <div className={cn("md:order-1", isEven ? "md:order-2" : "md:order-1")}>
                  {index === 0 ? ( 
                    <Card className="bg-gradient-to-br from-card via-primary/5 to-accent/5 dark:from-slate-800 dark:via-primary/10 dark:to-accent/10 p-6 rounded-xl shadow-2xl hover:shadow-primary/20 transition-all duration-500 transform hover:-translate-y-1 border border-primary/20 hover:border-accent/50">
                      <div className="inline-flex items-center gap-3 mb-4">
                        <span className="p-3 bg-gradient-to-br from-primary/15 to-accent/15 rounded-xl text-primary shadow-md group-hover:shadow-accent/30 transition-shadow">
                            {React.cloneElement(feature.icon, { className: "h-8 w-8 text-accent"})}
                        </span>
                        <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">{feature.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-lg mb-5">{feature.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {feature.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="bg-muted/70 dark:bg-slate-700/50 border-border/50 text-xs px-3 py-1 hover:bg-accent/20 hover:text-accent transition-colors shadow-sm hover:shadow-md">
                                {tag}
                            </Badge>
                        ))}
                      </div>
                    </Card>
                  ) : ( 
                    <>
                      <div className="inline-flex items-center gap-3 mb-4">
                        <span className="p-3 bg-gradient-to-br from-primary/15 to-accent/15 rounded-xl text-primary shadow-md">
                            {React.cloneElement(feature.icon, { className: "h-8 w-8 text-accent"})}
                        </span>
                        <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">{feature.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-lg mb-5">{feature.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {feature.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="bg-muted/70 dark:bg-slate-700/50 border-border/50 text-xs px-3 py-1 hover:bg-accent/10 hover:text-accent transition-colors">
                                {tag}
                            </Badge>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      
      {/* Tech Pillars Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-background via-slate-900/5 to-background dark:from-slate-900 dark:via-black/20 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
             <h2
              ref={techPillarTitleRef}
              className={cn(
                "text-3xl lg:text-5xl font-extrabold tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isTechPillarTitleVisible && "opacity-100 translate-y-0"
              )}
            >
              Core <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">Technology Stack</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              HyreSense is built on a foundation of cutting-edge technologies, ensuring robust, scalable, and intelligent solutions.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {techPillars.map((pillar, index) => {
              const [pillarRef, isPillarVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });
              return (
                <div
                  key={pillar.name}
                  ref={pillarRef}
                  className={cn(
                    "opacity-0 translate-y-10 transition-all duration-500 ease-out",
                    isPillarVisible && "opacity-100 translate-y-0"
                  )}
                  style={{ transitionDelay: isPillarVisible ? `${index * 150}ms` : '0ms' }}
                >
                  <Card className="text-center shadow-xl hover:shadow-2xl hover:shadow-primary/20 dark:hover:shadow-primary/30 transition-all duration-300 h-full bg-card/80 backdrop-blur-md border-border/50 hover:border-primary/50 transform hover:-translate-y-1">
                    <CardHeader>
                        <BarChart3 className="h-10 w-10 text-primary mx-auto mb-3"/>
                        <CardTitle className="text-xl">{pillar.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">{pillar.description}</p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision for the Future Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
           <div
            ref={visionTitleRef}
            className={cn(
              "opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isVisionTitleVisible && "opacity-100 translate-y-0"
            )}
          >
            <Telescope className="h-16 w-16 text-accent mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-4">
              The Horizon Ahead
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our journey of innovation is continuous. We are committed to pushing the boundaries of HR technology, developing next-generation tools that anticipate market shifts, foster equitable opportunities, and unlock human potential on a global scale.
            </p>
            <Button variant="outline" size="lg" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary hover:border-primary group shadow-sm hover:shadow-md hover:shadow-primary/20 transition-all">
              Join Our Early Access Program <Sparkles className="ml-2 h-5 w-5 group-hover:animate-ping_once_fast" />
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 
            ref={ctaTitleRef}
            className={cn(
              "text-3xl lg:text-4xl font-extrabold tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isCtaTitleVisible && "opacity-100 translate-y-0"
            )}
          >
            Experience the HyreSense Revolution
          </h2>
          <p 
            ref={ctaSubtitleRef}
            className={cn(
              "mt-4 text-lg opacity-90 max-w-xl mx-auto opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isCtaSubtitleVisible && "opacity-100 translate-y-0 delay-200"
            )}
            style={{ transitionDelay: isCtaSubtitleVisible ? '200ms' : '0ms' }}
          >
            Whether you're seeking your dream role or building a world-class team, HyreSense provides the intelligent edge you need.
          </p>
          <div 
            ref={ctaButtonRef}
            className={cn(
              "mt-10 opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isCtaButtonVisible && "opacity-100 translate-y-0 delay-400"
            )}
            style={{ transitionDelay: isCtaButtonVisible ? '400ms' : '0ms' }}
          >
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105" asChild>
              <Link href="/">Get Started with HyreSense <Zap className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>
      <style jsx global>{`
        @keyframes ping_once_fast {
          0%, 100% { transform: scale(1); opacity: 1; }
          25% { transform: scale(1.5); opacity: 0.7; }
          50% { transform: scale(1); opacity: 1; }
        }
        .animate-ping_once_fast {
          animation: ping_once_fast 0.6s cubic-bezier(0, 0, 0.2, 1);
        }
        .animation-delay-random {
          animation-delay: ${Math.random() * 1}s;
        }
         @keyframes pulse_slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-pulse_slow {
          animation: pulse_slow 3s infinite ease-in-out;
        }
        @keyframes pulse_fast {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        .animate-pulse_fast {
          animation: pulse_fast 1.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
