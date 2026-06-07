<?php

namespace App\Services\Landing;

use App\Models\Mission;
use App\Models\PageContent;
use App\Models\ProgramKerja;
use App\Models\TeamMember;
use App\Support\PublicAssetUrl;

class AboutPageData
{
    public function __construct(private readonly PublicAssetUrl $asset) {}

    public function payload(): array
    {
        $team = TeamMember::ordered()->get();
        $leader = $team->firstWhere('type', 'ketua');

        return [
            'aboutIntro' => PageContent::get('tentang_kami.about_intro'),
            'vision' => PageContent::get('tentang_kami.vision'),
            'mission' => Mission::ordered()->pluck('statement')->all(),
            'programKerja' => ProgramKerja::ordered()->get()->map(fn (ProgramKerja $program) => [
                'icon' => $program->icon,
                'title' => $program->title,
                'description' => $program->description,
            ])->all(),
            'teamMembers' => [
                'ketua' => $leader ? $this->teamMember($leader) : null,
                'staff' => $team
                    ->where('type', 'staff')
                    ->values()
                    ->map(fn (TeamMember $member) => $this->teamMember($member))
                    ->all(),
            ],
            'groupPhoto' => [
                'src' => $this->asset->resolve(PageContent::get('tentang_kami.group_photo_src')),
                'fallback' => $this->asset->resolve(PageContent::get('tentang_kami.group_photo_fallback')),
                'caption' => PageContent::get('tentang_kami.group_photo_caption'),
            ],
        ];
    }

    private function teamMember(TeamMember $member): array
    {
        return [
            'name' => $member->name,
            'role' => $member->role,
            'photo' => $this->asset->resolve($member->photo),
            'bio' => $member->bio,
        ];
    }
}
