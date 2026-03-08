export const dynamic = 'force-dynamic';

import { ScrollReveal } from '@/components/animations/ScrollReveal';

const ExploreToursPage = () => {
  return (
    <div className="px-4 py-10">
      <ScrollReveal variant="fade-up" className="mx-auto max-w-3xl">
        <div className="rounded-xl border border-border bg-card p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-foreground">
            Explore Tours
          </h1>
          <p className="mt-2 text-muted-foreground">
            Guide-specific explore tours page will be available soon.
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default ExploreToursPage;
