<?php

namespace Tests\Feature;

use Tests\TestCase;

class FilamentUploadValidationTest extends TestCase
{
    public function test_filament_image_uploads_have_explicit_mime_restrictions(): void
    {
        $files = $this->filamentFormFiles();

        $this->assertNotEmpty($files, 'No Filament upload files were found to validate.');

        foreach ($files as $file) {
            $contents = file_get_contents($file);
            preg_match_all('/FileUpload::make\(.*?(?=FileUpload::make\(|;\n|\z)/s', $contents, $uploads);

            foreach ($uploads[0] as $upload) {
                if (! str_contains($upload, '->image()')) {
                    continue;
                }

                $this->assertStringContainsString('->acceptedFileTypes(', $upload, "{$file} has an image upload without acceptedFileTypes().");

                foreach (['image/jpeg', 'image/png', 'image/jpg', 'image/webp'] as $mime) {
                    $this->assertStringContainsString($mime, $upload, "{$file} image upload is missing {$mime}.");
                }
            }
        }
    }

    private function filamentFormFiles(): array
    {
        $files = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator(app_path('Filament')),
        );

        return collect(iterator_to_array($files))
            ->filter(fn (\SplFileInfo $file) => $file->isFile() && $file->getExtension() === 'php')
            ->map(fn (\SplFileInfo $file) => $file->getPathname())
            ->filter(fn (string $file) => str_contains(file_get_contents($file), 'FileUpload::make('))
            ->values()
            ->all();
    }
}
