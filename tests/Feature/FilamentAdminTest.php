<?php

namespace Tests\Feature;

use App\Filament\Admin\Resources\Faqs\FaqResource;
use App\Filament\Admin\Resources\IndustryChallengeClasses\IndustryChallengeClassResource;
use App\Filament\Admin\Resources\InternshipYears\InternshipYearResource;
use App\Filament\Admin\Resources\KubTalks\KubTalkResource;
use App\Filament\Admin\Resources\Programs\ProgramResource;
use App\Models\IndustryChallengeClass;
use App\Models\InternshipYear;
use App\Models\KubTalk;
use App\Models\PractitionerTeachingCourse;
use App\Models\PractitionerTeachingMajor;
use App\Models\PractitionerTeachingPractitioner;
use App\Models\PractitionerTeachingSemester;
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
        $this->assertSame(
            ['index', 'create', 'edit'],
            array_keys(IndustryChallengeClassResource::getPages()),
        );
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
        $challengeClass = IndustryChallengeClass::query()->create([
            'title' => 'Industry Challenge Test',
            'company_name' => 'PT Test Industri',
        ]);
        $practitionerMajor = PractitionerTeachingMajor::query()->create([
            'name' => 'Ilmu Komunikasi',
            'slug' => 'ilmu-komunikasi',
            'sort_order' => 1,
        ]);
        $practitionerSemester = PractitionerTeachingSemester::query()->create([
            'practitioner_teaching_major_id' => $practitionerMajor->id,
            'title' => 'Semester 5',
            'sort_order' => 1,
        ]);
        $practitionerCourse = PractitionerTeachingCourse::query()->create([
            'practitioner_teaching_semester_id' => $practitionerSemester->id,
            'name' => 'Strategic Communication',
            'is_practitioner' => true,
            'sort_order' => 1,
        ]);
        PractitionerTeachingPractitioner::query()->create([
            'practitioner_teaching_course_id' => $practitionerCourse->id,
            'name' => 'Dr. Rina Permata',
            'field' => 'Komunikasi Strategis',
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

        $this->actingAs($admin)
            ->get('/admin/industry-challenge-classes')
            ->assertOk();

        $this->actingAs($admin)
            ->get("/admin/industry-challenge-classes/{$challengeClass->id}/edit")
            ->assertOk();

        $this->actingAs($admin)
            ->get('/admin/industry-challenge-class-content')
            ->assertOk();

        foreach ([
            '/admin/practitioner-teaching-content',
            '/admin/practitioner-teaching-majors',
            '/admin/student-certification-content',
            '/admin/certification-majors',
            '/admin/about-us-content',
            '/admin/work-programs',
            '/admin/internship-content',
            '/admin/programs/create',
            '/admin/team-members/create',
        ] as $path) {
            $this->actingAs($admin)
                ->get($path)
                ->assertOk();
        }

        $this->actingAs($admin)
            ->get("/admin/practitioner-teaching-majors/{$practitionerMajor->id}/edit")
            ->assertOk();
    }
}
