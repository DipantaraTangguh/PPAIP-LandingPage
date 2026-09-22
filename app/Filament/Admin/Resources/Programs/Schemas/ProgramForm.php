<?php

namespace App\Filament\Admin\Resources\Programs\Schemas;

use App\Filament\Support\ImageUpload;
use App\Rules\SafeLink;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ProgramForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')->required()->maxLength(150),
                ImageUpload::make('image', 'programs', 1200, 800, 4096),
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
