
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Lightbulb, BarChart3, Search, Sparkles, UserPlus, Target, Smartphone, TrendingUp, Compass, MessageSquare, ShieldCheck, ArrowRight, Briefcase, Zap, Brain, CheckCircle2, Palette, Server, Code2, BriefcaseBusiness, ZapIcon, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const whyHyreSenseFeatures = [
  {
    icon: <Target className="h-10 w-10 text-primary" />,
    title: "Precision AI Matching",
    description: "Stop scrolling endlessly. Our advanced AI understands your unique skills and aspirations to connect you with jobs that truly fit."
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    title: "Skill Enhancement Hub",
    description: "Identify skill gaps with AI analysis and discover personalized learning paths to boost your qualifications and career growth."
  },
  {
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    title: "Intuitive Job Discovery",
    description: "Experience a seamless and engaging job search. Swipe through tailored opportunities and apply with ease on any device."
  },
  {
    icon: <Compass className="h-10 w-10 text-primary" />,
    title: "Career Path Navigation",
    description: "Gain valuable insights into market demands, track your profile strength, and receive AI-driven advice to steer your career."
  }
];

const howItWorksSteps = [
  {
    icon: <UserPlus className="h-12 w-12 text-accent" />,
    title: "1. Create Your Standout Profile",
    description: "Build a comprehensive profile in minutes. Highlight your skills, experience, and career ambitions to attract the right employers."
  },
  {
    icon: <Brain className="h-12 w-12 text-accent" />,
    title: "2. AI-Powered Discovery",
    description: "Let our intelligent algorithms work for you. Receive a curated feed of job opportunities perfectly matched to your profile and preferences."
  },
  {
    icon: <CheckCircle2 className="h-12 w-12 text-accent" />,
    title: "3. Engage & Apply with Ease",
    description: "Swipe through personalized recommendations, learn more about exciting roles, and apply to your dream jobs with a simple tap."
  },
  {
    icon: <Sparkles className="h-12 w-12 text-accent" />,
    title: "4. Grow, Succeed & Thrive",
    description: "Track your applications, get interview tips, enhance your skills, and connect with leading companies to accelerate your career."
  }
];

const testimonials = [
  {
    quote: "HyreSense's AI matching was incredibly accurate. I found a role that perfectly matched my niche skills in just two weeks!",
    name: "Jessica M.",
    role: "Data Scientist",
    avatar: "https://placehold.co/80x80.png?text=JM",
    dataAiHint: "profile woman"
  },
  {
    quote: "The skill gap analysis feature is a game-changer. It showed me exactly what I needed to learn to land my dream tech job.",
    name: "David K.",
    role: "Aspiring Cloud Engineer",
    avatar: "https://placehold.co/80x80.png?text=DK",
    dataAiHint: "profile man"
  },
  {
    quote: "I loved the swipe interface! It made job searching feel less like a chore and more like an exciting discovery process.",
    name: "Aisha B.",
    role: "Marketing Specialist",
    avatar: "https://placehold.co/80x80.png?text=AB",
    dataAiHint: "profile person"
  }
];

const faqItems = [
  {
    question: "How does HyreSense's AI matching work for job seekers?",
    answer: "Our AI analyzes your profile, skills, experience, and career goals. It then compares this with thousands of job listings to find opportunities that are not just a keyword match, but a genuine fit for your aspirations and qualifications, including cultural fit and growth potential."
  },
  {
    question: "Is my personal data safe and secure on HyreSense?",
    answer: "Absolutely. We prioritize your privacy and data security. All personal information is encrypted, and we adhere to strict data protection regulations. You have full control over your data and who sees it."
  },
  {
    question: "How can I make my profile stand out to employers?",
    answer: "Complete your profile thoroughly, including detailed descriptions of your past roles and achievements. Highlight quantifiable results whenever possible. Regularly update your skills and consider our AI's suggestions for profile enhancements."
  },
  {
    question: "Are there any costs for job seekers to use HyreSense?",
    answer: "HyreSense offers a comprehensive free tier for job seekers, providing access to AI job matching, profile creation, and application tracking. We may offer premium features in the future for accelerated career services."
  }
];

export default function JobSeekersPage() {
  const [heroTitleRef, isHeroTitleVisible] = useScrollAnimation<HTMLHeadingElement>();
  const [heroSubtitleRef, isHeroSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>();
  const [heroButtonRef, isHeroButtonVisible] = useScrollAnimation<HTMLDivElement>();
  const [heroImageRef, isHeroImageVisible] = useScrollAnimation<HTMLDivElement>();

  const [whyTitleRef, isWhyTitleVisible] = useScrollAnimation<HTMLHeadingElement>();
  const [whySubtitleRef, isWhySubtitleVisible] = useScrollAnimation<HTMLParagraphElement>();

  const [howTitleRef, isHowTitleVisible] = useScrollAnimation<HTMLHeadingElement>();
  const [howSubtitleRef, isHowSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>();

  const [aiActionTitleRef, isAiActionTitleVisible] = useScrollAnimation<HTMLHeadingElement>();
  const [aiActionSubtitleRef, isAiActionSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>();
  const [aiActionImageRef, isAiActionImageVisible] = useScrollAnimation<HTMLDivElement>();

  const [testimonialsTitleRef, isTestimonialsTitleVisible] = useScrollAnimation<HTMLHeadingElement>();
  const [testimonialsSubtitleRef, isTestimonialsSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>();
  
  const [faqTitleRef, isFaqTitleVisible] = useScrollAnimation<HTMLHeadingElement>();
  const [faqSubtitleRef, isFaqSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>();
  const [faqAccordionRef, isFaqAccordionVisible] = useScrollAnimation<HTMLDivElement>();

  const [ctaTitleRef, isCtaTitleVisible] = useScrollAnimation<HTMLHeadingElement>();
  const [ctaSubtitleRef, isCtaSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>();
  const [ctaButtonRef, isCtaButtonVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <div className="text-foreground bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-transparent to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1
              ref={heroTitleRef}
              className={cn(
                "text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isHeroTitleVisible && "opacity-100 translate-y-0"
              )}
            >
              Find Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Dream Job</span>, Faster.
            </h1>
            <p
              ref={heroSubtitleRef}
              className={cn(
                "mt-6 text-lg text-muted-foreground sm:text-xl opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isHeroSubtitleVisible && "opacity-100 translate-y-0 delay-200"
              )}
              style={{ transitionDelay: isHeroSubtitleVisible ? '200ms' : '0ms' }}
            >
              Leverage the power of AI to discover opportunities perfectly aligned with your skills, experience, and career aspirations. Your next chapter starts with HyreSense.
            </p>
            <div
              ref={heroButtonRef}
              className={cn(
                "mt-10 opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isHeroButtonVisible && "opacity-100 translate-y-0 delay-400"
              )}
              style={{ transitionDelay: isHeroButtonVisible ? '400ms' : '0ms' }}
            >
              <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105">
                <Link href="#cta-job-seeker">Get Started Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
          <div 
            ref={heroImageRef}
            className={cn(
              "relative group opacity-0 transition-all duration-1000 ease-out",
              isHeroImageVisible ? "opacity-100 scale-100 delay-200" : "scale-90"
            )}
            style={{ transitionDelay: isHeroImageVisible ? '200ms' : '0ms' }}
          >
            <div className="relative bg-card/80 backdrop-blur-md border-2 border-primary/20 rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-lg mx-auto min-h-[400px] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-primary">Your Career Snapshot</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">AI-Powered Insights by HyreSense</p>
                  </div>
                  <Brain className="h-8 w-8 text-accent opacity-80"/>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col items-center justify-center p-4 bg-muted/50 dark:bg-slate-800/50 rounded-lg shadow-md group-hover:bg-muted/70 transition-colors">
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                          className="text-primary/20 dark:text-primary/30"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          strokeWidth="3"
                        />
                        <path
                          className="text-accent"
                          strokeDasharray={`${isHeroImageVisible ? 92 : 0}, 100`} 
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          style={{transition: 'stroke-dasharray 0.8s ease-out 0.3s'}}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl sm:text-4xl font-bold text-accent">92%</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm mt-2 text-muted-foreground text-center font-medium">Profile Strength</p>
                  </div>

                  <div className="p-4 bg-muted/50 dark:bg-slate-800/50 rounded-lg shadow-md group-hover:bg-muted/70 transition-colors">
                    <h4 className="text-sm sm:text-base font-semibold text-foreground mb-2 sm:mb-3">Top AI Skill Matches</h4>
                    <div className="space-y-1.5">
                      {['React', 'UX Design', 'Agile Methodology', 'Data Analysis'].slice(0,3).map(skill => (
                        <Badge key={skill} variant="secondary" className="text-xs px-2 py-0.5 bg-primary/10 text-primary/90 border-primary/30 block text-center sm:inline-block sm:text-left truncate">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto p-3 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-lg shadow-inner">
                <div className="flex items-center gap-2">
                  <ZapIcon className="h-5 w-5 text-primary flex-shrink-0"/>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-primary">AI Growth Tip:</p>
                    <p className="text-[11px] sm:text-xs text-muted-foreground">Showcase your latest 'Project X' to highlight advanced 'React Hook' usage!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why HyreSense Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2
              ref={whyTitleRef}
              className={cn(
                "text-3xl lg:text-4xl font-extrabold tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isWhyTitleVisible && "opacity-100 translate-y-0"
              )}
            >
              Unlock Your Career Potential with HyreSense
            </h2>
            <p
              ref={whySubtitleRef}
              className={cn(
                "mt-4 text-lg text-muted-foreground max-w-3xl mx-auto opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isWhySubtitleVisible && "opacity-100 translate-y-0 delay-200"
              )}
              style={{ transitionDelay: isWhySubtitleVisible ? '200ms' : '0ms' }}
            >
              We go beyond traditional job boards, offering intelligent tools and personalized guidance to help you navigate the modern job market and achieve your professional goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {whyHyreSenseFeatures.map((feature, index) => {
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
                  <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full border-l-4 border-primary hover:border-accent group">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4">
                        <span className="p-3 bg-primary/10 rounded-full group-hover:bg-accent/10 transition-colors">
                           {React.cloneElement(feature.icon, { className: cn(feature.icon.props.className, "group-hover:text-accent transition-colors") })}
                        </span>
                        <CardTitle className="text-2xl group-hover:text-accent transition-colors">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-base">{feature.description}</p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24 bg-secondary/30 dark:bg-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2
              ref={howTitleRef}
              className={cn(
                "text-3xl lg:text-4xl font-extrabold tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isHowTitleVisible && "opacity-100 translate-y-0"
              )}
            >
              Your Journey to a Fulfilling Career: <span className="text-primary">Simple Steps</span>
            </h2>
            <p
              ref={howSubtitleRef}
              className={cn(
                "mt-4 text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isHowSubtitleVisible && "opacity-100 translate-y-0 delay-200"
              )}
              style={{ transitionDelay: isHowSubtitleVisible ? '200ms' : '0ms' }}
            >
              Follow our streamlined process designed to connect you with the right opportunities efficiently.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => {
              const [stepRef, isStepVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });
              return (
                <div
                  key={step.title}
                  ref={stepRef}
                  className={cn(
                    "opacity-0 translate-y-10 transition-all duration-500 ease-out",
                    isStepVisible && "opacity-100 translate-y-0"
                  )}
                  style={{ transitionDelay: isStepVisible ? `${index * 150}ms` : '0ms' }}
                >
                  <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 h-full bg-card hover:border-accent border-2 border-transparent">
                    <CardHeader className="items-center">
                      <div className="p-4 bg-accent/10 rounded-full inline-block mb-3">
                        {step.icon}
                      </div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* AI in Action Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <h2 
              ref={aiActionTitleRef}
              className={cn(
                "text-3xl lg:text-4xl font-extrabold tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isAiActionTitleVisible && "opacity-100 translate-y-0"
              )}
            >
              See HyreSense AI in Action
            </h2>
            <p 
              ref={aiActionSubtitleRef}
              className={cn(
                "mt-4 text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isAiActionSubtitleVisible && "opacity-100 translate-y-0 delay-200"
              )}
              style={{ transitionDelay: isAiActionSubtitleVisible ? '200ms' : '0ms' }}
            >
              Imagine a job feed that truly understands you. Discover roles tailored to your unique profile.
            </p>
          </div>
          <div 
            ref={aiActionImageRef}
            className={cn(
              "opacity-0 scale-90 transition-all duration-1000 ease-out",
              isAiActionImageVisible && "opacity-100 scale-100 delay-200"
            )}
            style={{ transitionDelay: isAiActionImageVisible ? '200ms' : '0ms' }}
          >
            <Card className="max-w-2xl mx-auto shadow-2xl overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-card to-muted/50">
              <CardHeader className="bg-primary/5 p-4">
                <CardTitle className="text-primary text-lg">Your Personalized Job Matches</CardTitle>
              </CardHeader>
              <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Senior UI/UX Designer", company: "Creative Solutions Inc.", match: 95, logoIcon: <Palette className="h-8 w-8 text-primary"/>, skills: ["Figma", "Prototyping", "User Research"] },
                  { title: "Frontend Developer (React)", company: "Tech Innovators Co.", match: 92, logoIcon: <Code2 className="h-8 w-8 text-accent"/>, skills: ["React", "TypeScript", "Next.js"]  }
                ].map(job => (
                  <Card key={job.title} className="shadow-md hover:shadow-lg transition-shadow bg-background group hover:border-primary/50 border border-transparent">
                    <CardHeader className="pb-2 items-center">
                      <div className="p-3 bg-muted rounded-full mb-3 group-hover:bg-primary/10 transition-colors">
                        {job.logoIcon}
                      </div>
                      <CardTitle className="text-md text-center">{job.title}</CardTitle>
                      <CardDescription className="text-primary text-center group-hover:text-accent transition-colors">{job.company}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-xs">
                      <p className="font-semibold text-green-500 text-center text-base mb-2">{job.match}% AI Match</p>
                      <div className="flex flex-wrap gap-1 justify-center mb-2">
                          {job.skills.map(skill => <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>)}
                      </div>
                    </CardContent>
                    <Button variant="link" size="sm" className="w-full text-xs text-primary group-hover:text-accent transition-colors">View Details <ArrowRight className="ml-1 h-3 w-3"/></Button>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 bg-muted/30 dark:bg-slate-800/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <h2 
              ref={testimonialsTitleRef}
              className={cn(
                "text-3xl lg:text-4xl font-extrabold tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isTestimonialsTitleVisible && "opacity-100 translate-y-0"
              )}
            >
              Success Stories from <span className="text-primary">Job Seekers Like You</span>
            </h2>
            <p 
              ref={testimonialsSubtitleRef}
              className={cn(
                "mt-4 text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isTestimonialsSubtitleVisible && "opacity-100 translate-y-0 delay-200"
              )}
              style={{ transitionDelay: isTestimonialsSubtitleVisible ? '200ms' : '0ms' }}
            >
              Hear how HyreSense has helped professionals find fulfilling careers and achieve their goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              const [cardRef, isCardVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });
              return (
                <div
                  key={testimonial.name}
                  ref={cardRef}
                  className={cn(
                    "opacity-0 translate-y-10 transition-all duration-500 ease-out",
                    isCardVisible && "opacity-100 translate-y-0"
                  )}
                  style={{ transitionDelay: isCardVisible ? `${index * 150}ms` : '0ms' }}
                >
                  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full bg-card">
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <blockquote className="text-muted-foreground italic flex-grow text-sm">"{testimonial.quote}"</blockquote>
                      <div className="mt-6 flex items-center">
                        <Avatar className="h-12 w-12 border-2 border-primary">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint}/>
                          <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <p className="font-semibold text-foreground">{testimonial.name}</p>
                          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="text-center mb-12">
            <h2 
              ref={faqTitleRef}
              className={cn(
                "text-3xl lg:text-4xl font-extrabold tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isFaqTitleVisible && "opacity-100 translate-y-0"
              )}
            >
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p 
              ref={faqSubtitleRef}
              className={cn(
                "mt-4 text-lg text-muted-foreground max-w-xl mx-auto opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isFaqSubtitleVisible && "opacity-100 translate-y-0 delay-200"
              )}
              style={{ transitionDelay: isFaqSubtitleVisible ? '200ms' : '0ms' }}
            >
              Got questions? We've got answers. Find quick solutions to common inquiries below.
            </p>
          </div>
          <div
            ref={faqAccordionRef}
            className={cn(
              "opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isFaqAccordionVisible && "opacity-100 translate-y-0 delay-300"
            )}
            style={{ transitionDelay: isFaqAccordionVisible ? '300ms' : '0ms' }}
          >
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqItems.map((item, index) => (
                <AccordionItem value={`item-${index + 1}`} key={index} className="bg-card shadow-md hover:shadow-lg transition-shadow rounded-lg border border-border data-[state=open]:border-primary">
                  <AccordionTrigger className="p-4 text-left font-medium text-base hover:no-underline data-[state=open]:text-primary data-[state=open]:font-semibold">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="p-4 pt-0 text-muted-foreground text-sm">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta-job-seeker" className="py-16 sm:py-24 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 
            ref={ctaTitleRef}
            className={cn(
              "text-3xl lg:text-4xl font-extrabold tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isCtaTitleVisible && "opacity-100 translate-y-0"
            )}
          >
            Ready to Take the Next Step in Your Career?
          </h2>
          <p 
            ref={ctaSubtitleRef}
            className={cn(
              "mt-4 text-lg opacity-90 max-w-xl mx-auto opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isCtaSubtitleVisible && "opacity-100 translate-y-0 delay-200"
            )}
            style={{ transitionDelay: isCtaSubtitleVisible ? '200ms' : '0ms' }}
          >
            Join HyreSense today and let our AI-powered platform guide you to your dream job. It's free, intuitive, and built for your success.
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
              <Link href="/">Sign Up & Find Your Future <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
             <p className="mt-6 text-sm opacity-80">
              Already have an account? <Link href="/login" className="font-semibold underline hover:opacity-90">Log In</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
