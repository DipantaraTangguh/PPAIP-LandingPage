<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('internship_years', function (Blueprint $table) {
            $table->id();
            $table->string('year', 8)->unique();
            $table->unsignedInteger('summary_kub')->default(0);
            $table->unsignedInteger('summary_non_kub')->default(0);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('internship_major_stats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('internship_year_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->unsignedInteger('kub')->default(0);
            $table->unsignedInteger('non_kub')->default(0);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('internship_major_stats');
        Schema::dropIfExists('internship_years');
    }
};
