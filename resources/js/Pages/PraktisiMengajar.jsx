import React from 'react';
import { Head } from '@inertiajs/react';

// Organisms
import {
  Navbar,
  PageHeroBanner,
  ProdiStatsGrid,
  InfoCard,
  Footer,
} from '@/Components/organisms';

// Data
import { NAV_LINKS, FOOTER_LINKS } from '@/constants/welcomeData';
import { PRODI_STATS, ABOUT_DESCRIPTION } from '@/constants/praktisiMengajarData';

/**
 * Page: Praktisi Mengajar
 *
 * Displays statistics of practitioner lecturers per program studi.
 */
export default function PraktisiMengajar() {
  return (
    <>
      <Head title="Praktisi Mengajar - PPAIP Universitas Bakrie" />

      <div className="min-h-screen bg-white font-sans antialiased">
        <Navbar links={NAV_LINKS} />

        <PageHeroBanner
          title="Praktisi Mengajar"
          subtitle="Menampilkan data statistik praktisi yang mengajar di tiap program studi"
          backgroundImage="/assets/praktisi-mengajar.png"
        />

        <ProdiStatsGrid stats={PRODI_STATS} />

        <InfoCard
          title="Keterangan lainnya"
          description={ABOUT_DESCRIPTION}
        />

        <Footer linkColumns={FOOTER_LINKS} />
      </div>
    </>
  );
}
