<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('industry_challenge_classes', function (Blueprint $table) {
            $table->id();
            $table->string('image')->nullable();
            $table->json('images')->nullable();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('company_name')->nullable();
            $table->string('company_logo')->nullable();
            $table->string('speaker_name')->nullable();
            $table->string('speaker_title')->nullable();
            $table->date('event_date')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        $now = now();

        // Pakai konten KUB Talk sebagai starter, nanti bisa diedit bebas dari Filament.
        DB::table('kub_talks')
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get()
            ->each(function (object $talk) use ($now): void {
                DB::table('industry_challenge_classes')->insert([
                    'image' => $talk->image,
                    'images' => $talk->images,
                    'title' => $talk->title,
                    'description' => $talk->description,
                    'company_name' => $talk->company_name,
                    'company_logo' => $talk->company_logo,
                    'speaker_name' => $talk->speaker_name,
                    'speaker_title' => $talk->speaker_title,
                    'event_date' => $talk->event_date,
                    'sort_order' => $talk->sort_order,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            });

        $bannerImage = DB::table('page_contents')
            ->where('key', 'kub_talk.banner_image')
            ->value('value');
        $totalStudents = DB::table('page_contents')
            ->where('key', 'kub_talk.total_students')
            ->value('value');

        DB::table('page_contents')->updateOrInsert(
            ['key' => 'industry_challenge_class.banner_image'],
            ['value' => $bannerImage, 'created_at' => $now, 'updated_at' => $now],
        );
        DB::table('page_contents')->updateOrInsert(
            ['key' => 'industry_challenge_class.total_students'],
            ['value' => $totalStudents ?: '500+', 'created_at' => $now, 'updated_at' => $now],
        );

        $kubTalkProgram = DB::table('programs')->where('link', '/kub-talk')->first();

        if ($kubTalkProgram) {
            $nextSortOrder = ((int) DB::table('programs')->max('sort_order')) + 1;

            DB::table('programs')->updateOrInsert(
                ['link' => '/industry-challenge-class'],
                [
                    'name' => 'Industry Challenge Class',
                    'image' => $kubTalkProgram->image ?: '/assets/kub-talk-3.jpg',
                    'sort_order' => $nextSortOrder,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
            );
        }
    }

    public function down(): void
    {
        DB::table('programs')->where('link', '/industry-challenge-class')->delete();
        DB::table('page_contents')
            ->whereIn('key', [
                'industry_challenge_class.banner_image',
                'industry_challenge_class.total_students',
            ])
            ->delete();

        Schema::dropIfExists('industry_challenge_classes');
    }
};
