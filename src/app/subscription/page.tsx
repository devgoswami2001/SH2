'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Check, Crown, Star, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { MobileAppLayout } from '@/components/layout/MobileAppLayout';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ApiPlan {
  id: string;
  name: string;
  plan_type: string;
  price: string;
  daily_swipe_limit: number;
  has_advanced_cards: boolean;
  has_verified_jobs: boolean;
  mock_interviews_monthly: number;
  has_profile_review: boolean;
  has_skill_training: boolean;
  has_hyresense: boolean;
  is_active: boolean;
  created_at: string;
}

interface JobseekerInfo {
    full_name: string;
    email: string;
    phone_number: string;
}

interface ApiSubscriptionResponse {
    jobseeker: JobseekerInfo;
    subscriptions: ApiPlan[];
}

interface PlanFeature {
  text: string;
  included: boolean;
}

interface DisplayPlan {
  id: string;
  name: string;
  price: string;
  duration: string;
  priceNumeric: number;
  description: string;
  features: PlanFeature[];
  isPopular: boolean;
  cta: string;
  variant: 'default' | 'outline';
}

const getPlanDescription = (name: string): string => {
    switch (name.toLowerCase()) {
        case 'free':
            return 'Get started and experience the core of HyreSense.';
        case 'basic':
            return 'Unlock more opportunities and stand out from the crowd.';
        case 'premium':
            return 'The ultimate toolkit for the serious job seeker.';
        default:
            return 'A great choice for your career.';
    }
}

const mapApiPlanToDisplayPlan = (apiPlan: ApiPlan): DisplayPlan => {
    const features: PlanFeature[] = [
        { text: `${apiPlan.daily_swipe_limit} Daily Job Swipes`, included: true },
        { text: 'Advanced AI Job Matching', included: apiPlan.has_advanced_cards },
        { text: 'Profile Review by AI', included: apiPlan.has_profile_review },
        { text: 'Priority Application Listing', included: apiPlan.name.toLowerCase() !== 'free' },
        { text: 'Verified Job Cards', included: apiPlan.has_verified_jobs },
        { text: `${apiPlan.mock_interviews_monthly} Mock Interview(s) Monthly`, included: apiPlan.mock_interviews_monthly > 0 },
        { text: 'Direct Skill Development & Training Access', included: apiPlan.has_skill_training },
        { text: 'HyreSense Self-Feedback on Applications', included: apiPlan.has_hyresense },
    ];
    
    const visibleFeatures = features.filter(f => f.included);

    return {
        id: apiPlan.id,
        name: apiPlan.name,
        price: `₹${parseInt(apiPlan.price)}`,
        priceNumeric: parseInt(apiPlan.price),
        duration: apiPlan.name.toLowerCase() === 'premium' ? '/6 months' : '/month',
        description: getPlanDescription(apiPlan.name),
        features: visibleFeatures,
        isPopular: apiPlan.name.toLowerCase() === 'basic',
        cta: apiPlan.name.toLowerCase() === 'free' ? 'Continue with Free' : `Upgrade to ${apiPlan.name}`,
        variant: apiPlan.name.toLowerCase() === 'basic' ? 'default' : 'outline',
    }
};

const PlanCard: React.FC<{ plan: DisplayPlan; onSelect: (plan: DisplayPlan) => void; delay: number }> = ({ plan, onSelect, delay }) => {
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
      <Card className={cn(
        "h-full flex flex-col shadow-xl border-2 transition-all duration-300 relative",
        plan.isPopular ? "border-primary shadow-primary/20" : "border-border/40 hover:border-primary/50"
      )}>
        {plan.isPopular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
            <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
              <Star className="h-3 w-3 fill-current" /> Most Popular
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
                <span className="text-muted-foreground">{feature.text}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button
            size="lg"
            className="w-full text-base"
            variant={plan.variant as any}
            onClick={() => onSelect(plan)}
          >
            {plan.cta}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};


const SubscriptionPageContent = () => {
    const [titleRef, isTitleVisible] = useScrollAnimation<HTMLHeadingElement>();
    const [subtitleRef, isSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>();
    const { toast } = useToast();

    const [plans, setPlans] = useState<DisplayPlan[]>([]);
    const [jobseeker, setJobseeker] = useState<JobseekerInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            setIsLoading(true);
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                setError("Please log in to view subscriptions.");
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch('https://backend.hyresense.com/api/v1/jobseeker/subscriptions/', {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch subscription plans.');
                }
                const data: ApiSubscriptionResponse = await response.json();
                
                const sortedPlans = data.subscriptions.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                setPlans(sortedPlans.map(mapApiPlanToDisplayPlan));
                setJobseeker(data.jobseeker);
            } catch (err: any) {
                setError(err.message || "An unknown error occurred.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSubscriptions().catch(e => console.error("Initial subscriptions fetch error:", e));
    }, []);

    const handlePayment = async (plan: DisplayPlan) => {
        if (plan.priceNumeric === 0) {
            toast({
                title: "You're on the Free Plan",
                description: "You can continue using the core features of HyreSense.",
            });
            return;
        }

        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            toast({ title: 'Authentication Error', description: 'Please log in to subscribe.', variant: 'destructive' });
            return;
        }

        try {
            console.log(`Initiating PayU payment for plan: ${plan.name} (${plan.id})`);
            
            const response = await fetch('https://backend.hyresense.com/api/v1/jobseeker/payu/start/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ subscription_id: plan.id }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Payment initiation API failed:", errorData);
                throw new Error(errorData.detail || 'Could not initiate PayU payment.');
            }

            const data = await response.json();
            
            const payuUrl = data.payu_url || data.url;
            const payuData = data.payu_data || data.payu_params || {
                key: data.key,
                txnid: data.txnid,
                amount: data.amount,
                productinfo: data.productinfo,
                firstname: data.firstname,
                email: data.email,
                phone: data.phone,
                surl: data.surl,
                furl: data.furl,
                hash: data.hash,
                service_provider: data.service_provider
            };

            if (!payuUrl || !payuData.hash || !payuData.key) {
                throw new Error('Invalid payment initialization data received from server.');
            }

            const payuForm = document.createElement('form');
            payuForm.method = 'POST';
            payuForm.action = payuUrl; 

            Object.entries(payuData).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = String(value);
                    payuForm.appendChild(input);
                }
            });

            document.body.appendChild(payuForm);
            payuForm.submit();

        } catch (err: any) {
            console.error("handlePayment Exception:", err);
            toast({
                title: 'Payment Error',
                description: err.message || 'An unexpected error occurred.',
                variant: 'destructive',
            });
        }
    };

  return (
    <div className="flex-grow bg-muted/30 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-5xl py-12 md:py-20 px-4">
             <div className="text-center mb-8">
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

            <Alert className="mb-8 border-green-500/50 bg-green-50/50 dark:bg-green-900/20 text-green-800 dark:text-green-300">
                <Sparkles className="h-4 w-4 text-green-500" />
                <AlertTitle className="font-semibold">Experience HyreSense Premium</AlertTitle>
                <AlertDescription>
                    Boost your career with advanced AI insights and unlimited swipes.
                </AlertDescription>
            </Alert>


            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
            ) : error ? (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan, index) => (
                        <PlanCard 
                            key={plan.id}
                            plan={plan}
                            onSelect={handlePayment}
                            delay={index * 150}
                        />
                    ))}
                </div>
            )}
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
