<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('internship_years', 'summary_bumn')) {
            Schema::table('internship_years', function (Blueprint $table) {
                $table->unsignedInteger('summary_bumn')->default(0)->after('summary_non_kub');
            });
        }

        if (! Schema::hasColumn('internship_major_stats', 'bumn')) {
            Schema::table('internship_major_stats', function (Blueprint $table) {
                $table->unsignedInteger('bumn')->default(0)->after('non_kub');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('internship_major_stats', 'bumn')) {
            Schema::table('internship_major_stats', function (Blueprint $table) {
                $table->dropColumn('bumn');
            });
        }

        if (Schema::hasColumn('internship_years', 'summary_bumn')) {
            Schema::table('internship_years', function (Blueprint $table) {
                $table->dropColumn('summary_bumn');
            });
        }
    }
};
