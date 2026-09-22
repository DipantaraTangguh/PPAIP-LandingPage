<?php

namespace Tests\Feature;

use App\Models\PractitionerTeachingMajor;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SearchEngineTest extends TestCase
{
    use RefreshDatabase;

    public function test_favicon_is_available_from_the_public_root(): void
    {
        $this->assertFileExists(public_path('favicon.ico'));
        $this->assertGreaterThan(0, filesize(public_path('favicon.ico')));
    }

    public function test_sitemap_contains_public_pages_and_practitioner_details(): void
    {
        PractitionerTeachingMajor::query()->create([
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
            ->assertSee('<loc>'.route('industry-challenge-class').'</loc>', false)
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

    public function test_unknown_practitioner_detail_returns_not_found(): void
    {
        $this->get('/practitioner-teaching/not-registered')
            ->assertNotFound();
    }

    public function test_each_route_renders_its_own_seo_entry_not_the_default(): void
    {
        $default = config('seo.default');

        foreach (['home', 'internship-program', 'student-certification', 'about'] as $route) {
            $seo = config("seo.pages.{$route}");

            $this->get(route($route))
                ->assertOk()
                ->assertSee($seo['title'], false)
                ->assertSee($seo['description'], false)
                ->assertDontSee($default['description'], false);
        }
    }
}
