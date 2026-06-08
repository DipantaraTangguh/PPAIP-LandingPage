import { useMemo, useState } from 'react';

import Seo from '@/Components/Seo';
import {
  PublicLayout,
  YearFilter,
  DonutSummarySection,
  InternshipProdiGrid,
} from '@/Components/Layouts';

export default function InternshipProgramPage({ years = [], internshipData = {}, bannerImage = '/assets/internship-program.png', catalogUrl }) {
  const defaultYear = useMemo(() => {
    if (years.length === 0) return null;
    return [...years].sort((a, b) => Number(b) - Number(a))[0] || years[years.length - 1];
  }, [years]);

  const [activeYear, setActiveYear] = useState(defaultYear);
  const currentData = activeYear ? internshipData[activeYear] : null;

  return (
    <>
      <Seo
        title="Internship Program"
        description="Lihat sebaran program magang mahasiswa Universitas Bakrie di perusahaan KUB, Non-KUB, dan BUMN berdasarkan tahun dan program studi."
        image={bannerImage}
      />

      <PublicLayout
        rootClassName="min-h-screen bg-gray-50 font-sans antialiased"
        hero={{
          title: 'Internship Program',
          subtitle: 'Persentase sebaran tempat mahasiswa magang',
          backgroundImage: bannerImage,
        }}
      >
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
              catalogUrl={catalogUrl}
            />
          </>
        )}
      </PublicLayout>
    </>
  );
}
