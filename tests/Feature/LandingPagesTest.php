<?php

namespace Tests\Feature;

use App\Models\Certification;
use App\Models\Faq;
use App\Models\InternshipYear;
use App\Models\KubTalk;
use App\Models\PageContent;
use App\Models\PraktisiMengajarCourse;
use App\Models\PraktisiMengajarProdi;
use App\Models\PraktisiMengajarSemester;
use App\Models\Program;
use App\Models\SertifikasiProdi;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class LandingPagesTest extends TestCase
{
    use RefreshDatabase;

    public function test_homepage_uses_cms_programs_faqs_and_about_content(): void
    {
        PageContent::put('welcome.about_description', 'PPAIP connects learning with real industry experience.');

        Program::query()->create([
            'name' => 'KUB Talk',
            'image' => 'programs/kub-talk.jpg',
            'link' => '/kub-talk',
            'sort_order' => 2,
        ]);
        Program::query()->create([
            'name' => 'Internship Program',
            'image' => '/assets/internship-program.png',
            'link' => '/internship-program',
            'sort_order' => 1,
        ]);

        Faq::query()->create([
            'question' => 'Apa itu Experience The Real Thing?',
            'answer' => 'Belajar lewat program yang dekat dengan industri.',
            'sort_order' => 1,
        ]);

        $this->get('/')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Welcome')
                ->where('aboutDescription', 'PPAIP connects learning with real industry experience.')
                ->has('programs', 2)
                ->where('programs.0.name', 'Internship Program')
                ->where('programs.0.image', '/assets/internship-program.png')
                ->where('programs.1.name', 'KUB Talk')
                ->where('programs.1.image', $this->publicAsset('programs/kub-talk.jpg'))
                ->has('faqItems', 1)
                ->where('faqItems.0.question', 'Apa itu Experience The Real Thing?')
            );
    }

    public function test_internship_program_exposes_year_summary_bumn_and_banner_content(): void
    {
        PageContent::put('internship_program.banner_image', 'banners/internship.jpg');

        $year = InternshipYear::query()->create([
            'year' => '2025',
            'summary_kub' => 120,
            'summary_non_kub' => 80,
            'summary_bumn' => 35,
            'sort_order' => 1,
        ]);

        $year->prodiStats()->create([
            'name' => 'Informatika',
            'kub' => 10,
            'non_kub' => 6,
            'bumn' => 4,
            'sort_order' => 1,
        ]);

        $this->get('/internship-program')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('InternshipProgram')
                ->where('years.0', '2025')
                ->where('internshipData.2025.summary.kub', 120)
                ->where('internshipData.2025.summary.nonKub', 80)
                ->where('internshipData.2025.summary.bumn', 35)
                ->where('internshipData.2025.prodi.0.name', 'Informatika')
                ->where('internshipData.2025.prodi.0.bumn', 4)
                ->where('bannerImage', $this->publicAsset('banners/internship.jpg'))
            );
    }

    public function test_kub_talk_exposes_gallery_company_metadata_and_stats(): void
    {
        PageContent::put('kub_talk.banner_image', 'banners/kub-talk.jpg');
        PageContent::put('kub_talk.total_students', '750+');

        KubTalk::query()->create([
            'images' => ['kub-talks/event-1.jpg', 'kub-talks/event-2.jpg'],
            'title' => 'KUB Talk with PT Energi Baru',
            'description' => 'Diskusi industri energi dan career readiness.',
            'company_name' => 'PT Energi Baru',
            'company_logo' => 'kub-talks/logos/energi.png',
            'speaker_name' => 'Raka Pratama',
            'speaker_title' => 'Head of Strategy',
            'event_date' => '2026-06-05',
            'sort_order' => 1,
        ]);

        KubTalk::query()->create([
            'title' => 'KUB Talk Follow Up',
            'company_name' => 'PT Energi Baru',
            'sort_order' => 2,
        ]);

        $this->get('/kub-talk')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('KubTalk')
                ->where('bannerImage', $this->publicAsset('banners/kub-talk.jpg'))
                ->has('gallery', 2)
                ->where('gallery.0.images.0', $this->publicAsset('kub-talks/event-1.jpg'))
                ->where('gallery.0.images.1', $this->publicAsset('kub-talks/event-2.jpg'))
                ->where('gallery.0.title', 'KUB Talk with PT Energi Baru')
                ->where('gallery.0.companyLogo', $this->publicAsset('kub-talks/logos/energi.png'))
                ->where('gallery.0.speakerName', 'Raka Pratama')
                ->where('gallery.0.eventDate', '05 Jun 2026')
                ->where('stats.totalSessions', 2)
                ->where('stats.totalCompanies', 1)
                ->where('stats.totalStudents', '750+')
            );
    }

    public function test_certification_page_exposes_prodi_certifications_and_page_content(): void
    {
        PageContent::put('sertifikasi.about_description', 'Sertifikasi membantu mahasiswa membuktikan skill profesional.');
        PageContent::put('sertifikasi.banner_image', 'banners/sertifikasi.jpg');

        $prodi = SertifikasiProdi::query()->create([
            'name' => 'Manajemen',
            'sort_order' => 1,
        ]);

        Certification::query()->create([
            'certification_major_id' => $prodi->id,
            'title' => 'Digital Marketing Certification',
            'issuer' => 'Google',
            'is_available' => true,
            'register_url' => 'https://example.com/register',
            'sort_order' => 1,
        ]);

        $this->get('/student-certification')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('SertifikasiMahasiswa')
                ->where('aboutDescription', 'Sertifikasi membantu mahasiswa membuktikan skill profesional.')
                ->where('bannerImage', $this->publicAsset('banners/sertifikasi.jpg'))
                ->where('prodiCertifications.0.name', 'Manajemen')
                ->where('prodiCertifications.0.certifications.0.title', 'Digital Marketing Certification')
                ->where('prodiCertifications.0.certifications.0.available', true)
                ->where('prodiCertifications.0.certifications.0.registerUrl', 'https://example.com/register')
            );
    }

    public function test_practitioner_teaching_pages_expose_summary_and_detail_stats(): void
    {
        PageContent::put('praktisi_mengajar.about_description', 'Praktisi mengajar membawa kelas lebih dekat ke industri.');
        PageContent::put('praktisi_mengajar.banner_image', 'banners/praktisi.jpg');

        $prodi = PraktisiMengajarProdi::query()->create([
            'name' => 'Ilmu Komunikasi',
            'slug' => 'ilmu-komunikasi',
            'sort_order' => 1,
        ]);

        $semester = PraktisiMengajarSemester::query()->create([
            'practitioner_teaching_major_id' => $prodi->id,
            'title' => 'Semester 5',
            'sort_order' => 1,
        ]);

        PraktisiMengajarCourse::query()->create([
            'practitioner_teaching_semester_id' => $semester->id,
            'name' => 'Strategic Communication',
            'is_practitioner' => true,
            'sort_order' => 1,
        ]);
        PraktisiMengajarCourse::query()->create([
            'practitioner_teaching_semester_id' => $semester->id,
            'name' => 'Media Research',
            'is_practitioner' => false,
            'sort_order' => 2,
        ]);

        $this->get('/practitioner-teaching')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('PraktisiMengajar')
                ->where('aboutDescription', 'Praktisi mengajar membawa kelas lebih dekat ke industri.')
                ->where('bannerImage', $this->publicAsset('banners/praktisi.jpg'))
                ->where('prodiStats.0.name', 'Ilmu Komunikasi')
                ->where('prodiStats.0.slug', 'ilmu-komunikasi')
                ->where('prodiStats.0.count', 1)
            );

        $this->get('/practitioner-teaching/ilmu-komunikasi')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('PraktisiMengajarProdi')
                ->where('slug', 'ilmu-komunikasi')
                ->where('detail.name', 'Ilmu Komunikasi')
                ->where('detail.stats.mataKuliah', 2)
                ->where('detail.stats.praktisi', 1)
                ->where('detail.stats.praktisiPct', 50)
                ->where('detail.semesters.0.title', 'Semester 5')
                ->where('detail.semesters.0.courses.0.praktisi', true)
            );
    }

    private function publicAsset(string $path): string
    {
        return asset("storage/$path");
    }
}
