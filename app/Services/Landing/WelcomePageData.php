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
                'image' => $this->asset->resolve($program->image),
                'link' => $program->link,
            ])->all(),
            'faqItems' => Faq::ordered()->get()->map(fn (Faq $faq) => [
                'question' => $faq->question,
                'answer' => $faq->answer,
            ])->all(),
            'aboutDescription' => PageContent::get('welcome.about_description'),
        ];
    }
}
