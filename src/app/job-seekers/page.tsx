
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Lightbulb, BarChart3, Search, Sparkles, UserPlus, Target, Smartphone, TrendingUp, Compass, MessageSquare, ShieldCheck, ArrowRight, Briefcase, Zap, Brain, CheckCircle2, Palette, Server, Code2, BriefcaseBusiness, ZapIcon, GraduationCap, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { MobileAppDemo } from '@/components/landing/MobileAppDemo';
import { UserIcon } from '@heroicons/react/24/solid';

const whyHyreSenseFeatures = [
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: "Precision AI Matching",
    description: "Our advanced AI connects you with jobs that truly fit your unique skills and career goals, far beyond simple keyword matching."
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: "AI Skill Gap Analysis",
    description: "Identify skill gaps for your dream job and get personalized learning paths to boost your qualifications and career growth."
  },
  {
    icon: <Smartphone className="h-8 w-8 text-primary" />,
    title: "Intuitive Swipe Interface",
    description: "Job searching that's actually engaging. Swipe through tailored opportunities and apply with ease on any device."
  },
  {
    icon: <Compass className="h-8 w-8 text-primary" />,
    title: "Career Path Navigation",
    description: "Gain valuable insights into market demands, track your profile strength, and receive AI-driven advice to steer your career."
  }
];

const howItWorksSteps = [
  {
    icon: <UserPlus className="h-10 w-10 text-accent" />,
    title: "1. Create Profile",
    description: "Build a standout profile showcasing skills and experience."
  },
  {
    icon: <Brain className="h-10 w-10 text-accent" />,
    title: "2. AI Matching",
    description: "Receive a curated feed of jobs perfectly matched to you."
  },
  {
    icon: <CheckCircle2 className="h-10 w-10 text-accent" />,
    title: "3. Swipe & Apply",
    description: "Engage with roles and apply to your dream jobs with a tap."
  },
  {
    icon: <Sparkles className="h-10 w-10 text-accent" />,
    title: "4. Get Hired",
    description: "Track applications, get interview tips, and land your next role."
  }
];

const testimonials = [
  {
    quote: "HyreSense's AI matching was incredibly accurate. I found a role that perfectly matched my niche skills in just two weeks!",
    name: "Priya Sharma",
    role: "Data Scientist",
  },
  {
    quote: "The skill gap analysis feature is a game-changer. It showed me exactly what I needed to learn to land my dream tech job.",
    name: "Rohan Patel",
    role: "Aspiring Cloud Engineer",
  },
  {
    quote: "I loved the swipe interface! It made job searching feel less like a chore and more like an exciting discovery process.",
    name: "Ananya Gupta",
    role: "Marketing Specialist",
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
    answer: "HyreSense offers a comprehensive free tier for job seekers, providing access to AI job matching, profile creation, and application tracking. We also offer paid plans with advanced features to accelerate your job search."
  }
];

const pricingFeatures = [
    { feature: 'Daily Job Swipes', free: '20', basic: '50', premium: <strong>Unlimited</strong> },
    { feature: 'AI Job Matching', free: true, basic: <strong>Advanced</strong>, premium: <strong>Hyper-Precise</strong> },
    { feature: 'Application Self-Feedback', free: true, basic: <strong>AI-Powered</strong>, premium: <strong>Deep Analysis</strong> },
    { feature: 'Profile Review by AI', free: false, basic: true, premium: <strong>Enhanced</strong> },
    { feature: 'Verified Job Cards', free: false, basic: true, premium: true },
    { feature: 'Priority Application Listing', free: false, basic: true, premium: true },
    { feature: 'Mock Interviews', free: false, basic: false, premium: <strong>1 / month</strong> },
    { feature: 'Direct Skill Training Access', free: false, basic: false, premium: true },
];


export default function JobSeekersPage() {
  const [heroTitleRef, isHeroTitleVisible] = useScrollAnimation<HTMLHeadingElement>();
  const [heroSubtitleRef, isHeroSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>();
  const [heroButtonRef, isHeroButtonVisible] = useScrollAnimation<HTMLDivElement>();
  const [heroImageRef, isHeroImageVisible] = useScrollAnimation<HTMLDivElement>();

  const [whyTitleRef, isWhyTitleVisible] = useScrollAnimation<HTMLHeadingElement>();
  const [whySubtitleRef, isWhySubtitleVisible] = useScrollAnimation<HTMLParagraphElement>();
  
  const [pricingTitleRef, isPricingTitleVisible] = useScrollAnimation<HTMLHeadingElement>();
  const [pricingSubtitleRef, isPricingSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>();

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
              Stop endlessly scrolling through irrelevant job postings. HyreSense uses AI to deliver opportunities perfectly aligned with your skills and career goals.
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
                <Link href="/signup">Get Started Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
          <div 
            ref={heroImageRef}
            className={cn(
              "flex items-center justify-center opacity-0 transition-all duration-1000 ease-out",
              isHeroImageVisible ? "opacity-100 scale-100 delay-200" : "scale-90"
            )}
            style={{ transitionDelay: isHeroImageVisible ? '200ms' : '0ms' }}
          >
             <MobileAppDemo />
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
              More Than a Job Board, It's Your Career Co-Pilot
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
                  <div className="flex items-start gap-4">
                        <span className="p-3 bg-primary/10 rounded-full group-hover:bg-accent/10 transition-colors">
                           {React.cloneElement(feature.icon, { className: cn(feature.icon.props.className, "group-hover:text-accent transition-colors") })}
                        </span>
                        <div>
                            <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                            <p className="mt-1 text-muted-foreground">{feature.description}</p>
                        </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* How it works */}
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
                      <div className="p-3 bg-accent/10 rounded-full inline-block mb-3">
                        {step.icon}
                      </div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2
              ref={pricingTitleRef}
              className={cn(
                "text-3xl lg:text-4xl font-extrabold tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isPricingTitleVisible && "opacity-100 translate-y-0"
              )}
            >
              Choose Your Plan
            </h2>
            <p
              ref={pricingSubtitleRef}
              className={cn(
                "mt-4 text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isPricingSubtitleVisible && "opacity-100 translate-y-0 delay-200"
              )}
              style={{ transitionDelay: isPricingSubtitleVisible ? '200ms' : '0ms' }}
            >
              Start for free or upgrade to unlock powerful features that accelerate your job search.
            </p>
          </div>
          
           <Card className="shadow-2xl border-2 border-primary/20 overflow-hidden">
                <div className="grid grid-cols-4">
                    {/* Feature Column */}
                    <div className="col-span-1 p-4 bg-muted/50">
                        <h3 className="text-lg font-bold h-12 flex items-end">Features</h3>
                    </div>
                    {/* Plan Columns */}
                    <div className="col-span-1 p-4 text-center border-l"><h3 className="text-lg font-bold h-12 flex items-end justify-center">Free</h3></div>
                    <div className="col-span-1 p-4 text-center border-l bg-primary/10"><h3 className="text-lg font-bold text-primary h-12 flex items-end justify-center">Basic</h3></div>
                    <div className="col-span-1 p-4 text-center border-l"><h3 className="text-lg font-bold h-12 flex items-end justify-center">Premium</h3></div>
                </div>
                
                {pricingFeatures.map((item, index) => (
                    <div key={index} className="grid grid-cols-4 border-t">
                        <div className="col-span-1 p-4 bg-muted/50 font-medium">{item.feature}</div>
                        <div className="col-span-1 p-4 text-center flex items-center justify-center border-l">
                            {typeof item.free === 'boolean' ? (item.free ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <div className="h-5 w-px bg-border"/>) : <span className="text-muted-foreground">{item.free}</span>}
                        </div>
                        <div className="col-span-1 p-4 text-center flex items-center justify-center border-l bg-primary/10">
                            {typeof item.basic === 'boolean' ? (item.basic ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <div className="h-5 w-px bg-border"/>) : <span className="font-semibold text-primary">{item.basic}</span>}
                        </div>
                         <div className="col-span-1 p-4 text-center flex items-center justify-center border-l">
                           {typeof item.premium === 'boolean' ? (item.premium ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <div className="h-5 w-px bg-border"/>) : <span className="font-semibold text-primary">{item.premium}</span>}
                        </div>
                    </div>
                ))}
                
                {/* Price and CTA row */}
                <div className="grid grid-cols-4 border-t">
                    <div className="col-span-1 p-4 bg-muted/50"></div>
                    <div className="col-span-1 p-4 text-center border-l flex flex-col justify-center items-center">
                        <p className="text-3xl font-extrabold">₹0</p>
                        <Button variant="outline" className="w-full mt-3">Get Started</Button>
                    </div>
                     <div className="col-span-1 p-4 text-center border-l bg-primary/10 flex flex-col justify-center items-center">
                        <p className="text-3xl font-extrabold text-primary">₹1260</p>
                        <p className="text-sm text-muted-foreground -mt-1 mb-2">/month</p>
                        <Button className="w-full mt-auto">Choose Basic</Button>
                    </div>
                    <div className="col-span-1 p-4 text-center border-l flex flex-col justify-center items-center">
                        <div>
                           <p className="text-3xl font-extrabold">₹7560</p>
                           <p className="text-sm text-muted-foreground -mt-1 mb-2">/6 months</p>
                        </div>
                        <Button variant="outline" className="w-full mt-auto">Choose Premium</Button>
                    </div>
                </div>
            </Card>
            
            <p className="text-center text-sm text-muted-foreground mt-8">
                ✨ <span className="font-semibold text-primary">Premium users match 3x faster</span> and unlock double the interview chances.
            </p>
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
                        <Avatar className="h-12 w-12 border-2 border-primary bg-muted">
                          <UserIcon className="h-8 w-8 text-primary/70 m-auto" />
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
      <section className="py-16 sm:py-24" id="faq">
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
              <Link href="/signup">Sign Up & Find Your Future <ArrowRight className="ml-2 h-5 w-5" /></Link>
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
