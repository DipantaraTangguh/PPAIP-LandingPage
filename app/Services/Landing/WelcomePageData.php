<?php

namespace App\Services\Landing;

use App\Models\Faq;
use App\Models\PageContent;
use App\Models\Program;
use App\Support\PublicAssetUrl;

class WelcomePageData
{
    public function __construct(private readonly PublicAssetUrl $asset) {}

    public function payload(): array
    {
        return [
            'programs' => Program::ordered()->get()->map(fn (Program $program) => [
                'name' => $program->name,
                'image' => $this->programImage($program),
                'link' => $program->link,
            ])->all(),
            'faqItems' => Faq::ordered()->get()->map(fn (Faq $faq) => [
                'question' => $faq->question,
                'answer' => $faq->answer,
            ])->all(),
            'aboutDescription' => PageContent::get('welcome.about_description'),
        ];
    }

    private function programImage(Program $program): string
    {
        $bannerKey = match ($program->link) {
            '/internship-program' => 'internship_program.banner_image',
            '/practitioner-teaching' => 'praktisi_mengajar.banner_image',
            '/student-certification' => 'sertifikasi.banner_image',
            '/kub-talk' => 'kub_talk.banner_image',
            '/industry-challenge-class' => 'industry_challenge_class.banner_image',
            default => null,
        };

        $image = $bannerKey
            ? PageContent::get($bannerKey, $program->image)
            : $program->image;

        return $this->asset->resolve($image);
    }
}
