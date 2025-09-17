import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSection } from '@/components/sections/services-section';
import { WhyChooseUsSection } from '@/components/sections/why-choose-us-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { CTASection } from '@/components/sections/cta-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}