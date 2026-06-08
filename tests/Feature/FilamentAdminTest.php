<?php

namespace Tests\Feature;

use App\Filament\Admin\Resources\Faqs\FaqResource;
use App\Filament\Admin\Resources\InternshipYears\InternshipYearResource;
use App\Filament\Admin\Resources\KubTalks\KubTalkResource;
use App\Filament\Admin\Resources\Programs\ProgramResource;
use App\Models\InternshipYear;
use App\Models\KubTalk;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FilamentAdminTest extends TestCase
{
    use RefreshDatabase;

    public function test_core_filament_resources_keep_their_expected_pages(): void
    {
        $this->assertSame(['index', 'create', 'edit'], array_keys(InternshipYearResource::getPages()));
        $this->assertSame(['index', 'create', 'edit'], array_keys(KubTalkResource::getPages()));
        $this->assertSame(['index', 'create', 'edit'], array_keys(ProgramResource::getPages()));
        $this->assertSame(['index', 'create', 'edit'], array_keys(FaqResource::getPages()));
    }

    public function test_admin_can_open_important_content_management_pages(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $year = InternshipYear::query()->create(['year' => '2026']);
        $talk = KubTalk::query()->create([
            'title' => 'KUB Talk Test',
            'company_name' => 'PT Test Industri',
        ]);

        $this->actingAs($admin)
            ->get('/admin/internship-years')
            ->assertOk();

        $this->actingAs($admin)
            ->get("/admin/internship-years/{$year->id}/edit")
            ->assertOk();

        $this->actingAs($admin)
            ->get('/admin/kub-talks')
            ->assertOk();

        $this->actingAs($admin)
            ->get("/admin/kub-talks/{$talk->id}/edit")
            ->assertOk();

        $this->actingAs($admin)
            ->get('/admin/kub-talk-content')
            ->assertOk();

        foreach ([
            '/admin/practitioner-teaching-content',
            '/admin/practitioner-teaching-majors',
            '/admin/student-certification-content',
            '/admin/certification-majors',
            '/admin/about-us-content',
            '/admin/work-programs',
        ] as $path) {
            $this->actingAs($admin)
                ->get($path)
                ->assertOk();
        }
    }
}
