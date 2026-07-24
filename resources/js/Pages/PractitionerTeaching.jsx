import Seo from '@/Components/Seo';
import {
  PublicLayout,
  ProdiStatsGrid,
  InfoCard,
} from '@/Components/Layouts';

export default function PractitionerTeaching({ majorStats = [], aboutDescription = '', bannerImage = '/assets/praktisi-mengajar.png' }) {
  const stats = majorStats.map((s) => ({
    name: s.name,
    count: s.count,
    href: `/practitioner-teaching/${s.slug}`,
  }));

  return (
    <>
      <Seo
        title="Kemitraan dan Pembelajaran Berbasis Proyek"
        description="Jelajahi program Kemitraan dan Pembelajaran Berbasis Proyek Universitas Bakrie yang menghadirkan pengalaman dan perspektif profesional industri ke dalam kelas."
        image={bannerImage}
      />

      <PublicLayout
        hero={{
          title: 'Kemitraan dan Pembelajaran Berbasis Proyek',
          subtitle: 'Menampilkan data statistik praktisi yang mengajar di tiap program studi',
          backgroundImage: bannerImage,
        }}
      >
        <ProdiStatsGrid stats={stats} />

        <InfoCard
          title="Keterangan lainnya"
          description={aboutDescription}
        />
      </PublicLayout>
    </>
  );
}
