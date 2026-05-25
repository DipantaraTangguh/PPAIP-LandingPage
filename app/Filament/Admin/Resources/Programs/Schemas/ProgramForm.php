<?php

namespace App\Filament\Admin\Resources\Programs\Schemas;

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
                    ->maxSize(4096),
                TextInput::make('link')
                    ->placeholder('/internship-program')
                    ->helperText('Internal path (e.g. /kub-talk) or full URL.')
                    ->maxLength(255),
                TextInput::make('sort_order')
                    ->numeric()
                    ->default(0)
                    ->required(),
            ]);
    }
}
