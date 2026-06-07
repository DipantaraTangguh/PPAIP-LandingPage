<?php

namespace App\Filament\Admin\Resources\Programs\Schemas;

use App\Rules\SafeLink;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ProgramForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')->required()->maxLength(150),
                FileUpload::make('image')
                    ->image()
                    ->disk('public')
                    ->directory('programs')
                    ->imageEditor()
                    ->automaticallyResizeImagesMode('contain')
                    ->automaticallyResizeImagesToWidth('1200')
                    ->automaticallyResizeImagesToHeight('800')
                    ->automaticallyUpscaleImagesWhenResizing(false)
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                    ->maxSize(4096),
                TextInput::make('link')
                    ->placeholder('/internship-program')
                    ->helperText('Internal path (e.g. /kub-talk) or full URL.')
                    ->rules([new SafeLink])
                    ->maxLength(255),
                TextInput::make('sort_order')
                    ->integer()
                    ->minValue(0)
                    ->default(0)
                    ->required(),
            ]);
    }
}
