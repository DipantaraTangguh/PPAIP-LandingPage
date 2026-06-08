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
      <Seo
        title="Experience The Real Things"
        description="Temukan program industri Universitas Bakrie melalui internship, praktisi mengajar, sertifikasi mahasiswa, dan KUB Talk."
        image="/assets/bakrie-hero.jpg"
      />

      <PublicLayout heroSlot={<HeroBanner />}>
        <AboutCard description={aboutDescription} />
        <ProgramCarousel programs={programs} />
        <FaqSection items={faqItems} />
      </PublicLayout>
    </>
  );
}
