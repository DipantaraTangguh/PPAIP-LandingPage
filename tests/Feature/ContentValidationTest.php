<?php

namespace Tests\Feature;

use App\Models\Certification;
use App\Models\InternshipYear;
use App\Models\SertifikasiProdi;
use App\Rules\SafeLink;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class ContentValidationTest extends TestCase
{
    use RefreshDatabase;

    public function test_safe_link_accepts_supported_links(): void
    {
        foreach ([
            '/internship-program',
            '#faq',
            'https://example.com/register',
            'mailto:ppaip@example.com',
            'tel:+62 812-3456-7890',
        ] as $link) {
            $validator = Validator::make(['link' => $link], [
                'link' => [new SafeLink],
            ]);

            $this->assertFalse($validator->fails(), "Expected [$link] to be accepted.");
        }
    }

    public function test_safe_link_rejects_unsafe_or_malformed_links(): void
    {
        foreach ([
            'javascript:alert(1)',
            'data:text/html,<script>alert(1)</script>',
            '//evil.example.com',
            'not a valid link',
        ] as $link) {
            $validator = Validator::make(['link' => $link], [
                'link' => [new SafeLink],
            ]);

            $this->assertTrue($validator->fails(), "Expected [$link] to be rejected.");
        }
    }

    public function test_internship_major_name_must_be_unique_within_a_year(): void
    {
        $year = InternshipYear::query()->create([
            'year' => '2026',
        ]);

        $year->prodiStats()->create([
            'name' => 'Informatika',
        ]);

        $this->expectException(QueryException::class);

        $year->prodiStats()->create([
            'name' => 'Informatika',
        ]);
    }

    public function test_certification_title_must_be_unique_within_a_major(): void
    {
        $major = SertifikasiProdi::query()->create([
            'name' => 'Manajemen',
        ]);

        Certification::query()->create([
            'certification_major_id' => $major->id,
            'title' => 'Digital Marketing',
        ]);

        $this->expectException(QueryException::class);

        Certification::query()->create([
            'certification_major_id' => $major->id,
            'title' => 'Digital Marketing',
        ]);
    }
}
