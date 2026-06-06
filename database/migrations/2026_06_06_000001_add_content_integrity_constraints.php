<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('internship_major_stats', function (Blueprint $table) {
            $table->unique(['internship_year_id', 'name'], 'internship_year_major_unique');
        });

        Schema::table('practitioner_teaching_semesters', function (Blueprint $table) {
            $table->unique(
                ['practitioner_teaching_major_id', 'title'],
                'practitioner_major_semester_unique',
            );
        });

        Schema::table('practitioner_teaching_courses', function (Blueprint $table) {
            $table->unique(
                ['practitioner_teaching_semester_id', 'name'],
                'practitioner_semester_course_unique',
            );
        });

        Schema::table('certification_majors', function (Blueprint $table) {
            $table->unique('name', 'certification_major_name_unique');
        });

        Schema::table('certifications', function (Blueprint $table) {
            $table->unique(
                ['certification_major_id', 'title'],
                'certification_major_title_unique',
            );
        });
    }

    public function down(): void
    {
        Schema::table('certifications', function (Blueprint $table) {
            $table->dropUnique('certification_major_title_unique');
        });

        Schema::table('certification_majors', function (Blueprint $table) {
            $table->dropUnique('certification_major_name_unique');
        });

        Schema::table('practitioner_teaching_courses', function (Blueprint $table) {
            $table->dropUnique('practitioner_semester_course_unique');
        });

        Schema::table('practitioner_teaching_semesters', function (Blueprint $table) {
            $table->dropUnique('practitioner_major_semester_unique');
        });

        Schema::table('internship_major_stats', function (Blueprint $table) {
            $table->dropUnique('internship_year_major_unique');
        });
    }
};
