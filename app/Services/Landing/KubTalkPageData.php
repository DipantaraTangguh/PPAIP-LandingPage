<?php

namespace App\Services\Landing;

use App\Models\KubTalk;
use App\Models\PageContent;
use App\Support\PublicAssetUrl;

class KubTalkPageData
{
    public function __construct(private readonly PublicAssetUrl $asset) {}

    public function payload(): array
    {
        $talks = KubTalk::ordered()->get();

        return [
            'bannerImage' => $this->asset->resolve(
                PageContent::get('kub_talk.banner_image', '/assets/kub-talk-3.png'),
            ),
            'gallery' => $talks->map(fn (KubTalk $talk) => [
                'images' => $this->images($talk),
                'title' => $talk->title,
                'desc' => $talk->description,
                'companyName' => $talk->company_name,
                'companyLogo' => $this->asset->resolve($talk->company_logo),
                'speakerName' => $talk->speaker_name,
                'speakerTitle' => $talk->speaker_title,
                'eventDate' => $talk->event_date?->format('d M Y'),
            ])->all(),
            'stats' => [
                'totalSessions' => $talks->count(),
                'totalCompanies' => $talks->pluck('company_name')->filter()->unique()->count(),
                'totalStudents' => PageContent::get('kub_talk.total_students', '500+'),
            ],
        ];
    }

    private function images(KubTalk $talk): array
    {
        if (is_array($talk->images)) {
            return array_map(
                fn (string $image) => $this->asset->resolve($image),
                $talk->images,
            );
        }

        return $talk->image ? [$this->asset->resolve($talk->image)] : [];
    }
}
