
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { ShieldCheck, UserCircle, Database, MapPinIcon, Info, Share2, FileText, Lock, Users, Cookie, Globe, MessageSquare, AlertTriangle } from 'lucide-react';

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


export default function PrivacyPolicyPage() {
  const [heroTitleRef, isHeroTitleVisible] = useScrollAnimation<HTMLHeadingElement>();
  const [heroSubtitleRef, isHeroSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>();

  const policySections = [
    {
      id: "info-collection",
      icon: <UserCircle className="h-6 w-6" />,
      title: "1. Information We Collect",
      content: (
        <>
          <p>When you use our HyreSense job portal and associated services, we may collect the following types of information:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <h4 className="font-semibold text-foreground">a. Personal Information:</h4>
              <ul className="list-disc list-outside ml-5 space-y-1 marker:text-primary">
                <li>Name & Image</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Date of birth</li>
                <li>Resume and job preferences</li>
                <li>Employer or company details</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">b. Usage Data:</h4>
              <ul className="list-disc list-outside ml-5 space-y-1 marker:text-primary">
                <li>Device type and IP address</li>
                <li>Login times and frequency</li>
                <li>Swipe behavior (left/right/match)</li>
                <li>Messages exchanged</li>
                <li>Application and interaction history</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">c. Location Data:</h4>
              <ul className="list-disc list-outside ml-5 space-y-1 marker:text-primary">
                <li>Collected when users enable location access (for localized job listings)</li>
              </ul>
            </div>
          </div>
        </>
      )
    },
    {
      id: "how-we-use",
      icon: <Info className="h-6 w-6" />,
      title: "2. How We Use Your Information",
      content: (
        <>
          <p>Your information is used for the following purposes:</p>
          <ul className="list-disc list-outside ml-5 space-y-1 marker:text-primary">
            <li>To facilitate job seeker-employer matches.</li>
            <li>To personalize job and candidate recommendations.</li>
            <li>To send important updates, alerts, and notifications.</li>
            <li>For billing and payment (if applicable).</li>
            <li>To detect and prevent fraud or misuse.</li>
            <li>For analytics to improve our services.</li>
          </ul>
        </>
      )
    },
    {
      id: "sharing-info",
      icon: <Share2 className="h-6 w-6" />,
      title: "3. Sharing Your Information",
      content: (
        <>
          <p>We may share your data with:</p>
          <ul className="list-disc list-outside ml-5 space-y-1 marker:text-primary">
            <li>Employers or job seekers as part of the matching process.</li>
            <li>Third-party payment processors (for subscriptions or services).</li>
            <li>Service providers for analytics, hosting, and support.</li>
            <li>Legal authorities if required by law or to enforce our Terms.</li>
          </ul>
          <p className="font-semibold text-primary">We do not sell your personal data to advertisers or third parties.</p>
        </>
      )
    },
    {
      id: "data-retention",
      icon: <Database className="h-6 w-6" />,
      title: "4. Data Retention",
      content: (
        <>
          <p>We retain your personal data only as long as necessary:</p>
          <ul className="list-disc list-outside ml-5 space-y-1 marker:text-primary">
            <li>While your account is active.</li>
            <li>As required to comply with legal obligations or resolve disputes.</li>
          </ul>
          <p>You may request deletion of your account and data at any time.</p>
        </>
      )
    },
    {
      id: "your-rights",
      icon: <FileText className="h-6 w-6" />,
      title: "5. Your Rights",
      content: (
        <>
          <p>You have the right to:</p>
          <ul className="list-disc list-outside ml-5 space-y-1 marker:text-primary">
            <li>Access, correct, or update your personal data.</li>
            <li>Request deletion of your account.</li>
            <li>Withdraw consent for marketing communications.</li>
          </ul>
        </>
      )
    },
    {
      id: "security",
      icon: <Lock className="h-6 w-6" />,
      title: "6. Security",
      content: (
        <>
          <p>We implement reasonable security measures:</p>
          <ul className="list-disc list-outside ml-5 space-y-1 marker:text-primary">
            <li>SSL encryption</li>
            <li>Secure password storage</li>
            <li>Access controls and regular audits</li>
          </ul>
          <p>However, no method of transmission over the internet is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.</p>
        </>
      )
    },
    {
      id: "children-privacy",
      icon: <Users className="h-6 w-6" />,
      title: "7. Children's Privacy",
      content: (
        <p>Our platform is not intended for users under 18. We do not knowingly collect personal information from minors. If we become aware that we have collected Personal Information from children without verification of parental consent, we take steps to remove that information from our servers.</p>
      )
    },
    {
      id: "cookies-tracking",
      icon: <Cookie className="h-6 w-6" />,
      title: "8. Cookies & Tracking",
      content: (
        <>
          <p>We use cookies and similar technologies to:</p>
          <ul className="list-disc list-outside ml-5 space-y-1 marker:text-primary">
            <li>Maintain user sessions.</li>
            <li>Analyze usage behavior.</li>
            <li>Improve performance and content.</li>
          </ul>
          <p>You can modify your cookie settings in your browser.</p>
        </>
      )
    },
    {
      id: "international-transfers",
      icon: <Globe className="h-6 w-6" />,
      title: "9. International Data Transfers",
      content: (
        <p>If you are located outside the country where our servers are located, your information may be transferred to and processed in that country, where data protection laws may differ from those in your jurisdiction. By using HyreSense, you consent to such transfers.</p>
      )
    },
    {
      id: "policy-changes",
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "10. Changes to this Privacy Policy",
      content: (
        <p>We may update this policy from time to time. Changes will be posted on this page with a new effective date. We encourage you to review this Privacy Policy periodically for any changes. Continued use of the platform after such modifications will constitute your acknowledgment of the modified Policy and agreement to abide and be bound by the modified Policy.</p>
      )
    },
    {
      id: "contact-us",
      icon: <MessageSquare className="h-6 w-6" />,
      title: "11. Contact Us",
      content: (
        <p>
          For any questions or concerns regarding your privacy, please contact us at:
          <br />
          Email: <a href="mailto:connect@hyresense.com" className="text-primary hover:underline">connect@hyresense.com</a>
        </p>
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
            <ShieldCheck className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
              Privacy Policy
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
            At HyreSense, your privacy is a priority. This Privacy Policy explains how we collect, use, share, and protect your personal information.
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
