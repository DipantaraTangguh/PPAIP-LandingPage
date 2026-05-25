<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('practitioner_teaching_majors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('practitioner_teaching_semesters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('practitioner_teaching_major_id')
                ->constrained(table: 'practitioner_teaching_majors', indexName: 'pt_semesters_major_id_fk')
                ->cascadeOnDelete();
            $table->string('title');
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('practitioner_teaching_courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('practitioner_teaching_semester_id')
                ->constrained(table: 'practitioner_teaching_semesters', indexName: 'pt_courses_semester_id_fk')
                ->cascadeOnDelete();
            $table->string('name');
            $table->boolean('is_practitioner')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('practitioner_teaching_courses');
        Schema::dropIfExists('practitioner_teaching_semesters');
        Schema::dropIfExists('practitioner_teaching_majors');
    }
};
