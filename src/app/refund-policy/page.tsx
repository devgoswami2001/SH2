'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { ShieldCheck, CreditCard, XCircle, Clock, Trash2, ShieldAlert, BookText, History, Ban, MessageSquare, Star, Briefcase } from 'lucide-react';

interface PolicySectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  id?: string;
  delay?: number;
}

const PolicySection: React.FC<PolicySectionProps> = ({ title, icon, children, id, delay = 0 }) => {
  const [sectionRef, isSectionVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });
  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn(
        "mb-10 opacity-0 translate-y-8 transition-all duration-700 ease-out",
        isSectionVisible && "opacity-100 translate-y-0"
      )}
      style={{ transitionDelay: isSectionVisible ? `${delay}ms` : '0ms' }}
    >
      <Card className="shadow-lg border-l-4 border-primary">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-primary/10 rounded-full text-primary">{icon}</span>
            <CardTitle className="text-xl lg:text-2xl text-primary">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-muted-foreground space-y-3">
          {children}
        </CardContent>
      </Card>
    </section>
  );
};


export default function RefundPolicyPage() {
  const [heroTitleRef, isHeroTitleVisible] = useScrollAnimation<HTMLHeadingElement>();
  const [heroSubtitleRef, isHeroSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>();

  const policySections = [
    {
      id: "subscription-services",
      icon: <CreditCard className="h-6 w-6" />,
      title: "1. Subscription-Based Services",
      content: (
        <>
          <p>HyreSense offers subscription-based services for job seekers, recruiters, and business professionals. Once a subscription is purchased, refunds are generally not provided, as digital services are activated immediately.</p>
          <p>However, a refund may be considered if:</p>
          <ul className="list-disc list-outside ml-5 space-y-1 marker:text-primary">
            <li>The payment was deducted but the service was not activated, or</li>
            <li>There was a technical error from HyreSense’s end.</li>
          </ul>
          <p>All refund requests must be raised within 7 days of payment.</p>
        </>
      )
    },
    {
      id: "premium-services",
      icon: <Star className="h-6 w-6" />,
      title: "2. Mock Interviews & Premium Services",
      content: (
        <>
          <p>For paid mock interviews, mentorship sessions, or premium features:</p>
          <ul className="list-disc list-outside ml-5 space-y-1 marker:text-primary">
              <li>Refunds will not be issued once the service is delivered or scheduled.</li>
              <li>If the service is cancelled by HyreSense or a technical failure occurs, a full or partial refund may be processed based on the situation.</li>
          </ul>
        </>
      )
    },
    {
      id: "recruiter-services",
      icon: <Briefcase className="h-6 w-6" />,
      title: "3. Recruiter & Employer Services",
      content: (
        <>
          <p>Payments made by recruiters or employers for job postings, branding, or hiring solutions are non-refundable once the service has started.</p>
           <p>In case of duplicate payments or system errors, refunds will be evaluated on a case-by-case basis.</p>
        </>
      )
    },
    {
      id: "processing-time",
      icon: <Clock className="h-6 w-6" />,
      title: "4. Refund Processing Time",
      content: (
        <>
          <ul className="list-disc list-outside ml-5 space-y-1 marker:text-primary">
            <li>Approved refunds will be processed within 7–10 business days.</li>
            <li>The amount will be credited back to the original payment method used during the transaction.</li>
            <li>Any payment gateway or bank processing charges may be deducted where applicable.</li>
          </ul>
        </>
      )
    },
    {
      id: "cancellation",
      icon: <XCircle className="h-6 w-6" />,
      title: "5. Cancellation Policy",
       content: (
        <>
          <ul className="list-disc list-outside ml-5 space-y-1 marker:text-primary">
            <li>Users may cancel their subscription at any time.</li>
            <li>Cancellation will stop future renewals, but no refund will be issued for the current billing cycle.</li>
          </ul>
        </>
      )
    },
    {
      id: "chargebacks",
      icon: <ShieldAlert className="h-6 w-6" />,
      title: "6. Chargebacks & Disputes",
      content: (
        <>
           <ul className="list-disc list-outside ml-5 space-y-1 marker:text-primary">
            <li>In case of chargebacks raised through the payment gateway or bank, HyreSense reserves the right to suspend or terminate the associated account until the issue is resolved.</li>
            <li>Users are encouraged to contact HyreSense support before initiating any chargeback.</li>
          </ul>
        </>
      )
    },
    {
      id: "contact-us",
      icon: <MessageSquare className="h-6 w-6" />,
      title: "7. Contact Information",
      content: (
        <p>
          For any refund-related queries, please contact us at:
          <br />
          📧 Email: <a href="mailto:connect@hyresense.com" className="text-primary hover:underline">connect@hyresense.com</a>
          <br />
          🌐 Website: <a href="https://www.hyresense.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.hyresense.com</a>
        </p>
      )
    },
    {
      id: "policy-updates",
      icon: <History className="h-6 w-6" />,
      title: "8. Policy Updates",
      content: (
         <p>HyreSense reserves the right to update or modify this Refund Policy at any time without prior notice. Any changes will be reflected on this page.</p>
      )
    },
  ];


  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-transparent to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            ref={heroTitleRef}
            className={cn(
              "opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isHeroTitleVisible && "opacity-100 translate-y-0"
            )}
          >
            <ShieldCheck className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
              Refund Policy
            </h1>
          </div>
          <p
            ref={heroSubtitleRef}
            className={cn(
              "mt-6 max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isHeroSubtitleVisible && "opacity-100 translate-y-0 delay-200"
            )}
            style={{ transitionDelay: isHeroSubtitleVisible ? '200ms' : '0ms' }}
          >
            Last updated: May 2025 <br/>
            At HyreSense, we strive to provide a transparent and fair experience to all our users.
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-4xl">
        {policySections.map((section, index) => (
            <PolicySection
                key={section.id}
                id={section.id}
                icon={section.icon}
                title={section.title}
                delay={index * 100}
            >
                {section.content}
            </PolicySection>
        ))}
      </main>
    </div>
  );
}
