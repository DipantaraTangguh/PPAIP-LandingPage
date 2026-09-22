<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * The page each study program starts at in the internship catalog PDF.
     * Until now this lived in InternshipPageData as a constant keyed by study
     * program name, so renaming a program in the admin panel silently dropped
     * its catalog link. Moving it onto the row keeps the two together.
     */
    private const START_PAGES = [
        'Ilmu & Teknologi Pangan' => 2,
        'Manajemen' => 123,
        'Teknik Sipil' => 24,
        'Akuntansi' => 213,
        'Ilmu Komunikasi' => 248,
        'Teknik Lingkungan' => 13,
        'Sistem Informasi' => 65,
    ];

    public function up(): void
    {
        Schema::table('internship_major_stats', function (Blueprint $table) {
            $table->unsignedInteger('catalog_start_page')->nullable()->after('bumn');
        });

        foreach (self::START_PAGES as $name => $page) {
            DB::table('internship_major_stats')
                ->where('name', $name)
                ->update(['catalog_start_page' => $page]);
        }
    }

    public function down(): void
    {
        Schema::table('internship_major_stats', function (Blueprint $table) {
            $table->dropColumn('catalog_start_page');
        });
    }
};
