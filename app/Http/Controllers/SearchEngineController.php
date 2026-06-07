<?php

namespace App\Http\Controllers;

use App\Models\PraktisiMengajarProdi;
use Illuminate\Http\Response;

class SearchEngineController extends Controller
{
    public function sitemap(): Response
    {
        $urls = collect([
            $this->entry(route('home'), '1.0', 'weekly'),
            $this->entry(route('internship-program'), '0.9', 'monthly'),
            $this->entry(route('practitioner-teaching'), '0.9', 'monthly'),
            $this->entry(route('student-certification'), '0.9', 'monthly'),
            $this->entry(route('kub-talk'), '0.9', 'weekly'),
            $this->entry(route('about'), '0.7', 'monthly'),
        ])->merge(
            PraktisiMengajarProdi::query()
                ->ordered()
                ->get(['slug', 'updated_at'])
                ->map(fn (PraktisiMengajarProdi $prodi) => $this->entry(
                    route('practitioner-teaching.detail', $prodi->slug),
                    '0.8',
                    'monthly',
                    $prodi->updated_at?->toDateString(),
                )),
        );

        $xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n"
            .view('sitemap', ['urls' => $urls])->render();

        return response($xml)
            ->header('Content-Type', 'application/xml; charset=UTF-8');
    }

    public function robots(): Response
    {
        $content = implode("\n", [
            'User-agent: *',
            'Allow: /',
            'Disallow: /admin',
            'Disallow: /dashboard',
            'Disallow: /profile',
            '',
            'Sitemap: '.route('sitemap'),
            '',
        ]);

        return response($content, 200)
            ->header('Content-Type', 'text/plain; charset=UTF-8');
    }

    private function entry(
        string $location,
        string $priority,
        string $changeFrequency,
        ?string $lastModified = null,
    ): array {
        return [
            'location' => $location,
            'priority' => $priority,
            'changeFrequency' => $changeFrequency,
            'lastModified' => $lastModified,
        ];
    }
}
