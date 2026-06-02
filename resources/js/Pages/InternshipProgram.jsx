import React, { useState, useMemo } from 'react';
import { Head, usePage } from '@inertiajs/react';

import {
  Navbar,
  PageHeroBanner,
  YearFilter,
  DonutSummarySection,
  InternshipProdiGrid,
  Footer,
} from '@/Components/Layouts';

export default function InternshipProgramPage({ years = [], internshipData = {}, bannerImage = '/assets/internship-program.png' }) {
  const { navLinks = [], footerLinks = [] } = usePage().props;

  const defaultYear = useMemo(() => {
    if (years.length === 0) return null;
    return years.includes('2025') ? '2025' : years[years.length - 1];
  }, [years]);

  const [activeYear, setActiveYear] = useState(defaultYear);
  const currentData = activeYear ? internshipData[activeYear] : null;

  return (
    <>
      <Head title="Internship Program - PPAIP Universitas Bakrie" />

      <div className="min-h-screen bg-gray-50 font-sans antialiased">
        <Navbar links={navLinks} />

        <PageHeroBanner
          title="Internship Program"
          subtitle="Persentase sebaran tempat mahasiswa magang"
          backgroundImage={bannerImage}
        />

        {years.length > 0 && (
          <YearFilter
            years={years}
            activeYear={activeYear}
            onYearChange={setActiveYear}
          />
        )}

        {currentData && (
          <>
            <DonutSummarySection
              key={activeYear}
              kub={currentData.summary.kub}
              nonKub={currentData.summary.nonKub}
              bumn={currentData.summary.bumn}
            />

            <InternshipProdiGrid
              key={activeYear + '-grid'}
              prodiList={currentData.prodi}
            />
          </>
        )}

        <Footer linkColumns={footerLinks} />
      </div>
    </>
  );
}
