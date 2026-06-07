<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response
            ->assertStatus(200)
            ->assertSee('<html lang="id">', false)
            ->assertSee('<title inertia>Experience The Real Things - PPAIP Universitas Bakrie</title>', false)
            ->assertSee('Temukan program industri Universitas Bakrie', false)
            ->assertSee('name="description"', false)
            ->assertSee('name="robots" content="index, follow"', false)
            ->assertSee('property="og:image"', false)
            ->assertSee('name="twitter:card" content="summary_large_image"', false)
            ->assertSee('rel="canonical" href="'.url('/').'"', false);
    }
}
