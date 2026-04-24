import React from 'react';
import { Head } from '@inertiajs/react';

// Organisms
import {
  Navbar,
  HeroBanner,
  AboutCard,
  ProgramCarousel,
  FaqSection,
  Footer,
} from '@/Components/organisms';

// Data
import {
  NAV_LINKS,
  PROGRAMS,
  FAQ_ITEMS,
  FOOTER_LINKS,
  ABOUT_DESCRIPTION,
} from '@/constants/welcomeData';

/**
 * Page: Welcome (Landing Page)
 *
 * Composes organisms with static data to form the full landing page.
 * Contains zero business logic — all state lives inside the organisms.
 */
export default function Welcome() {
  return (
    <>
      <Head title="PPAIP Universitas Bakrie - Experience The Real Things" />

      <div className="min-h-screen bg-white font-sans antialiased">
        <Navbar links={NAV_LINKS} />
        <HeroBanner />
        <AboutCard description={ABOUT_DESCRIPTION} />
        <ProgramCarousel programs={PROGRAMS} />
        <FaqSection items={FAQ_ITEMS} />
        <Footer linkColumns={FOOTER_LINKS} />
      </div>
    </>
  );
}
