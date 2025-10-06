
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Check, Crown, Star, Sparkles } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { MobileAppLayout } from '@/components/layout/MobileAppLayout';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ScrollArea } from '@/components/ui/scroll-area';

const plans = [
  {
    name: 'Free',
    price: '₹0',
    duration: '/month',
    priceNumeric: 0,
    description: 'Get started and experience the core of HyreSense.',
    features: [
      '20 Daily Job Swipes',
      'Basic Job Matching',
      'Profile Creation',
      'Application Tracking',
    ],
    isPopular: false,
    cta: 'Continue with Free',
    variant: 'outline',
  },
  {
    name: 'Basic',
    price: '₹1260',
    duration: '/month',
    priceNumeric: 1260,
    description: 'Unlock more opportunities and stand out from the crowd.',
    features: [
      '50 Daily Job Swipes',
      'Advanced AI Job Matching',
      'Profile Review by AI',
      'Priority Application Listing',
      'Verified job cards',
    ],
    isPopular: true,
    cta: 'Upgrade to Basic',
    variant: 'default',
  },
  {
    name: 'Premium',
    price: '₹7560',
    duration: '/6 months',
    priceNumeric: 7560,
    description: 'The ultimate toolkit for the serious job seeker.',
    features: [
      'Unlimited Daily Swipes',
      'Everything in Basic, plus:',
      'AI-Powered Mock Interviews',
      'Monthly Profile Review by Industry Leaders',
      'FIFO Shortlisting Advantage',
      'Direct Skill Development & Training Access',
      'HyreSense Self-Feedback on Applications',
    ],
    isPopular: false,
    cta: 'Go Premium',
    variant: 'outline',
  },
];

const SubscriptionPageContent = () => {
    const [titleRef, isTitleVisible] = useScrollAnimation<HTMLHeadingElement>();
    const [subtitleRef, isSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>();

  return (
    <div className="flex-grow bg-muted/30 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-5xl py-12 md:py-20 px-4">
             <div className="text-center mb-12 md:mb-16">
                <h1
                ref={titleRef}
                className={cn(
                    "text-4xl md:text-5xl font-extrabold tracking-tight text-foreground opacity-0 translate-y-10 transition-all duration-700 ease-out",
                    isTitleVisible && "opacity-100 translate-y-0"
                )}
                >
                Unlock Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Full Potential</span>
                </h1>
                <p
                ref={subtitleRef}
                className={cn(
                    "mt-4 max-w-2xl mx-auto text-lg text-muted-foreground opacity-0 translate-y-10 transition-all duration-700 ease-out",
                    isTitleVisible && "opacity-100 translate-y-0 delay-200"
                )}
                style={{ transitionDelay: isSubtitleVisible ? '200ms' : '0ms' }}
                >
                Choose the plan that best fits your career ambitions and accelerate your job search with exclusive features.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                {plans.map((plan, index) => {
                    const [cardRef, isCardVisible] = useScrollAnimation<HTMLDivElement>({threshold: 0.1, triggerOnce: true});
                    return (
                        <div
                            key={plan.name}
                            ref={cardRef}
                            className={cn(
                                "opacity-0 translate-y-10 transition-all duration-500 ease-out",
                                isCardVisible && "opacity-100 translate-y-0"
                            )}
                            style={{ transitionDelay: isCardVisible ? `${index * 150}ms` : '0ms' }}
                        >
                            <Card className={cn(
                                "h-full flex flex-col shadow-xl border-2 transition-all duration-300",
                                plan.isPopular ? "border-primary shadow-primary/20" : "border-border/40 hover:border-primary/50"
                            )}>
                                {plan.isPopular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                                    <Star className="h-3 w-3" /> Most Popular
                                    </div>
                                </div>
                                )}
                                <CardHeader className="text-center pt-10">
                                <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
                                    {plan.name === 'Premium' && <Sparkles className="h-7 w-7 text-accent" />}
                                    {plan.name === 'Basic' && <Crown className="h-7 w-7 text-primary" />}
                                    {plan.name}
                                </CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow space-y-6">
                                <div className="text-center">
                                    <span className="text-5xl font-extrabold">{plan.price}</span>
                                    <span className="text-muted-foreground">{plan.duration}</span>
                                </div>
                                <ul className="space-y-3 text-sm">
                                    {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-muted-foreground">{feature}</span>
                                    </li>
                                    ))}
                                </ul>
                                </CardContent>
                                <CardFooter>
                                <Button size="lg" className="w-full text-base" variant={plan.variant as any}>
                                    {plan.cta}
                                </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default function SubscriptionPage() {
  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden">
        <MobileAppLayout activeView="subscription" pageTitle="Subscription">
          <ScrollArea className="flex-grow bg-muted/20 dark:bg-slate-800/40">
            <SubscriptionPageContent />
          </ScrollArea>
        </MobileAppLayout>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex flex-col h-screen bg-background">
        <AppHeader />
        <main className="flex-1 overflow-y-auto">
          <SubscriptionPageContent />
        </main>
      </div>
    </>
  );
}
