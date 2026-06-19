<?php

namespace App\Services\Landing;

use App\Models\InternshipYear;
use App\Models\PageContent;
use App\Support\PublicAssetUrl;

class InternshipPageData
{
    private const CATALOG_START_PAGES = [
        'Ilmu & Teknologi Pangan' => 2,
        'Manajemen' => 13,
        'Teknik Sipil' => 113,
        'Akuntansi' => 127,
        'Ilmu Komunikasi' => 174,
    ];

    public function __construct(private readonly PublicAssetUrl $asset) {}

    public function payload(): array
    {
        $years = InternshipYear::with('majorStats')
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
                'prodi' => $year->majorStats->map(fn ($prodi) => [
                    'name' => $prodi->name,
                    'kub' => (int) $prodi->kub,
                    'nonKub' => (int) $prodi->non_kub,
                    'bumn' => (int) $prodi->bumn,
                    'catalogStartPage' => self::CATALOG_START_PAGES[$prodi->name] ?? null,
                ])->all(),
            ];
        }

        return [
            'years' => $years->pluck('year')->all(),
            'internshipData' => $internshipData,
            'bannerImage' => $this->asset->resolve(
                PageContent::get('internship_program.banner_image', '/assets/internship-program.png'),
            ),
            'catalogUrl' => '/storage/student-catalog/Repository Magang 2025 UBakrie.pdf',
        ];
    }
}
