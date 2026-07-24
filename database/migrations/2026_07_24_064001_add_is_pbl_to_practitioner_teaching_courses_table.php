<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('practitioner_teaching_courses', function (Blueprint $table) {
            $table->boolean('is_pbl')->default(false)->after('is_practitioner');
        });
    }

    public function down(): void
    {
        Schema::table('practitioner_teaching_courses', function (Blueprint $table) {
            $table->dropColumn('is_pbl');
        });
    }
};
