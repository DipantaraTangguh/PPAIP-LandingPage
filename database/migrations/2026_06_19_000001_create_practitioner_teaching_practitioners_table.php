<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('practitioner_teaching_practitioners', function (Blueprint $table) {
            $table->id();
            $table->foreignId('practitioner_teaching_course_id');
            $table->string('photo')->nullable();
            $table->string('name')->nullable();
            $table->string('field')->nullable();
            $table->string('experience')->nullable();
            $table->text('bio')->nullable();
            $table->timestamps();

            $table->unique('practitioner_teaching_course_id', 'pt_practitioners_course_unique');
            $table->foreign('practitioner_teaching_course_id', 'pt_practitioners_course_id_fk')
                ->references('id')
                ->on('practitioner_teaching_courses')
                ->cascadeOnDelete();
        });

        $this->seedExistingPractitionerCourses();
    }

    public function down(): void
    {
        Schema::dropIfExists('practitioner_teaching_practitioners');
    }

    private function seedExistingPractitionerCourses(): void
    {
        $dummyPractitioners = [
            [
                'name' => 'Dr. Andi Pratama',
                'field' => 'Strategi Bisnis dan Transformasi Digital',
                'experience' => '15 tahun memimpin proyek transformasi di sektor teknologi dan jasa.',
            ],
            [
                'name' => 'Rina Permatasari, M.M.',
                'field' => 'Brand Management dan Komunikasi Korporat',
                'experience' => '12 tahun menangani strategi merek, kampanye publik, dan relasi industri.',
            ],
            [
                'name' => 'Budi Santoso, S.T.',
                'field' => 'Operasional, Manufaktur, dan Manajemen Mutu',
                'experience' => 'Lebih dari 14 tahun mengelola proses operasional dan peningkatan kualitas.',
            ],
            [
                'name' => 'Maya Lestari, M.Ak.',
                'field' => 'Keuangan Korporat dan Audit',
                'experience' => '10 tahun berpengalaman dalam audit, pelaporan keuangan, dan tata kelola.',
            ],
            [
                'name' => 'Fajar Nugroho, M.T.',
                'field' => 'Data, Teknologi, dan Inovasi Produk',
                'experience' => '13 tahun membangun solusi berbasis data untuk produk dan layanan digital.',
            ],
        ];

        DB::table('practitioner_teaching_courses')
            ->where('is_practitioner', true)
            ->orderBy('id')
            ->get(['id', 'name'])
            ->values()
            ->map(function ($course, int $index) use ($dummyPractitioners): array {
                $profile = $dummyPractitioners[$index % count($dummyPractitioners)];

                return [
                    'practitioner_teaching_course_id' => $course->id,
                    'photo' => '/assets/praktisi-mengajar.png',
                    'name' => $profile['name'],
                    'field' => $profile['field'],
                    'experience' => $profile['experience'],
                    'bio' => "{$profile['name']} adalah praktisi industri yang berbagi pengalaman profesional pada mata kuliah {$course->name}. Materi yang dibawakan berfokus pada studi kasus, praktik kerja, dan keterampilan yang relevan dengan kebutuhan industri.",
                    'created_at' => '2026-06-19 15:30:00',
                    'updated_at' => '2026-06-19 15:30:00',
                ];
            })
            ->chunk(100)
            ->each(fn ($chunk) => DB::table('practitioner_teaching_practitioners')->insert($chunk->all()));
    }
};
