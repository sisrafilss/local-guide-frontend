import BecomeGuideCTA from '@/components/modules/Home/BecomeGuideCTA';
import FeaturedSection from '@/components/modules/Home/FeaturedSection';
import HeroSearchBar from '@/components/modules/Home/Hero';
import HowItWorksSection from '@/components/modules/Home/HowItWorkSection';
import PopularCitiesSection from '@/components/modules/Home/PopularCitiesSection';
import WhyChooseUsSection from '@/components/modules/Home/WhyChooseUs';
import Head from 'next/head';

export default function Home() {
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
        <HeroSearchBar />
        <FeaturedSection />
        <BecomeGuideCTA />
        <WhyChooseUsSection />
        <PopularCitiesSection />
        <HowItWorksSection />
      </main>
    </>
  );
}
