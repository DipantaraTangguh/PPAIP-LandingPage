import React from 'react';
import { Head, usePage } from '@inertiajs/react';

import {
  Navbar,
  PageHeroBanner,
  ProdiStatsGrid,
  InfoCard,
  Footer,
} from '@/Components/Layouts';

export default function PraktisiMengajar({ prodiStats = [], aboutDescription = '' }) {
  const { navLinks = [], footerLinks = [] } = usePage().props;

  const stats = prodiStats.map((s) => ({
    name: s.name,
    count: s.count,
    href: `/praktisi-mengajar/${s.slug}`,
  }));

  return (
    <>
      <Head title="Praktisi Mengajar - PPAIP Universitas Bakrie" />

      <div className="min-h-screen bg-white font-sans antialiased">
        <Navbar links={navLinks} />

        <PageHeroBanner
          title="Praktisi Mengajar"
          subtitle="Menampilkan data statistik praktisi yang mengajar di tiap program studi"
          backgroundImage="/assets/praktisi-mengajar.png"
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
