<?php

namespace Tests\Feature;

use Tests\TestCase;

class ErrorPagesTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    public function test_not_found_page_uses_custom_error_view(): void
    {
        $this->get('/halaman-yang-tidak-ada')
            ->assertNotFound()
            ->assertSee('Halaman yang dicari tidak ada')
            ->assertSee('Kembali ke Beranda');
    }

    public function test_forbidden_page_uses_custom_error_view(): void
    {
        $this->get('/__test/forbidden')
            ->assertForbidden()
            ->assertSee('Anda tidak punya akses ke halaman ini')
            ->assertSee('Kembali ke Beranda');
    }

    public function test_server_error_page_uses_custom_error_view(): void
    {
        $this->get('/__test/server-error')
            ->assertInternalServerError()
            ->assertSee('Ada kendala di sisi sistem')
            ->assertSee('Kembali ke Beranda');
    }
}
