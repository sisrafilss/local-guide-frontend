import { ScrollReveal } from '@/components/animations/ScrollReveal';
import TextSummarizer from '@/components/modules/AI/TextSummarizer';
import ManagementPageHeader from '@/components/shared/ManagementPageHeader';

export const metadata = {
  title: 'AI Text Summarizer | Local Guide',
  description: 'Easily summarize long paragraphs using our advanced AI engine.',
};

const SummarizerPage = () => {
  return (
    <div className="container mx-auto py-10 px-4 min-h-[calc(100vh-200px)]">
      <ScrollReveal variant="fade-down" duration={0.6}>
        <div className="mb-10 text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Summarize Smarter
            </h1>
            <p className="text-muted-foreground text-lg italic">
                Cut through the noise. Transform long, complex content into clear, actionable summaries in one click.
            </p>
        </div>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delay={0.2} duration={0.8}>
        <TextSummarizer />
      </ScrollReveal>

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-20 dark:opacity-10">
          <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-primary/40 rounded-full blur-[120px]" />
      </div>
    </div>
  );
};

export default SummarizerPage;
