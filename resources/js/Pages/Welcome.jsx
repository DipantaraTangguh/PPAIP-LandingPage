import { Head, usePage } from '@inertiajs/react';

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
      <Head title="PPAIP Universitas Bakrie - Experience The Real Things" />

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
