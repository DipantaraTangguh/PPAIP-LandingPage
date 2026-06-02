<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use App\Models\Faq;
use App\Models\InternshipYear;
use App\Models\KubTalk;
use App\Models\Mission;
use App\Models\PageContent;
use App\Models\PraktisiMengajarProdi;
use App\Models\Program;
use App\Models\ProgramKerja;
use App\Models\SertifikasiProdi;
use App\Models\TeamMember;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    public function welcome(): Response
    {
        return Inertia::render('Welcome', [
            'programs' => Program::ordered()->get()->map(fn (Program $p) => [
                'name' => $p->name,
                'image' => $this->asset($p->image),
                'link' => $p->link,
            ])->all(),
            'faqItems' => Faq::ordered()->get()->map(fn (Faq $f) => [
                'question' => $f->question,
                'answer' => $f->answer,
            ])->all(),
            'aboutDescription' => PageContent::get('welcome.about_description'),
        ]);
    }

    public function internshipProgram(): Response
    {
        $years = InternshipYear::with('prodiStats')
            ->ordered()
            ->get();

        $internshipData = [];
        foreach ($years as $year) {
            $internshipData[$year->year] = [
                'summary' => [
                    'kub' => (int) $year->summary_kub,
                    'nonKub' => (int) $year->summary_non_kub,
                    'bumn' => (int) $year->summary_bumn,
                ],
                'prodi' => $year->prodiStats->map(fn ($p) => [
                    'name' => $p->name,
                    'kub' => (int) $p->kub,
                    'nonKub' => (int) $p->non_kub,
                    'bumn' => (int) $p->bumn,
                ])->all(),
            ];
        }

        return Inertia::render('InternshipProgram', [
            'years' => $years->pluck('year')->all(),
            'internshipData' => $internshipData,
            'bannerImage' => $this->asset(PageContent::get('internship_program.banner_image', '/assets/internship-program.png')),
        ]);
    }

    public function praktisiMengajar(): Response
    {
        $prodis = PraktisiMengajarProdi::with('semesters.courses')->ordered()->get();

        return Inertia::render('PraktisiMengajar', [
            'prodiStats' => $prodis->map(fn (PraktisiMengajarProdi $prodi) => [
                'name' => $prodi->name,
                'slug' => $prodi->slug,
                'count' => $prodi->semesters->flatMap->courses->where('is_practitioner', true)->count(),
            ])->all(),
            'aboutDescription' => PageContent::get('praktisi_mengajar.about_description'),
            'bannerImage' => $this->asset(PageContent::get('praktisi_mengajar.banner_image', '/assets/praktisi-mengajar.png')),
        ]);
    }

    public function praktisiMengajarProdi(string $slug): Response
    {
        $prodi = PraktisiMengajarProdi::with('semesters.courses')
            ->where('slug', $slug)
            ->first();

        $detail = null;
        if ($prodi) {
            $semesters = $prodi->semesters->map(function ($sem) {
                $courses = $sem->courses->map(fn ($c) => [
                    'name' => $c->name,
                    'praktisi' => (bool) $c->is_practitioner,
                ])->values()->all();

                return [
                    'title' => $sem->title,
                    'praktisiCount' => collect($courses)->where('praktisi', true)->count(),
                    'courses' => $courses,
                ];
            })->values()->all();

            $totalCourses = collect($semesters)->sum(fn ($s) => count($s['courses']));
            $praktisiTotal = collect($semesters)->sum(fn ($s) => $s['praktisiCount']);

            $detail = [
                'name' => $prodi->name,
                'stats' => [
                    'mataKuliah' => $totalCourses,
                    'praktisi' => $praktisiTotal,
                    'praktisiPct' => $totalCourses > 0 ? (int) round(($praktisiTotal / $totalCourses) * 100) : 0,
                ],
                'semesters' => $semesters,
            ];
        }

        return Inertia::render('PraktisiMengajarProdi', [
            'slug' => $slug,
            'detail' => $detail,
            'aboutDescription' => PageContent::get('praktisi_mengajar.about_description'),
            'bannerImage' => $this->asset(PageContent::get('praktisi_mengajar.banner_image', '/assets/praktisi-mengajar.png')),
        ]);
    }

    public function kubTalk(): Response
    {
        return Inertia::render('KubTalk', [
            'bannerImage' => $this->asset(PageContent::get('kub_talk.banner_image', '/assets/kub-talk-1.jpg')),
            'gallery' => KubTalk::ordered()->get()->map(fn (KubTalk $k) => [
                'image' => $this->asset($k->image),
                'title' => $k->title,
                'desc' => $k->description,
            ])->all(),
        ]);
    }

    public function sertifikasi(): Response
    {
        $prodis = SertifikasiProdi::with('certifications')->ordered()->get();

        return Inertia::render('SertifikasiMahasiswa', [
            'prodiCertifications' => $prodis->map(fn (SertifikasiProdi $prodi) => [
                'name' => $prodi->name,
                'certifications' => $prodi->certifications->map(fn (Certification $c) => [
                    'title' => $c->title,
                    'issuer' => $c->issuer,
                    'available' => (bool) $c->is_available,
                    'registerUrl' => $c->register_url,
                ])->all(),
            ])->all(),
            'aboutDescription' => PageContent::get('sertifikasi.about_description'),
            'bannerImage' => $this->asset(PageContent::get('sertifikasi.banner_image', '/assets/internship-mandiri.png')),
        ]);
    }

    public function tentangKami(): Response
    {
        $team = TeamMember::ordered()->get();
        $ketua = $team->firstWhere('type', 'ketua');
        $staff = $team->where('type', 'staff')->values();

        return Inertia::render('TentangKami', [
            'aboutIntro' => PageContent::get('tentang_kami.about_intro'),
            'vision' => PageContent::get('tentang_kami.vision'),
            'mission' => Mission::ordered()->pluck('statement')->all(),
            'programKerja' => ProgramKerja::ordered()->get()->map(fn (ProgramKerja $p) => [
                'icon' => $p->icon,
                'title' => $p->title,
                'description' => $p->description,
            ])->all(),
            'teamMembers' => [
                'ketua' => $ketua ? [
                    'name' => $ketua->name,
                    'role' => $ketua->role,
                    'photo' => $this->asset($ketua->photo),
                    'bio' => $ketua->bio,
                ] : null,
                'staff' => $staff->map(fn (TeamMember $m) => [
                    'name' => $m->name,
                    'role' => $m->role,
                    'photo' => $this->asset($m->photo),
                    'bio' => $m->bio,
                ])->all(),
            ],
            'groupPhoto' => [
                'src' => $this->asset(PageContent::get('tentang_kami.group_photo_src')),
                'fallback' => $this->asset(PageContent::get('tentang_kami.group_photo_fallback')),
                'caption' => PageContent::get('tentang_kami.group_photo_caption'),
            ],
        ]);
    }

    private function asset(?string $path): ?string
    {
        if (! $path) {
            return null;
        }
        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://') || str_starts_with($path, '/')) {
            return $path;
        }

        return Storage::disk('public')->url($path);
    }
}
