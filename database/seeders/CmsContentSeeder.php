<?php

namespace Database\Seeders;

use App\Models\Certification;
use App\Models\Faq;
use App\Models\FooterLink;
use App\Models\InternshipProdiStat;
use App\Models\InternshipYear;
use App\Models\KubTalk;
use App\Models\Mission;
use App\Models\NavLink;
use App\Models\PageContent;
use App\Models\PraktisiMengajarCourse;
use App\Models\PraktisiMengajarProdi;
use App\Models\PraktisiMengajarSemester;
use App\Models\Program;
use App\Models\ProgramKerja;
use App\Models\SertifikasiProdi;
use App\Models\TeamMember;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CmsContentSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedNavLinks();
        $this->seedFooterLinks();
        $this->seedPrograms();
        $this->seedFaqs();
        $this->seedPageContents();
        $this->seedInternship();
        $this->seedPraktisiMengajar();
        $this->seedKubTalks();
        $this->seedSertifikasi();
        $this->seedTeam();
        $this->seedMissions();
        $this->seedProgramKerja();
    }

    private function seedNavLinks(): void
    {
        $links = [
            ['label' => 'Beranda', 'href' => '/'],
            ['label' => 'Portal Magang', 'href' => '#'],
            ['label' => 'Tentang Kami', 'href' => '/about'],
        ];
        foreach ($links as $i => $link) {
            NavLink::updateOrCreate(
                ['sort_order' => $i],
                ['label' => $link['label'], 'href' => $link['href']],
            );
        }
    }

    private function seedFooterLinks(): void
    {
        $groups = [
            1 => ['Penerimaan', 'Kontak', 'Informasi'],
            2 => ['FAQ', 'Hubungi Kami', 'Karir', 'Riset'],
            3 => ['Berita', 'Kebijakan Privasi', 'Tentang Mahasiswa', 'Tentang Dosen'],
        ];
        foreach ($groups as $g => $items) {
            foreach ($items as $i => $label) {
                FooterLink::updateOrCreate(
                    ['group_index' => $g, 'label' => $label],
                    ['url' => null, 'sort_order' => $i],
                );
            }
        }
    }

    private function seedPrograms(): void
    {
        $programs = [
            ['name' => 'Internship Program', 'image' => '/assets/internship-program.png', 'link' => '/internship-program'],
            ['name' => 'Praktisi Mengajar', 'image' => '/assets/praktisi-mengajar.png', 'link' => '/practitioner-teaching'],
            ['name' => 'Sertifikasi Mahasiswa', 'image' => '/assets/internship-mandiri.png', 'link' => '/student-certification'],
            ['name' => 'KUB Talk', 'image' => '/assets/kub-talk-1.jpg', 'link' => '/kub-talk'],
        ];
        foreach ($programs as $i => $p) {
            Program::updateOrCreate(['name' => $p['name']], $p + ['sort_order' => $i]);
        }
    }

    private function seedFaqs(): void
    {
        $faqs = [
            [
                'question' => 'Bagaimana program Unviersitas Bakrie dapat terhubung dengan industri?',
                'answer' => 'Program PPAIP dirancang supaya mahasiswa tidak hanya belajar konsep di kelas, tapi juga ketemu langsung dengan kebutuhan industri lewat internship, sertifikasi, praktisi mengajar, dan forum KUB Talk.',
            ],
            [
                'question' => 'Apa hubungan program ini dengan “Experience The Real Thing”?',
                'answer' => 'Jargon “Experience The Real Thing” diterjemahkan lewat pengalaman nyata: mahasiswa magang di perusahaan, belajar dari praktisi, mengenal standar profesional lewat sertifikasi, dan melihat langsung cara industri bekerja.',
            ],
            [
                'question' => 'Program apa saja yang paling dekat dengan dunia kerja?',
                'answer' => 'Internship Program, Praktisi Mengajar, Sertifikasi Mahasiswa, dan KUB Talk menjadi jalur utama untuk menghubungkan mahasiswa dengan industri, termasuk jejaring Kelompok Usaha Bakrie, BUMN, dan mitra eksternal.',
            ],
            [
                'question' => 'Kenapa mahasiswa perlu ikut program-program ini?',
                'answer' => 'Karena pengalaman industri membantu mahasiswa memahami ekspektasi dunia kerja lebih awal, membangun portofolio, memperluas networking, dan menyiapkan skill yang lebih relevan sebelum lulus.',
            ],
        ];
        foreach ($faqs as $i => $f) {
            Faq::updateOrCreate(['question' => $f['question']], $f + ['sort_order' => $i]);
        }
    }

    private function seedPageContents(): void
    {
        PageContent::put(
            'welcome.about_description',
            'Universitas Bakrie (UBakrie) adalah universitas swasta dengan akreditasi Unggul yang dikelola oleh Yayasan Pendidikan Bakrie. Didirikan pada tahun 2009, UBakrie berkomitmen untuk menyediakan pendidikan tinggi berkualitas dengan pengakuan nasional dan internasional. Ciri khas UBakrie adalah metode Experiential Learning, yang didasarkan pada pengalaman dunia nyata di dunia usaha dan industri. Mahasiswa belajar langsung dari para profesional, termasuk para CEO perusahaan di Grup Bakrie, melalui kasus nyata, praktikum, kunjungan industri, dan proyek nyata.'
        );
        PageContent::put(
            'praktisi_mengajar.about_description',
            'Universitas Bakrie (UBakrie) adalah universitas swasta dengan akreditasi Unggul yang dikelola oleh Yayasan Pendidikan Bakrie. Didirikan pada tahun 2009, UBakrie berkomitmen untuk menyediakan pendidikan tinggi berkualitas dengan pengakuan nasional dan internasional. Ciri khas UBakrie adalah metode Pembelajaran Berbasis Pengalaman, yang didasarkan pada pengalaman dunia nyata di bidang bisnis dan industri. Mahasiswa belajar langsung dari para profesional, termasuk CEO perusahaan-perusahaan dalam Grup Bakrie, melalui studi kasus nyata, praktik, kunjungan industri, dan proyek nyata.'
        );
        PageContent::put(
            'sertifikasi.about_description',
            'Halaman ini menampilkan daftar sertifikasi yang dapat diikuti oleh mahasiswa Universitas Bakrie per program studi. Klik salah satu program studi untuk melihat sertifikasi yang tersedia maupun yang akan segera hadir.'
        );
        PageContent::put(
            'tentang_kami.about_intro',
            'UPT Pengembangan Pembelajaran, Akademik & Inovasi Pembelajaran (PPAIP) adalah unit pelaksana teknis Universitas Bakrie yang berfokus pada pengembangan akademik, pengelolaan program magang mahasiswa, sertifikasi profesional, serta peningkatan kompetensi dosen. Kami hadir untuk menjembatani dunia kampus dengan dunia industri melalui ekosistem pembelajaran berbasis pengalaman.'
        );
        PageContent::put(
            'tentang_kami.vision',
            'Menjadi unit pelaksana teknis yang unggul dalam pengembangan akademik dan inovasi pembelajaran berbasis pengalaman, yang menghubungkan dunia akademik dengan dunia industri secara berkelanjutan.'
        );
        PageContent::put('tentang_kami.group_photo_src', '/assets/ppaip-team-group.jpg');
        PageContent::put('tentang_kami.group_photo_fallback', '/assets/bakrie-banner.jpg');
        PageContent::put(
            'tentang_kami.group_photo_caption',
            'Tim PPAIP Universitas Bakrie — berkomitmen mendukung mahasiswa, dosen, dan mitra industri dalam ekosistem pembelajaran yang berkualitas.'
        );
        PageContent::put('kub_talk.banner_image', '/assets/kub-talk-1.jpg');
    }

    private function seedInternship(): void
    {
        $data = [
            '2024' => [
                'summary' => ['kub' => 120, 'nonKub' => 40, 'bumn' => 30],
                'prodi' => [
                    ['name' => 'Ilmu Komunikasi', 'kub' => 55, 'nonKub' => 30, 'bumn' => 15],
                    ['name' => 'Manajemen', 'kub' => 45, 'nonKub' => 35, 'bumn' => 20],
                    ['name' => 'Akuntansi', 'kub' => 65, 'nonKub' => 20, 'bumn' => 15],
                    ['name' => 'Teknik Sipil', 'kub' => 55, 'nonKub' => 25, 'bumn' => 20],
                    ['name' => 'Teknik Informatika', 'kub' => 70, 'nonKub' => 15, 'bumn' => 15],
                    ['name' => 'Sistem Informasi', 'kub' => 45, 'nonKub' => 35, 'bumn' => 20],
                    ['name' => 'Teknik Industri', 'kub' => 55, 'nonKub' => 25, 'bumn' => 20],
                    ['name' => 'Ilmu & Teknologi Pangan', 'kub' => 45, 'nonKub' => 35, 'bumn' => 20],
                    ['name' => 'Teknik Lingkungan', 'kub' => 70, 'nonKub' => 15, 'bumn' => 15],
                ],
            ],
            '2025' => [
                'summary' => ['kub' => 150, 'nonKub' => 50, 'bumn' => 45],
                'prodi' => [
                    ['name' => 'Ilmu Komunikasi', 'kub' => 55, 'nonKub' => 30, 'bumn' => 15],
                    ['name' => 'Manajemen', 'kub' => 45, 'nonKub' => 35, 'bumn' => 20],
                    ['name' => 'Akuntansi', 'kub' => 65, 'nonKub' => 20, 'bumn' => 15],
                    ['name' => 'Teknik Sipil', 'kub' => 55, 'nonKub' => 25, 'bumn' => 20],
                    ['name' => 'Teknik Informatika', 'kub' => 70, 'nonKub' => 15, 'bumn' => 15],
                    ['name' => 'Sistem Informasi', 'kub' => 45, 'nonKub' => 35, 'bumn' => 20],
                    ['name' => 'Teknik Industri', 'kub' => 55, 'nonKub' => 25, 'bumn' => 20],
                    ['name' => 'Ilmu & Teknologi Pangan', 'kub' => 45, 'nonKub' => 35, 'bumn' => 20],
                    ['name' => 'Teknik Lingkungan', 'kub' => 70, 'nonKub' => 15, 'bumn' => 15],
                ],
            ],
            '2026' => [
                'summary' => ['kub' => 160, 'nonKub' => 60, 'bumn' => 55],
                'prodi' => [
                    ['name' => 'Ilmu Komunikasi', 'kub' => 58, 'nonKub' => 27, 'bumn' => 15],
                    ['name' => 'Manajemen', 'kub' => 50, 'nonKub' => 32, 'bumn' => 18],
                    ['name' => 'Akuntansi', 'kub' => 65, 'nonKub' => 20, 'bumn' => 15],
                    ['name' => 'Teknik Sipil', 'kub' => 58, 'nonKub' => 25, 'bumn' => 17],
                    ['name' => 'Teknik Informatika', 'kub' => 72, 'nonKub' => 12, 'bumn' => 16],
                    ['name' => 'Sistem Informasi', 'kub' => 48, 'nonKub' => 34, 'bumn' => 18],
                    ['name' => 'Teknik Industri', 'kub' => 58, 'nonKub' => 27, 'bumn' => 15],
                    ['name' => 'Ilmu & Teknologi Pangan', 'kub' => 50, 'nonKub' => 32, 'bumn' => 18],
                    ['name' => 'Teknik Lingkungan', 'kub' => 72, 'nonKub' => 12, 'bumn' => 16],
                ],
            ],
        ];

        $sort = 0;
        foreach ($data as $year => $info) {
            $row = InternshipYear::updateOrCreate(
                ['year' => $year],
                [
                    'summary_kub' => $info['summary']['kub'],
                    'summary_non_kub' => $info['summary']['nonKub'],
                    'summary_bumn' => $info['summary']['bumn'],
                    'sort_order' => $sort++,
                ]
            );
            $row->prodiStats()->delete();
            foreach ($info['prodi'] as $i => $p) {
                InternshipProdiStat::create([
                    'internship_year_id' => $row->id,
                    'name' => $p['name'],
                    'kub' => $p['kub'],
                    'non_kub' => $p['nonKub'],
                    'bumn' => $p['bumn'],
                    'sort_order' => $i,
                ]);
            }
        }
    }

    private function seedPraktisiMengajar(): void
    {
        $stats = [
            ['name' => 'Manajemen', 'count' => 10],
            ['name' => 'Akuntansi', 'count' => 10],
            ['name' => 'Ilmu Komunikasi', 'count' => 8],
            ['name' => 'Teknik Sipil', 'count' => 8],
            ['name' => 'Sistem Informasi', 'count' => 10],
            ['name' => 'Teknik Informatika', 'count' => 12],
            ['name' => 'Teknik Industri', 'count' => 9],
            ['name' => 'Teknik Lingkungan', 'count' => 7],
            ['name' => 'Ilmu & Teknologi Pangan', 'count' => 6],
        ];

        $flagPattern = [
            1 => [4],
            2 => [4, 9],
            3 => [11],
            4 => [2, 7],
            5 => [3, 8, 12],
            6 => [5],
            7 => [1, 10],
            8 => [6],
        ];

        foreach ($stats as $sortIndex => $stat) {
            $slug = Str::slug(str_replace('&', 'dan', $stat['name']));
            $prodi = PraktisiMengajarProdi::updateOrCreate(
                ['slug' => $slug],
                ['name' => $stat['name'], 'sort_order' => $sortIndex],
            );

            $prodi->semesters()->delete();

            $budget = $stat['count'];
            foreach ($flagPattern as $semIdx => $flagged) {
                $semester = PraktisiMengajarSemester::create([
                    'practitioner_teaching_major_id' => $prodi->id,
                    'title' => 'Semester '.$semIdx,
                    'sort_order' => $semIdx,
                ]);

                $courseCount = ($semIdx - 1) % 2 === 0 ? 12 : 11;
                for ($i = 1; $i <= $courseCount; $i++) {
                    $isPraktisi = $budget > 0 && in_array($i, $flagged, true);
                    if ($isPraktisi) {
                        $budget -= 1;
                    }
                    PraktisiMengajarCourse::create([
                        'practitioner_teaching_semester_id' => $semester->id,
                        'name' => 'Mata Kuliah '.$i,
                        'is_practitioner' => $isPraktisi,
                        'sort_order' => $i,
                    ]);
                }
            }
        }
    }

    private function seedKubTalks(): void
    {
        $items = [
            [
                'image' => '/assets/kub-talk-1.jpg',
                'images' => ['/assets/kub-talk-1.jpg', '/assets/kub-talk-2.jpg'],
                'title' => 'KUB Talk with PT VKTR Teknologi Mobilitas',
                'description' => 'Sesi luar biasa ini dibawakan langsung oleh Bapak R. Ariyo Putro, selaku Direktur di PT VKTR Teknologi Mobilitas, yang membahas masa depan kendaraan listrik di Indonesia.',
                'company_name' => 'PT VKTR Teknologi Mobilitas',
                'speaker_name' => 'R. Ariyo Putro',
                'speaker_title' => 'Direktur',
                'event_date' => '2026-04-15',
            ],
            [
                'image' => '/assets/kub-talk-2.jpg',
                'images' => ['/assets/kub-talk-2.jpg', '/assets/kub-talk-1.jpg'],
                'title' => 'KUB Talk with PT Kutai Bara Nusantara',
                'description' => 'Belajar langsung dari ahlinya tentang dunia IT di industri profesional bersama Pak Adi Alam, S.Kom., M.M.S.I., membahas arsitektur cloud dan keamanan data.',
                'company_name' => 'PT Kutai Bara Nusantara',
                'speaker_name' => 'Adi Alam, S.Kom., M.M.S.I.',
                'speaker_title' => 'Head of IT Division',
                'event_date' => '2026-05-10',
            ],
        ];
        foreach ($items as $i => $item) {
            KubTalk::updateOrCreate(
                ['title' => $item['title']],
                $item + ['sort_order' => $i],
            );
        }
    }

    private function seedSertifikasi(): void
    {
        $data = [
            ['name' => 'Manajemen', 'certs' => [
                ['title' => 'Certified Marketing Professional', 'issuer' => 'BNSP', 'available' => true, 'register_url' => '#'],
                ['title' => 'Project Management Fundamentals', 'issuer' => 'BNSP', 'available' => true, 'register_url' => '#'],
                ['title' => 'Digital Business Strategy', 'issuer' => 'BNSP', 'available' => false, 'register_url' => null],
            ]],
            ['name' => 'Akuntansi', 'certs' => [
                ['title' => 'Certified Public Accountant (CPA) Prep', 'issuer' => 'BSNP', 'available' => true, 'register_url' => '#'],
                ['title' => 'Tax Brevet A & B', 'issuer' => 'BNSP', 'available' => true, 'register_url' => '#'],
                ['title' => 'Audit Internal Sertifikasi', 'issuer' => 'BNSP', 'available' => false, 'register_url' => null],
            ]],
            ['name' => 'Ilmu Komunikasi', 'certs' => [
                ['title' => 'Digital Content Creator', 'issuer' => 'BNSP', 'available' => true, 'register_url' => '#'],
                ['title' => 'Public Relations Specialist', 'issuer' => 'BNSP', 'available' => false, 'register_url' => null],
            ]],
            ['name' => 'Teknik Sipil', 'certs' => [
                ['title' => 'Ahli Muda Teknik Bangunan Gedung', 'issuer' => 'BNSP', 'available' => false, 'register_url' => null],
                ['title' => 'K3 Konstruksi', 'issuer' => 'BNSP', 'available' => false, 'register_url' => null],
            ]],
            ['name' => 'Sistem Informasi', 'certs' => [
                ['title' => 'Business Process Analyst', 'issuer' => 'BNSP', 'available' => true, 'register_url' => '#'],
                ['title' => 'Database Administrator', 'issuer' => 'BNSP', 'available' => true, 'register_url' => '#'],
                ['title' => 'SAP Fundamentals', 'issuer' => 'BNSP', 'available' => false, 'register_url' => null],
            ]],
            ['name' => 'Teknik Informatika', 'certs' => [
                ['title' => 'AWS Cloud Practitioner', 'issuer' => 'Amazon Web Services', 'available' => true, 'register_url' => '#'],
                ['title' => 'Cisco Certified Network Associate (CCNA)', 'issuer' => 'Cisco', 'available' => true, 'register_url' => '#'],
                ['title' => 'Junior Web Developer', 'issuer' => 'BNSP', 'available' => true, 'register_url' => '#'],
                ['title' => 'Machine Learning Specialty', 'issuer' => 'Google', 'available' => false, 'register_url' => null],
            ]],
            ['name' => 'Teknik Industri', 'certs' => [
                ['title' => 'Lean Six Sigma Yellow Belt', 'issuer' => 'IASSC', 'available' => true, 'register_url' => '#'],
                ['title' => 'Supply Chain Management', 'issuer' => 'BNSP', 'available' => false, 'register_url' => null],
            ]],
            ['name' => 'Teknik Lingkungan', 'certs' => [
                ['title' => 'Auditor Lingkungan', 'issuer' => 'BNSP', 'available' => false, 'register_url' => null],
            ]],
            ['name' => 'Ilmu & Teknologi Pangan', 'certs' => [
                ['title' => 'HACCP Awareness', 'issuer' => 'BPOM', 'available' => true, 'register_url' => '#'],
                ['title' => 'Food Safety Manager', 'issuer' => 'BNSP', 'available' => false, 'register_url' => null],
            ]],
        ];

        foreach ($data as $sortIndex => $item) {
            $prodi = SertifikasiProdi::updateOrCreate(
                ['name' => $item['name']],
                ['sort_order' => $sortIndex],
            );
            $prodi->certifications()->delete();
            foreach ($item['certs'] as $i => $cert) {
                Certification::create([
                    'certification_major_id' => $prodi->id,
                    'title' => $cert['title'],
                    'issuer' => $cert['issuer'],
                    'is_available' => $cert['available'],
                    'register_url' => $cert['register_url'],
                    'sort_order' => $i,
                ]);
            }
        }
    }

    private function seedTeam(): void
    {
        $members = [
            ['type' => 'ketua', 'name' => 'Dr. Rizki Maryam Astuti, S.Si., M.Si.', 'role' => 'Ketua UPT PPAIP', 'photo' => '/assets/team/ketua.jpg', 'bio' => 'Memimpin arah strategis PPAIP dalam pengembangan akademik Universitas Bakrie.'],
            ['type' => 'staff', 'name' => 'Arin Septiarin', 'role' => 'Staff PPAIP — Administrasi Magang', 'photo' => '/assets/team/staff-1.jpg', 'bio' => 'Mengelola administrasi program magang mahasiswa.'],
            ['type' => 'staff', 'name' => 'Isman', 'role' => 'Staff PPAIP — Sertifikasi Mahasiswa', 'photo' => '/assets/team/staff-2.jpg', 'bio' => 'Memfasilitasi program sertifikasi dan praktisi mengajar.'],
        ];
        foreach ($members as $i => $m) {
            TeamMember::updateOrCreate(['name' => $m['name']], $m + ['sort_order' => $i]);
        }
    }

    private function seedMissions(): void
    {
        $missions = [
            'Memfasilitasi program magang mahasiswa yang berkualitas dan terhubung langsung dengan kebutuhan industri.',
            'Menyelenggarakan program sertifikasi profesional untuk meningkatkan daya saing lulusan.',
            'Mendorong pengembangan kompetensi dosen melalui kolaborasi dengan praktisi dari berbagai sektor industri.',
            'Membangun ekosistem pembelajaran yang inovatif, transparan, dan berkelanjutan di lingkungan Universitas Bakrie.',
        ];
        foreach ($missions as $i => $statement) {
            Mission::updateOrCreate(['statement' => $statement], ['sort_order' => $i]);
        }
    }

    private function seedProgramKerja(): void
    {
        $programs = [
            ['icon' => 'Briefcase', 'title' => 'Internship Program', 'description' => 'Mengelola dan memfasilitasi program magang mahasiswa baik di internal Grup Bakrie (KUB) maupun mitra eksternal (Non-KUB).'],
            ['icon' => 'GraduationCap', 'title' => 'Praktisi Mengajar', 'description' => 'Menghadirkan praktisi industri sebagai pengajar untuk memperkaya pengalaman pembelajaran mahasiswa di setiap program studi.'],
            ['icon' => 'Award', 'title' => 'Sertifikasi Mahasiswa', 'description' => 'Menyelenggarakan program sertifikasi profesional yang diakui industri untuk meningkatkan kompetensi dan daya saing lulusan.'],
            ['icon' => 'Mic', 'title' => 'KUB Talk', 'description' => 'Forum diskusi rutin bersama Kelompok Usaha Bakrie untuk membahas tren industri, peluang karier, dan kolaborasi akademik.'],
            ['icon' => 'BookOpen', 'title' => 'Pengembangan Dosen', 'description' => 'Memfasilitasi pelatihan, workshop, dan kegiatan pengembangan kompetensi profesional bagi dosen Universitas Bakrie.'],
            ['icon' => 'Network', 'title' => 'Kemitraan Industri', 'description' => 'Membangun dan memelihara jaringan kerja sama strategis dengan perusahaan, lembaga sertifikasi, dan asosiasi profesi.'],
        ];
        foreach ($programs as $i => $p) {
            ProgramKerja::updateOrCreate(['title' => $p['title']], $p + ['sort_order' => $i]);
        }
    }
}
