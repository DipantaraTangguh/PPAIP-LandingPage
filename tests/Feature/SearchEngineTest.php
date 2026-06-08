<?php

namespace Tests\Feature;

use App\Models\PraktisiMengajarProdi;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SearchEngineTest extends TestCase
{
    use RefreshDatabase;

    public function test_favicon_is_available_from_the_public_root(): void
    {
        $this->assertFileExists(public_path('favicon.ico'));
        $this->assertGreaterThan(0, filesize(public_path('favicon.ico')));

        $this->get('/favicon.ico')
            ->assertOk()
            ->assertHeader('Content-Type', 'image/x-icon');
    }

    public function test_sitemap_contains_public_pages_and_practitioner_details(): void
    {
        PraktisiMengajarProdi::query()->create([
            'name' => 'Informatika',
            'slug' => 'informatika',
            'sort_order' => 1,
        ]);

        $this->get('/sitemap.xml')
            ->assertOk()
            ->assertHeader('Content-Type', 'application/xml; charset=UTF-8')
            ->assertSee('<?xml version="1.0" encoding="UTF-8"?>', false)
            ->assertSee('<loc>'.route('home').'</loc>', false)
            ->assertSee('<loc>'.route('internship-program').'</loc>', false)
            ->assertSee('<loc>'.route('practitioner-teaching.detail', 'informatika').'</loc>', false)
            ->assertDontSee('/admin', false)
            ->assertDontSee('/dashboard', false);
    }

    public function test_robots_allows_public_pages_and_points_to_sitemap(): void
    {
        $this->get('/robots.txt')
            ->assertOk()
            ->assertHeader('Content-Type', 'text/plain; charset=UTF-8')
            ->assertSee("Allow: /\n", false)
            ->assertSee("Disallow: /admin\n", false)
            ->assertSee('Sitemap: '.route('sitemap'), false);
    }

    public function test_private_pages_are_not_indexable(): void
    {
        $this->get('/login')
            ->assertOk()
            ->assertSee('name="robots" content="noindex, nofollow"', false);
    }

    public function test_unknown_practitioner_detail_returns_not_found(): void
    {
        $this->get('/practitioner-teaching/not-registered')
            ->assertNotFound();
    }
}
