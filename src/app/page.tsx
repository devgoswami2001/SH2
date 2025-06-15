
import { HeroSection } from '@/components/landing/HeroSection';
import { JobSeekersSection } from '@/components/landing/JobSeekersSection';
import { EmployersSection } from '@/components/landing/EmployersSection';
import { AiBenefitsSection } from '@/components/landing/AiBenefitsSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { CtaSection } from '@/components/landing/CtaSection';
import { SwipeToHireSection } from '@/components/landing/SwipeToHireSection';
import { PoweredByHyreSenseAiSection } from '@/components/landing/PoweredByHyreSenseAiSection';
import { AiDemoSection } from '@/components/landing/AiDemoSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AiDemoSection />
      <HowItWorksSection />
      <AiBenefitsSection /> {/* Renamed from Features to AI Benefits */}
      <SwipeToHireSection />
      <PoweredByHyreSenseAiSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
