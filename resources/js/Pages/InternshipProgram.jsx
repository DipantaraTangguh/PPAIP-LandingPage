import React, { useState } from 'react';
import { Head } from '@inertiajs/react';

// Organisms
import {
  Navbar,
  PageHeroBanner,
  YearFilter,
  DonutSummarySection,
  InternshipProdiGrid,
  Footer,
} from '@/Components/organisms';

// Data
import { NAV_LINKS, FOOTER_LINKS } from '@/constants/welcomeData';
import { YEARS, INTERNSHIP_DATA } from '@/constants/internshipData';

/**
 * Page: Internship Program
 *
 * Displays KUB/Non-KUB internship statistics with year filtering,
 * a donut chart summary, and per-prodi stacked bar breakdowns.
 */
export default function InternshipProgramPage() {
  const [activeYear, setActiveYear] = useState("2025");
  const currentData = INTERNSHIP_DATA[activeYear];

  return (
    <>
      <Head title="Internship Program - PPAIP Universitas Bakrie" />

      <div className="min-h-screen bg-gray-50 font-sans antialiased">
        <Navbar links={NAV_LINKS} />

        <PageHeroBanner
          title="Internship Program"
          subtitle="Persentase sebaran tempat mahasiswa magang"
          backgroundImage="/assets/internship-program.png"
        />

        <YearFilter
          years={YEARS}
          activeYear={activeYear}
          onYearChange={setActiveYear}
        />

        <DonutSummarySection
          key={activeYear}
          kub={currentData.summary.kub}
          nonKub={currentData.summary.nonKub}
        />

        <InternshipProdiGrid
          key={activeYear + "-grid"}
          prodiList={currentData.prodi}
        />

        <Footer linkColumns={FOOTER_LINKS} />
      </div>
    </>
  );
}
