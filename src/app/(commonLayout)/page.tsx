import { ScrollReveal } from '@/components/animations/ScrollReveal';
import BecomeGuideCTA from '@/components/modules/Home/BecomeGuideCTA';
import FeaturedSection from '@/components/modules/Home/FeaturedSection';
import HeroSearchBar from '@/components/modules/Home/Hero';
import HowItWorksSection from '@/components/modules/Home/HowItWorkSection';
import PopularCitiesSection from '@/components/modules/Home/PopularCitiesSection';
import WhyChooseUsSection from '@/components/modules/Home/WhyChooseUs';
import { getAllTours } from '@/services/tourist/tours';
import Head from 'next/head';

export default async function Home() {
  const allTours = await getAllTours('limit=3');

  console.log('ALL TOURS', allTours);

  return (
    <>
      <Head>
        <title>Local Guide - Find your local tour guide</title>
        <meta
          name="description"
          content="Local Guide - Find your local tour guide"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ScrollReveal variant="blur-up" amount={0.2}>
          <HeroSearchBar />
        </ScrollReveal>
        <ScrollReveal variant="fade-up" amount={0.2}>
          <FeaturedSection featuredTours={allTours} />
        </ScrollReveal>
        <ScrollReveal variant="fade-left" amount={0.2}>
          <BecomeGuideCTA />
        </ScrollReveal>
        <ScrollReveal variant="fade-right" amount={0.2}>
          <WhyChooseUsSection />
        </ScrollReveal>
        <ScrollReveal variant="zoom-in" amount={0.2}>
          <PopularCitiesSection />
        </ScrollReveal>
        <ScrollReveal variant="fade-up" amount={0.2}>
          <HowItWorksSection />
        </ScrollReveal>
      </main>
    </>
  );
}
