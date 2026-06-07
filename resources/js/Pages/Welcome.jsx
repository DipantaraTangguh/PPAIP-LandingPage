import { usePage } from '@inertiajs/react';

import Seo from '@/Components/Seo';
import {
  Navbar,
  HeroBanner,
  AboutCard,
  ProgramCarousel,
  FaqSection,
  Footer,
} from '@/Components/Layouts';

export default function Welcome({ programs = [], faqItems = [], aboutDescription = '' }) {
  const { navLinks = [], footerLinks = [] } = usePage().props;

  return (
    <>
      <Seo
        title="Experience The Real Things"
        description="Temukan program industri Universitas Bakrie melalui internship, praktisi mengajar, sertifikasi mahasiswa, dan KUB Talk."
        image="/assets/bakrie-hero.jpg"
      />

      <div className="min-h-screen bg-white font-sans antialiased">
        <Navbar links={navLinks} />
        <HeroBanner />
        <AboutCard description={aboutDescription} />
        <ProgramCarousel programs={programs} />
        <FaqSection items={faqItems} />
        <Footer linkColumns={footerLinks} />
      </div>
    </>
  );
}
