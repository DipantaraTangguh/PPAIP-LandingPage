<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('practitioner_teaching_pbls', function (Blueprint $table) {
            $table->id();
            $table->foreignId('practitioner_teaching_course_id');
            $table->string('photo')->nullable();
            $table->string('title')->nullable();
            $table->string('partner')->nullable();
            $table->string('focus')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();

            $table->unique('practitioner_teaching_course_id', 'pt_pbls_course_unique');
            $table->foreign('practitioner_teaching_course_id', 'pt_pbls_course_id_fk')
                ->references('id')
                ->on('practitioner_teaching_courses')
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('practitioner_teaching_pbls');
    }
};
