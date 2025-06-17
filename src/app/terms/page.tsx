
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Gavel, UserCheck, Users, FileText, Shuffle, CreditCard, Ban, ShieldCheck, Copyright, Link2, AlertOctagon, ShieldAlert, Landmark, Edit } from 'lucide-react';

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

export default function TermsAndConditionsPage() {
  const [heroTitleRef, isHeroTitleVisible] = useScrollAnimation<HTMLHeadingElement>();
  const [heroSubtitleRef, isHeroSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>();

  const termsSections = [
    {
      id: "eligibility",
      icon: <UserCheck className="h-6 w-6" />,
      title: "1. Eligibility",
      content: (
        <p>You must be at least 18 years old to use our services. By using this platform, you represent and warrant that you meet all legal requirements to enter into this agreement.</p>
      )
    },
    {
      id: "user-accounts",
      icon: <Users className="h-6 w-6" />,
      title: "2. User Accounts",
      content: (
        <p>Users must create an account to access the full functionality of the app. You agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials.</p>
      )
    },
    {
      id: "platform-usage",
      icon: <Shuffle className="h-6 w-6" />,
      title: "3. Platform Usage",
      content: (
        <p>The platform is designed to connect job seekers and employers through a swipe-based interface. You may swipe, match, and communicate with parties in a professional manner only. Misuse, including spamming, fake profiles, or fraudulent activity, is strictly prohibited.</p>
      )
    },
    {
      id: "content-profiles",
      icon: <FileText className="h-6 w-6" />,
      title: "4. Content & Profiles",
      content: (
        <p>You are solely responsible for the content you upload (resumes, job listings, profile details, etc.). We reserve the right to remove content that violates laws, ethics, or our guidelines. You grant us a non-exclusive, royalty-free license to use, display, and distribute your content within the platform.</p>
      )
    },
    {
      id: "matching-system",
      icon: <Users className="h-6 w-6" />,
      title: "5. Matching System",
      content: (
        <p>Matching is based on swipe-based interest between job seekers and employers. We do not guarantee job placement, interview calls, or successful hires.</p>
      )
    },
    {
      id: "subscription-payments",
      icon: <CreditCard className="h-6 w-6" />,
      title: "6. Subscription & Payments",
      content: (
        <p>Some services (e.g., premium listings, resume review, advertising and Mock Interviews) may require payment. All fees are displayed prior to purchase and are non-refundable unless stated otherwise. Payment gateways are managed by third-party providers, and we are not responsible for processing errors.</p>
      )
    },
    {
      id: "termination",
      icon: <Ban className="h-6 w-6" />,
      title: "7. Termination",
      content: (
        <p>We reserve the right to suspend or terminate your account at our sole discretion, with or without notice, if you violate these terms.</p>
      )
    },
    {
      id: "privacy",
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "8. Privacy",
      content: (
        <p>Your use of our platform is also governed by our HyreSense Policy, which explains how we collect, use, and protect your information.</p>
      )
    },
    {
      id: "intellectual-property",
      icon: <Copyright className="h-6 w-6" />,
      title: "9. Intellectual Property",
      content: (
        <p>All content, branding, and technology on the platform are the intellectual property of HyreSense. Unauthorized use or reproduction is prohibited.</p>
      )
    },
    {
      id: "third-party-links",
      icon: <Link2 className="h-6 w-6" />,
      title: "10. Third-Party Links",
      content: (
        <p>The platform may include links to third-party websites or services. We are not responsible for their content, policies, or practices.</p>
      )
    },
    {
      id: "limitation-liability",
      icon: <AlertOctagon className="h-6 w-6" />,
      title: "11. Limitation of Liability",
      content: (
        <p>We do not guarantee employment or hiring outcomes. Under no circumstances shall we be liable for indirect or consequential damages arising from your use of the platform.</p>
      )
    },
    {
      id: "indemnity",
      icon: <ShieldAlert className="h-6 w-6" />,
      title: "12. Indemnity",
      content: (
        <p>You agree to indemnify and hold harmless of HyreSense, its affiliates, and its employees from any claims, liabilities, damages, or expenses arising from your use of the Service.</p>
      )
    },
    {
      id: "changes-terms",
      icon: <Edit className="h-6 w-6" />,
      title: "13. Changes to Terms",
      content: (
        <p>We may revise these Terms at any time. Continued use after changes indicates your acceptance of the new terms.</p>
      )
    },
    {
      id: "governing-law",
      icon: <Landmark className="h-6 w-6" />,
      title: "14. Governing Law",
      content: (
        <p>These terms are governed by the laws of Lucknow, (U.P). All disputes shall be subject to the jurisdiction of the courts in Lucknow, (U.P).</p>
      )
    }
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
            <Gavel className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
              Terms &amp; Conditions
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
            Effective Date: June 2025 <br/>
            Welcome to HyreSense. By accessing or using our mobile application or website (“Service”), you agree to comply with and be bound by the following Terms and Conditions.
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-4xl">
        {termsSections.map((section, index) => (
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

    