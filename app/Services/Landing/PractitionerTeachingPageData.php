<?php

namespace App\Services\Landing;

use App\Models\PageContent;
use App\Models\PractitionerTeachingMajor;
use App\Support\PublicAssetUrl;

class PractitionerTeachingPageData
{
    public function __construct(private readonly PublicAssetUrl $asset) {}

    public function summary(): array
    {
        $prodis = PractitionerTeachingMajor::with('semesters.courses')->ordered()->get();

        return [
            'majorStats' => $prodis->map(fn (PractitionerTeachingMajor $prodi) => [
                'name' => $prodi->name,
                'slug' => $prodi->slug,
                'count' => $prodi->semesters->flatMap->courses->where('is_practitioner', true)->count(),
            ])->all(),
            ...$this->sharedContent(),
        ];
    }

    public function detail(string $slug): array
    {
        $prodi = PractitionerTeachingMajor::with('semesters.courses')
            ->where('slug', $slug)
            ->first();

        return [
            'slug' => $slug,
            'detail' => $prodi ? $this->mapDetail($prodi) : null,
            ...$this->sharedContent(),
        ];
    }

    private function mapDetail(PractitionerTeachingMajor $prodi): array
    {
        $semesters = $prodi->semesters->map(function ($semester) {
            $courses = $semester->courses->map(fn ($course) => [
                'name' => $course->name,
                'praktisi' => (bool) $course->is_practitioner,
            ])->values()->all();

            return [
                'title' => $semester->title,
                'praktisiCount' => collect($courses)->where('praktisi', true)->count(),
                'courses' => $courses,
            ];
        })->values()->all();

        $totalCourses = collect($semesters)->sum(fn ($semester) => count($semester['courses']));
        $practitionerTotal = collect($semesters)->sum(fn ($semester) => $semester['praktisiCount']);

        return [
            'name' => $prodi->name,
            'stats' => [
                'mataKuliah' => $totalCourses,
                'praktisi' => $practitionerTotal,
                'praktisiPct' => $totalCourses > 0
                    ? (int) round(($practitionerTotal / $totalCourses) * 100)
                    : 0,
            ],
            'semesters' => $semesters,
        ];
    }

    private function sharedContent(): array
    {
        return [
            'aboutDescription' => PageContent::get('praktisi_mengajar.about_description'),
            'bannerImage' => $this->asset->resolve(
                PageContent::get('praktisi_mengajar.banner_image', '/assets/praktisi-mengajar.png'),
            ),
        ];
    }
}
