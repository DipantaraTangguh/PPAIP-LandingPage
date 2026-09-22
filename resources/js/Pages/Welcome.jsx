import Seo from '@/Components/Seo';
import {
  PublicLayout,
  HeroBanner,
  AboutCard,
  ProgramCarousel,
  FaqSection,
} from '@/Components/Layouts';

export default function Welcome({ programs = [], faqItems = [], aboutDescription = '' }) {
  return (
    <>
      <Seo />

      <PublicLayout heroSlot={<HeroBanner />}>
        <AboutCard description={aboutDescription} />
        <ProgramCarousel programs={programs} />
        <FaqSection items={faqItems} />
      </PublicLayout>
    </>
  );
}
