<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class SeedAssetsSeeder extends Seeder
{
    /**
     * Copies the asset files committed under database/seed-assets into the
     * public storage disk. Uploaded files live outside git, so a fresh
     * environment (Railway, a teammate's clone) would otherwise have CMS rows
     * pointing at images that do not exist on disk.
     */
    public function run(): void
    {
        $source = database_path('seed-assets');

        if (! File::isDirectory($source)) {
            $this->command?->warn("Seed assets directory is missing: {$source}");

            return;
        }

        $target = storage_path('app/public');
        $copied = 0;

        foreach (File::allFiles($source) as $file) {
            $destination = $target.DIRECTORY_SEPARATOR.$file->getRelativePathname();

            File::ensureDirectoryExists(dirname($destination));
            File::copy($file->getPathname(), $destination);

            $copied++;
        }

        $this->command?->info("Restored {$copied} seed assets into storage/app/public.");
    }
}
