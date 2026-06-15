<?php

namespace App\Services\Landing;

use App\Models\IndustryChallengeClass;
use App\Models\PageContent;
use App\Support\PublicAssetUrl;

class IndustryChallengeClassPageData
{
    public function __construct(private readonly PublicAssetUrl $asset) {}

    public function payload(): array
    {
        $classes = IndustryChallengeClass::ordered()->get();

        return [
            'bannerImage' => $this->asset->resolve(
                PageContent::get(
                    'industry_challenge_class.banner_image',
                    '/assets/kub-talk-3.jpg',
                ),
            ),
            'gallery' => $classes->map(fn (IndustryChallengeClass $class) => [
                'images' => $this->images($class),
                'title' => $class->title,
                'desc' => $class->description,
                'companyName' => $class->company_name,
                'companyLogo' => $this->asset->resolve($class->company_logo),
                'speakerName' => $class->speaker_name,
                'speakerTitle' => $class->speaker_title,
                'eventDate' => $class->event_date?->format('d M Y'),
            ])->all(),
            'stats' => [
                'totalSessions' => $classes->count(),
                'totalCompanies' => $classes->pluck('company_name')->filter()->unique()->count(),
                'totalStudents' => PageContent::get(
                    'industry_challenge_class.total_students',
                    '500+',
                ),
            ],
        ];
    }

    private function images(IndustryChallengeClass $class): array
    {
        if (is_array($class->images)) {
            return array_map(
                fn (string $image) => $this->asset->resolve($image),
                $class->images,
            );
        }

        return $class->image ? [$this->asset->resolve($class->image)] : [];
    }
}
