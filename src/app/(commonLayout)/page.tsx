import { ScrollReveal } from '@/components/animations/ScrollReveal';
import BecomeGuideCTA from '@/components/modules/Home/BecomeGuideCTA';
import FeaturedSection from '@/components/modules/Home/FeaturedSection';
import HeroSearchBar from '@/components/modules/Home/Hero';
import HowItWorksSection from '@/components/modules/Home/HowItWorkSection';
import PopularCitiesSection from '@/components/modules/Home/PopularCitiesSection';
import WhyChooseUsSection from '@/components/modules/Home/WhyChooseUs';
import { getAllTours } from '@/services/tourist/tours';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LOCAL GUIDE | Authentic Experiences, Verified Experts',
  description: 'Connect with hand-picked local guides and discover the heart of every city through authentic experiences.',
};

export default async function Home() {
  const allTours = await getAllTours('limit=3');

  return (
    <main className="relative overflow-hidden">
      {/* Absolute Decorative Background Components */}
      <div className="absolute top-0 left-0 w-full h-[150vh] pointer-events-none opacity-40">
         <div className="absolute top-0 -left-1/4 w-[1000px] h-[1000px] bg-primary/5 blur-[150px] rounded-full animate-pulse" />
      </div>

      <ScrollReveal variant="blur-up" amount={0.1}>
        <HeroSearchBar />
      </ScrollReveal>

      <div className="space-y-0">
        <ScrollReveal variant="fade-up" amount={0.15}>
          <FeaturedSection featuredTours={allTours} />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" amount={0.15}>
          <BecomeGuideCTA />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" amount={0.15}>
          <WhyChooseUsSection />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" amount={0.15}>
          <PopularCitiesSection />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" amount={0.15}>
          <HowItWorksSection />
        </ScrollReveal>
      </div>
      
      {/* Professional Footer Spacer Substrate */}
      <div className="h-24 bg-background" />
    </main>
  );
}
