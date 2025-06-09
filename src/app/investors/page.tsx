
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Target, TrendingUp, Users, Lightbulb, BarChartHorizontalBig } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

export default function InvestorRelationsPage() {
  const [heroTitleRef, isHeroTitleVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2, triggerOnce: true });
  const [heroSubtitleRef, isHeroSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2, triggerOnce: true });
  const [heroButtonRef, isHeroButtonVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });

  const [shapingTitleRef, isShapingTitleVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2, triggerOnce: true });
  const [shapingSubtitleRef, isShapingSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2, triggerOnce: true });
  const [missionCardRef, isMissionCardVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });
  const [visionCardRef, isVisionCardVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });
  
  const [advantageSectionTitleRef, isAdvantageSectionTitleVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2, triggerOnce: true });
  const [advantageSectionSubtitleRef, isAdvantageSectionSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2, triggerOnce: true });

  const [problemTitleRef, isProblemTitleVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2, triggerOnce: true });
  const [problemTextRef, isProblemTextVisible] = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2, triggerOnce: true });

  const [solutionTitleRef, isSolutionTitleVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2, triggerOnce: true });
  const [solutionImageRef, isSolutionImageVisible] = useScrollAnimation<HTMLImageElement>({ threshold: 0.2, triggerOnce: true });
  const [solutionTextContentRef, isSolutionTextContentVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });
  
  const [marketOppTitleRef, isMarketOppTitleVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2, triggerOnce: true });
  const [marketOppTextRef, isMarketOppTextVisible] = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2, triggerOnce: true });
  
  const [whyInvestTitleRef, isWhyInvestTitleVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2, triggerOnce: true });
  const whyInvestCards = [
    useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true }),
    useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true }),
    useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true }),
  ];

  const [ctaTitleRef, isCtaTitleVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2, triggerOnce: true });
  const [ctaTextRef, isCtaTextVisible] = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2, triggerOnce: true });
  const [ctaContactRef, isCtaContactVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });


  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 
            ref={heroTitleRef}
            className={cn(
              "text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isHeroTitleVisible && "opacity-100 translate-y-0"
            )}
          >
            <span className="block">Invest in the Future of</span>
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mt-2">Talent Acquisition</span>
          </h1>
          <p 
            ref={heroSubtitleRef}
            className={cn(
              "mt-6 max-w-md mx-auto text-lg text-muted-foreground sm:text-xl md:mt-8 md:max-w-3xl opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isHeroSubtitleVisible && "opacity-100 translate-y-0 delay-200"
            )}
            style={{ transitionDelay: isHeroSubtitleVisible ? '200ms' : '0ms' }}
          >
            <span style={{ color: '#4670bf' }}>hyre<span style={{color:'#7a5fdb'}}>SENSE</span> </span> is revolutionizing how companies find and hire top talent, and how professionals build their careers. We're seeking partners to join us on this transformative journey.
          </p>
          <div 
            ref={heroButtonRef}
            className={cn(
              "mt-10 opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isHeroButtonVisible && "opacity-100 translate-y-0 delay-400"
            )}
            style={{ transitionDelay: isHeroButtonVisible ? '400ms' : '0ms' }}
          >
            <Button size="lg" asChild>
              <Link href="#contact">Connect With Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <h2 
              ref={shapingTitleRef}
              className={cn(
                "text-3xl lg:text-4xl font-extrabold tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isShapingTitleVisible && "opacity-100 translate-y-0"
              )}
            >
              Shaping the Future of Work
            </h2>
            <p 
              ref={shapingSubtitleRef}
              className={cn(
                "mt-4 text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isShapingSubtitleVisible && "opacity-100 translate-y-0 delay-200"
              )}
              style={{ transitionDelay: isShapingSubtitleVisible ? '200ms' : '0ms' }}
            >
              At <span style={{color: '#4670bf' }}>hyre<span style={{color:'#7a5fdb'}}>SENSE</span> </span>, we believe in a world where everyone can find fulfilling work and every company can build its dream team, effortlessly.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div
              ref={missionCardRef}
              className={cn(
                "opacity-0 translate-y-10 transition-all duration-500 ease-out",
                isMissionCardVisible && "opacity-100 translate-y-0"
              )}
            >
              <Card className="shadow-lg h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="h-10 w-10 text-primary" />
                    <CardTitle className="text-2xl">Our Mission</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To empower job seekers and employers with intelligent, intuitive, and equitable tools that foster meaningful connections and drive career and organizational growth.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div
              ref={visionCardRef}
              className={cn(
                "opacity-0 translate-y-10 transition-all duration-500 ease-out",
                isVisionCardVisible && "opacity-100 translate-y-0 delay-150"
              )}
              style={{ transitionDelay: isVisionCardVisible ? '150ms' : '0ms' }}
            >
              <Card className="shadow-lg h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Lightbulb className="h-10 w-10 text-accent" />
                    <CardTitle className="text-2xl">Our Vision</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To be the leading AI-powered platform that redefines the talent landscape, making the hiring process transparent, efficient, and effective for all.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* The Opportunity Section */}
      <section className="py-16 sm:py-24 bg-secondary/30 dark:bg-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <h2 
              ref={advantageSectionTitleRef}
              className={cn(
                "text-base font-semibold text-primary tracking-wide uppercase opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isAdvantageSectionTitleVisible && "opacity-100 translate-y-0"
              )}
            >
              The <span style={{color: '#4670bf' }}>hyre<span style={{color:'#7a5fdb'}}>SENSE</span> </span> Advantage
            </h2>
            <p 
              ref={advantageSectionSubtitleRef}
              className={cn(
                "mt-2 text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isAdvantageSectionSubtitleVisible && "opacity-100 translate-y-0 delay-200"
              )}
              style={{ transitionDelay: isAdvantageSectionSubtitleVisible ? '200ms' : '0ms' }}
            >
              A New Era for Recruitment
            </p>
          </div>
          <div className="space-y-12">
            <div>
              <h3 
                ref={problemTitleRef}
                className={cn(
                  "text-2xl font-semibold mb-4 text-center opacity-0 translate-y-10 transition-all duration-700 ease-out",
                  isProblemTitleVisible && "opacity-100 translate-y-0"
                )}
              >
                The Problem: An Outdated System
              </h3>
              <p 
                ref={problemTextRef}
                className={cn(
                  "text-muted-foreground text-lg max-w-3xl mx-auto text-center opacity-0 translate-y-10 transition-all duration-700 ease-out",
                  isProblemTextVisible && "opacity-100 translate-y-0 delay-200"
                )}
                style={{ transitionDelay: isProblemTextVisible ? '200ms' : '0ms' }}
              >
                Traditional hiring is often slow, biased, and inefficient. Job seekers struggle to find the right fit, and employers miss out on exceptional talent due to cumbersome processes and limited insights.
              </p>
            </div>
            <div>
              <h3 
                ref={solutionTitleRef}
                className={cn(
                  "text-2xl font-semibold mb-6 text-center opacity-0 translate-y-10 transition-all duration-700 ease-out",
                  isSolutionTitleVisible && "opacity-100 translate-y-0"
                )}
              >
                Our Solution: AI-Powered Precision
              </h3>
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div
                  ref={solutionImageRef}
                  className={cn(
                    "opacity-0 translate-y-10 transition-all duration-700 ease-out",
                    isSolutionImageVisible && "opacity-100 translate-y-0 delay-200"
                  )}
                  style={{ transitionDelay: isSolutionImageVisible ? '200ms' : '0ms' }}
                >
                  <Image 
                    src="https://placehold.co/600x400.png" 
                    alt="HyreSence Platform Showcase" 
                    width={600} 
                    height={400}
                    data-ai-hint="technology platform"
                    className="rounded-lg shadow-xl" 
                  />
                </div>
                <div 
                  ref={solutionTextContentRef}
                  className={cn(
                    "space-y-4 opacity-0 translate-y-10 transition-all duration-700 ease-out",
                    isSolutionTextContentVisible && "opacity-100 translate-y-0 delay-400"
                  )}
                  style={{ transitionDelay: isSolutionTextContentVisible ? '400ms' : '0ms' }}
                >
                  <p className="text-lg text-muted-foreground">
                    <span style={{ color: '#4670bf' }}>hyre<span style={{color:'#7a5fdb'}}>SENSE</span> </span> leverages cutting-edge AI to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Provide intelligent job and candidate matching.</li>
                    <li>Offer skill-gap analysis and development suggestions.</li>
                    <li>Deliver predictive analytics for smarter hiring decisions.</li>
                    <li>Streamline the application and screening process.</li>
                  </ul>
                  <p className="text-lg text-muted-foreground">
                    We're creating a more dynamic, responsive, and fair job market.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 
                ref={marketOppTitleRef}
                className={cn(
                  "text-2xl font-semibold mb-4 text-center opacity-0 translate-y-10 transition-all duration-700 ease-out",
                  isMarketOppTitleVisible && "opacity-100 translate-y-0"
                )}
              >
                Market Opportunity
              </h3>
              <p 
                ref={marketOppTextRef}
                className={cn(
                  "text-muted-foreground text-lg max-w-3xl mx-auto text-center opacity-0 translate-y-10 transition-all duration-700 ease-out",
                  isMarketOppTextVisible && "opacity-100 translate-y-0 delay-200"
                )}
                style={{ transitionDelay: isMarketOppTextVisible ? '200ms' : '0ms' }}
              >
                The global recruitment market is valued at over $600 billion and is rapidly evolving. The demand for AI-driven HR technology is skyrocketing as businesses seek to optimize talent acquisition and workforce management. <span style={{ color: '#4670bf' }}>hyre<span style={{color:'#7a5fdb'}}>SENSE</span> </span> is perfectly positioned to capture a significant share of this expanding market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Invest in HyreSence? Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <h2 
              ref={whyInvestTitleRef}
              className={cn(
                "text-3xl lg:text-4xl font-extrabold tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isWhyInvestTitleVisible && "opacity-100 translate-y-0"
              )}
            >
              Why Invest in <span style={{color: '#4670bf' }}>hyre<span style={{color:'#7a5fdb'}}>SENSE</span> </span>?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <TrendingUp className="h-12 w-12 text-primary mb-2" />, 
                title: "Innovative Technology", 
                content: "Proprietary AI algorithms and a user-centric platform designed for scalability and impact." 
              },
              { 
                icon: <BarChartHorizontalBig className="h-12 w-12 text-primary mb-2" />, 
                title: "Large & Growing Market", 
                content: "Addressing a critical need in a multi-billion dollar global industry with strong tailwinds." 
              },
              { 
                icon: <Users className="h-12 w-12 text-primary mb-2" />, 
                title: "Experienced Team (Placeholder)", 
                content: "Led by a passionate team with expertise in AI, HR technology, and business development (Details to be expanded)." 
              }
            ].map((item, index) => {
              const [cardRef, isCardVisible] = whyInvestCards[index];
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
                  <Card className="text-center shadow-lg h-full">
                    <CardHeader className="items-center">
                      {item.icon}
                      <CardTitle>{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.content}</p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section id="contact" className="py-16 sm:py-24 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 
            ref={ctaTitleRef}
            className={cn(
              "text-3xl lg:text-4xl font-extrabold tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isCtaTitleVisible && "opacity-100 translate-y-0"
            )}
          >
            Partner With Us to Shape the Future
          </h2>
          <p 
            ref={ctaTextRef}
            className={cn(
              "mt-4 text-lg opacity-90 opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isCtaTextVisible && "opacity-100 translate-y-0 delay-200"
            )}
            style={{ transitionDelay: isCtaTextVisible ? '200ms' : '0ms' }}
          >
            We're looking for strategic investors who share our vision and are excited to be part of the next generation of talent technology.
          </p>
          <div 
            ref={ctaContactRef}
            className={cn(
              "mt-10 opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isCtaContactVisible && "opacity-100 translate-y-0 delay-400"
            )}
            style={{ transitionDelay: isCtaContactVisible ? '400ms' : '0ms' }}
          >
            {/* This would ideally link to a contact form or a dedicated investor portal section */}
            <p className="text-lg opacity-90 mb-4">
              For investment inquiries, please reach out to:
            </p>
            <a href="mailto:investors@hyresence.com" className="text-xl font-semibold hover:underline">
              contact@hyresense.com
            </a>
            <p className="mt-6 text-sm opacity-80">
              We look forward to discussing how we can build the future of work, together.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

