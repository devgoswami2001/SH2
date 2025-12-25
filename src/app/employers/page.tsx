
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Users, Target, BarChartHorizontalBig, Filter, Clock, Zap, Brain, UserCheck, LineChart, Building, Briefcase, Users2, ArrowRight, ThumbsUp, ZapIcon, Gauge, PackageSearch, CheckCircle2, DollarSign } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const whyHyreSenseFeatures = [
  {
    icon: <UserCheck className="h-10 w-10 text-primary" />,
    title: "AI-Powered Candidate Sourcing",
    description: "Access a diverse pool of qualified candidates matched by our intelligent algorithms, significantly reducing manual screening time."
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "Reduced Time-to-Hire",
    description: "Streamline your recruitment pipeline with smart automation and efficient workflows, filling critical roles faster."
  },
  {
    icon: <LineChart className="h-10 w-10 text-primary" />,
    title: "Data-Driven Hiring Decisions",
    description: "Leverage comprehensive analytics and insights on candidates and market trends to make informed, strategic hiring choices."
  },
  {
    icon: <Building className="h-10 w-10 text-primary" />,
    title: "Improved Quality of Hire",
    description: "Identify top performers with a higher likelihood of success and long-term retention through deeper skill and culture-fit analysis."
  }
];

const howItWorksSteps = [
  {
    icon: <Briefcase className="h-12 w-12 text-accent" />,
    title: "1. Post Your Job & Define Needs",
    description: "Easily create detailed job postings. Specify skills, experience, and company culture to attract the right talent."
  },
  {
    icon: <Brain className="h-12 w-12 text-accent" />,
    title: "2. AI-Curated Candidate Pool",
    description: "Our AI instantly scans and ranks candidates, presenting you with a shortlist of the most qualified and best-fit individuals."
  },
  {
    icon: <Filter className="h-12 w-12 text-accent" />,
    title: "3. Review & Engage Top Talent",
    description: "Utilize advanced filters and detailed profiles to review top candidates. Initiate contact and schedule interviews seamlessly."
  },
  {
    icon: <Users2 className="h-12 w-12 text-accent" />,
    title: "4. Hire with Confidence",
    description: "Make data-backed hiring decisions. Onboard your next great employee and track hiring success through our platform."
  }
];

const enterpriseFeatures = [
    "Easy Job Card Postings",
    "Quick profiles of candidates perfectly aligned",
    "HR login & Analytics",
    "Quick job card creation",
    "Candidate Statistics",
    "Low-cost job cards",
    "Website with Logins",
    "Advanced CRM",
    "Minimize the time and efforts",
    "Low calls interactions",
    "Low job post costing",
    "Multiple login Add-ins for HR Recruiter",
    "HR user separate Login with password",
];


const testimonials = [
  {
    quote: "HyreSense revolutionized how we find talent. The AI matching is incredibly accurate and has saved us countless hours.",
    name: "Vikram Singh",
    role: "Director of Talent Acquisition, Innovate Corp",
    avatar: "https://placehold.co/80x80.png?text=VS",
    dataAiHint: "profile manager"
  },
  {
    quote: "The AI candidate ranking from HyreSense is a game-changer. We're making better hiring decisions faster than ever before.",
    name: "Sunita Sharma",
    role: "HR Manager, TechGeniuses",
    avatar: "https://placehold.co/80x80.png?text=SS",
    dataAiHint: "profile woman hr"
  },
  {
    quote: "Thanks to HyreSense, our time-to-hire has decreased by 40%, and the quality of candidates is significantly higher.",
    name: "Arjun Mehta",
    role: "CEO, StartupFast",
    avatar: "https://placehold.co/80x80.png?text=AM",
    dataAiHint: "profile ceo"
  }
];

const faqItems = [
  {
    question: "How does HyreSense help employers find qualified candidates?",
    answer: "HyreSense's AI algorithms analyze job requirements and company culture, then match them against a vast database of job seeker profiles. We go beyond keywords to assess skills, experience, and potential cultural fit, providing you with a ranked list of top prospects."
  },
  {
    question: "Can HyreSense integrate with our existing ATS?",
    answer: "We are continuously working on expanding our integration capabilities. Please contact our sales team to discuss your specific ATS and integration needs. Our platform is also designed to be highly effective as a standalone solution."
  },
  {
    question: "What kind of analytics does HyreSense provide to employers?",
    answer: "HyreSense offers insights into candidate demographics, skill distributions, time-to-hire metrics, and the effectiveness of your job postings. These analytics help you refine your hiring strategy and make data-driven decisions."
  },
  {
    question: "Is HyreSense suitable for small businesses and startups?",
    answer: "Yes! HyreSense is designed to be scalable and affordable for businesses of all sizes. We offer flexible plans that cater to the unique needs of startups, SMBs, and large enterprises, helping you compete for top talent effectively."
  }
];

export default function EmployersPage() {
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
  const [aiActionShowcaseRef, isAiActionShowcaseVisible] = useScrollAnimation<HTMLDivElement>();

  const [testimonialsTitleRef, isTestimonialsTitleVisible] = useScrollAnimation<HTMLHeadingElement>();
  const [testimonialsSubtitleRef, isTestimonialsSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>();
  
  const [faqTitleRef, isFaqTitleVisible] = useScrollAnimation<HTMLHeadingElement>();
  const [faqSubtitleRef, isFaqSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>();
  const [faqAccordionRef, isFaqAccordionVisible] = useScrollAnimation<HTMLDivElement>();

  const [ctaTitleRef, isCtaTitleVisible] = useScrollAnimation<HTMLHeadingElement>();
  const [ctaSubtitleRef, isCtaSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>();
  const [ctaButtonRef, isCtaButtonVisible] = useScrollAnimation<HTMLDivElement>();

  const [enterprisePlanTitleRef, isEnterprisePlanTitleVisible] = useScrollAnimation<HTMLHeadingElement>();
  const [enterprisePlanSubtitleRef, isEnterprisePlanSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>();
  const [enterprisePlanCardRef, isEnterprisePlanCardVisible] = useScrollAnimation<HTMLDivElement>();


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
              Build Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Dream Team</span>, Smarter.
            </h1>
            <p
              ref={heroSubtitleRef}
              className={cn(
                "mt-6 text-lg text-muted-foreground sm:text-xl opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isHeroSubtitleVisible && "opacity-100 translate-y-0 delay-200"
              )}
              style={{ transitionDelay: isHeroSubtitleVisible ? '200ms' : '0ms' }}
            >
              Unlock a new era of talent acquisition. HyreSense empowers you with AI-driven insights to find, attract, and hire the perfect candidates, faster than ever.
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
                <Link href="#cta-employer">Request a Demo <ArrowRight className="ml-2 h-5 w-5" /></Link>
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
             <div className="relative bg-card/80 backdrop-blur-md border-2 border-primary/20 rounded-xl shadow-2xl p-4 sm:p-6 w-full max-w-xl mx-auto min-h-[450px] flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-4 sm:mb-6">
                        <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-primary">AI Hiring Command Center</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">Powered by HyreSense Intelligence</p>
                        </div>
                        <Brain className="h-8 w-8 text-accent opacity-80"/>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <div className="sm:col-span-2 flex flex-col items-center justify-center p-3 sm:p-4 bg-muted/50 dark:bg-slate-800/50 rounded-lg shadow-md group-hover:bg-muted/70 transition-colors">
                            <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-1.5 text-center font-medium">Top Candidate Match</p>
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
                                    strokeDasharray={`${isHeroImageVisible ? 94 : 0}, 100`} 
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                    style={{transition: 'stroke-dasharray 0.8s ease-out 0.3s'}}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-3xl sm:text-4xl font-bold text-accent">94%</span>
                                </div>
                            </div>
                            <p className="text-xs sm:text-sm mt-1.5 sm:mt-2 text-foreground text-center font-semibold">Sarah Miller</p>
                            <p className="text-[10px] sm:text-xs text-muted-foreground text-center">Sr. Software Engineer</p>
                        </div>

                        <div className="sm:col-span-3 p-3 sm:p-4 bg-muted/50 dark:bg-slate-800/50 rounded-lg shadow-md group-hover:bg-muted/70 transition-colors">
                            <h4 className="text-sm sm:text-base font-semibold text-foreground mb-2 sm:mb-3">Active Roles Overview</h4>
                            <div className="space-y-2 sm:space-y-3">
                                {[
                                    { role: "Frontend Developer", matches: "5 High-Potential", icon: <Users className="h-4 w-4 text-green-500"/>, skills: ["React", "Vue.js"] },
                                    { role: "Marketing Lead", matches: "3 Strong Fits", icon: <Users className="h-4 w-4 text-blue-500"/>, skills: ["SEO", "Strategy"] },
                                    { role: "Data Analyst", matches: "Ready for Review", icon: <PackageSearch className="h-4 w-4 text-yellow-500"/>, skills: ["SQL", "Python"] }
                                ].map(item => (
                                    <div key={item.role} className="pb-1.5 border-b border-border/30 last:border-b-0">
                                        <div className="flex justify-between items-center">
                                          <p className="text-xs sm:text-sm font-medium text-foreground">{item.role}</p>
                                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            {item.icon} <span>{item.matches}</span>
                                          </div>
                                        </div>
                                        <div className="mt-1 flex flex-wrap gap-1">
                                            {item.skills.map(skill => <Badge key={skill} variant="secondary" className="text-[10px] px-1.5 py-0.5">{skill}</Badge>)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="mt-auto p-2.5 sm:p-3 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-lg shadow-inner">
                    <div className="flex items-center gap-2">
                    <ZapIcon className="h-5 w-5 text-primary flex-shrink-0"/>
                    <div>
                        <p className="text-xs sm:text-sm font-semibold text-primary">AI Hiring Insight:</p>
                        <p className="text-[11px] sm:text-xs text-muted-foreground">Prioritize candidates demonstrating strong 'Agile' experience for faster project integration.</p>
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
              Why HyreSense is Your Strategic Hiring Ally
            </h2>
            <p
              ref={whySubtitleRef}
              className={cn(
                "mt-4 text-lg text-muted-foreground max-w-3xl mx-auto opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isWhySubtitleVisible && "opacity-100 translate-y-0 delay-200"
              )}
              style={{ transitionDelay: isWhySubtitleVisible ? '200ms' : '0ms' }}
            >
              We provide intelligent solutions that transform your recruitment process from a challenge into a competitive advantage, ensuring you secure the best talent efficiently.
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
              Your Streamlined Path to <span className="text-primary">Exceptional Hires</span>
            </h2>
            <p
              ref={howSubtitleRef}
              className={cn(
                "mt-4 text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isHowTitleVisible && "opacity-100 translate-y-0 delay-200"
              )}
              style={{ transitionDelay: isHowSubtitleVisible ? '200ms' : '0ms' }}
            >
              Our intuitive platform simplifies every step of the hiring journey, powered by intelligent automation.
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

      {/* Enterprise Plan Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
           <div className="text-center mb-12">
            <h2
              ref={enterprisePlanTitleRef}
              className={cn(
                "text-3xl lg:text-4xl font-extrabold tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isEnterprisePlanTitleVisible && "opacity-100 translate-y-0"
              )}
            >
              Enterprise Recruiter Suite
            </h2>
            <p
              ref={enterprisePlanSubtitleRef}
              className={cn(
                "mt-4 text-lg text-muted-foreground max-w-3xl mx-auto opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isEnterprisePlanSubtitleVisible && "opacity-100 translate-y-0 delay-200"
              )}
              style={{ transitionDelay: isEnterprisePlanSubtitleVisible ? '200ms' : '0ms' }}
            >
              A comprehensive solution designed for teams, offering powerful tools to streamline your entire hiring workflow.
            </p>
          </div>
          <div
            ref={enterprisePlanCardRef}
            className={cn(
              "opacity-0 translate-y-10 transition-all duration-500 ease-out",
              isEnterprisePlanCardVisible && "opacity-100 translate-y-0 delay-300"
            )}
            style={{ transitionDelay: isEnterprisePlanCardVisible ? `300ms` : '0ms' }}
          >
            <Card className="shadow-2xl border-2 border-primary/20 bg-gradient-to-br from-card to-muted/50">
              <CardHeader className="p-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center">
                    <div>
                        <CardTitle className="text-2xl font-bold text-primary">Enterprise Plan</CardTitle>
                        <CardDescription className="text-base">One-Year Validity for Your Entire Team</CardDescription>
                    </div>
                    <div className="mt-4 md:mt-0 text-left md:text-right">
                        <div className="flex items-center justify-end gap-3">
                           <Badge variant="destructive" className="text-lg">50% OFF</Badge>
                           <span className="text-3xl font-extrabold text-foreground">₹21,000</span>
                           <span className="text-xl font-medium text-muted-foreground line-through">₹42,000</span>
                        </div>
                        <p className="text-sm text-muted-foreground">One-Time Setup Cost (includes 5 HR Logins)</p>
                    </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                  {enterpriseFeatures.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                    <p><strong>*Note:</strong> This plan is tailored for companies with more than 5 HR recruiters.</p>
                    <p><strong>*Note:</strong> Separate login and password credentials are provided for each HR recruiter.</p>
                </div>
              </CardContent>
               <CardFooter className="p-6 bg-primary/5">
                    <Button size="lg" className="w-full md:w-auto" asChild>
                        <Link href="/contact">Contact Sales</Link>
                    </Button>
               </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* AI in Action Section - Recruiter Focus */}
      <section className="py-16 sm:py-24 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <h2 
              ref={aiActionTitleRef}
              className={cn(
                "text-3xl lg:text-4xl font-extrabold tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isAiActionTitleVisible && "opacity-100 translate-y-0"
              )}
            >
              See HyreSense AI in Action: Candidate Ranker
            </h2>
            <p 
              ref={aiActionSubtitleRef}
              className={cn(
                "mt-4 text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isAiActionSubtitleVisible && "opacity-100 translate-y-0 delay-200"
              )}
              style={{ transitionDelay: isAiActionSubtitleVisible ? '200ms' : '0ms' }}
            >
              Instantly identify top prospects with our AI-powered candidate ranking. Focus on the best fits, effortlessly.
            </p>
          </div>
          <div 
            ref={aiActionShowcaseRef}
            className={cn(
              "opacity-0 scale-90 transition-all duration-1000 ease-out",
              isAiActionShowcaseVisible && "opacity-100 scale-100 delay-200"
            )}
            style={{ transitionDelay: isAiActionShowcaseVisible ? '200ms' : '0ms' }}
          >
            <Card className="max-w-3xl mx-auto shadow-2xl overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-card to-muted/50">
              <CardHeader className="bg-primary/5 p-4">
                <CardTitle className="text-primary text-lg">AI Candidate Shortlist: Senior Marketing Role</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {[
                  { name: "Anita Sharma", role: "Marketing Lead", match: 96, avatarHint: "professional woman", skills: ["Leadership", "SEO", "Content Strategy"]},
                  { name: "David Lee", role: "Digital Strategist", match: 91, avatarHint: "professional man", skills: ["PPC", "Analytics", "Social Media"] },
                  { name: "Chen Zhao", role: "Growth Hacker", match: 88, avatarHint: "professional person", skills: ["A/B Testing", "CRO", "Data Analysis"] }
                ].map(candidate => (
                  <Card key={candidate.name} className="shadow-sm hover:shadow-md transition-shadow bg-background group hover:border-primary/40 border border-transparent">
                    <CardContent className="p-3 flex flex-col sm:flex-row items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-primary/30 group-hover:border-accent transition-colors">
                          <AvatarImage src={`https://placehold.co/48x48.png?text=${candidate.name.split(' ').map(n=>n[0]).join('')}`} alt={candidate.name} data-ai-hint={candidate.avatarHint}/>
                          <AvatarFallback className="text-lg bg-muted group-hover:bg-accent/10 group-hover:text-accent transition-colors">{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow text-center sm:text-left">
                          <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{candidate.name}</p>
                          <p className="text-xs text-muted-foreground">{candidate.role}</p>
                          <div className="mt-1.5 flex flex-wrap gap-1 justify-center sm:justify-start">
                            {candidate.skills.map(skill => <Badge key={skill} variant="secondary" className="text-[10px] px-1.5 py-0.5">{skill}</Badge>)}
                          </div>
                        </div>
                        <div className="text-center sm:text-right mt-2 sm:mt-0 sm:ml-auto">
                            <p className="font-bold text-green-500 text-2xl group-hover:text-green-400 transition-colors">{candidate.match}%</p>
                            <p className="text-xs text-muted-foreground">AI Match</p>
                        </div>
                        <Button variant="outline" size="sm" className="ml-0 sm:ml-auto text-xs mt-2 sm:mt-0 w-full sm:w-auto group-hover:bg-primary/10 group-hover:border-primary group-hover:text-primary transition-colors">
                          View Profile <ArrowRight className="ml-1 h-3 w-3"/>
                        </Button>
                    </CardContent>
                  </Card>
                ))}
                 <div className="text-center mt-4">
                    <Button variant="default" className="group">See Full Ranking <ThumbsUp className="ml-2 h-4 w-4 group-hover:animate-pulse_fast"/></Button>
                 </div>
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
              Hear from Companies Who Transformed Their Hiring with HyreSense
            </h2>
            <p 
              ref={testimonialsSubtitleRef}
              className={cn(
                "mt-4 text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isTestimonialsSubtitleVisible && "opacity-100 translate-y-0 delay-200"
              )}
              style={{ transitionDelay: isTestimonialsSubtitleVisible ? '200ms' : '0ms' }}
            >
              Discover how businesses like yours are building stronger teams and achieving hiring goals faster.
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
              Your Questions, <span className="text-primary">Answered</span>
            </h2>
            <p 
              ref={faqSubtitleRef}
              className={cn(
                "mt-4 text-lg text-muted-foreground max-w-xl mx-auto opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isFaqSubtitleVisible && "opacity-100 translate-y-0 delay-200"
              )}
              style={{ transitionDelay: isFaqSubtitleVisible ? '200ms' : '0ms' }}
            >
              Find answers to common inquiries about leveraging HyreSense for your hiring needs.
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
      <section id="cta-employer" className="py-16 sm:py-24 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 
            ref={ctaTitleRef}
            className={cn(
              "text-3xl lg:text-4xl font-extrabold tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isCtaTitleVisible && "opacity-100 translate-y-0"
            )}
          >
            Ready to Supercharge Your Hiring?
          </h2>
          <p 
            ref={ctaSubtitleRef}
            className={cn(
              "mt-4 text-lg opacity-90 max-w-xl mx-auto opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isCtaSubtitleVisible && "opacity-100 translate-y-0 delay-200"
            )}
            style={{ transitionDelay: isCtaSubtitleVisible ? '200ms' : '0ms' }}
          >
            Discover how HyreSense can help you find top talent, reduce hiring time, and build a winning team.
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
              <Link href="/signup">Request a Demo <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
             <p className="mt-6 text-sm opacity-80">
              Questions? <Link href="/contact" className="font-semibold underline hover:opacity-90">Contact our team</Link>
            </p>
          </div>
        </div>
      </section>
       <style jsx global>{`
        @keyframes pulse_fast {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        .animate-pulse_fast {
          animation: pulse_fast 1.5s infinite ease-in-out;
        }
        @keyframes pulse_slow { 
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }
        .animate-pulse_slow {
          animation: pulse_slow 4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
