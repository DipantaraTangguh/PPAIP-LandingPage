<?php

namespace App\Filament\Support;

use Filament\Forms\Components\FileUpload;

class ImageUpload
{
    /**
     * The shared configuration for every image upload in the admin panel:
     * public disk, editor enabled, contained downscaling and an explicit mime
     * allowlist. Callers chain their own label, helper text and layout on top.
     *
     * Keeping this in app/Filament matters: FilamentUploadValidationTest scans
     * that directory for FileUpload::make() and asserts the mime restrictions,
     * so the guarantee still has something to check.
     */
    public static function make(
        string $name,
        string $directory,
        int $width = 1000,
        int $height = 1000,
        int $maxSize = 4096,
    ): FileUpload {
        return FileUpload::make($name)
            ->image()
            ->disk('public')
            ->directory($directory)
            ->imageEditor()
            ->automaticallyResizeImagesMode('contain')
            ->automaticallyResizeImagesToWidth((string) $width)
            ->automaticallyResizeImagesToHeight((string) $height)
            ->automaticallyUpscaleImagesWhenResizing(false)
            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'])
            ->maxSize($maxSize);
    }
}
