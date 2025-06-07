
import { HeroSection } from '@/components/landing/HeroSection';
import { JobSeekersSection } from '@/components/landing/JobSeekersSection';
import { EmployersSection } from '@/components/landing/EmployersSection';
import { AiBenefitsSection } from '@/components/landing/AiBenefitsSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { CtaSection } from '@/components/landing/CtaSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AiBenefitsSection /> {/* Renamed from Features to AI Benefits */}
      <JobSeekersSection />
      <EmployersSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
