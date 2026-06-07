import { usePage } from '@inertiajs/react';

import Seo from '@/Components/Seo';
import {
  Navbar,
  PageHeroBanner,
  ProdiStatsGrid,
  InfoCard,
  Footer,
} from '@/Components/Layouts';

export default function PraktisiMengajar({ prodiStats = [], aboutDescription = '', bannerImage = '/assets/praktisi-mengajar.png' }) {
  const { navLinks = [], footerLinks = [] } = usePage().props;

  const stats = prodiStats.map((s) => ({
    name: s.name,
    count: s.count,
    href: `/practitioner-teaching/${s.slug}`,
  }));

  return (
    <>
      <Seo
        title="Praktisi Mengajar"
        description="Jelajahi program Praktisi Mengajar Universitas Bakrie yang menghadirkan pengalaman dan perspektif profesional industri ke dalam kelas."
        image={bannerImage}
      />

      <div className="min-h-screen bg-white font-sans antialiased">
        <Navbar links={navLinks} />

        <PageHeroBanner
          title="Praktisi Mengajar"
          subtitle="Menampilkan data statistik praktisi yang mengajar di tiap program studi"
          backgroundImage={bannerImage}
        />

        <ProdiStatsGrid stats={stats} />

        <InfoCard
          title="Keterangan lainnya"
          description={aboutDescription}
        />

        <Footer linkColumns={footerLinks} />
      </div>
    </>
  );
}
