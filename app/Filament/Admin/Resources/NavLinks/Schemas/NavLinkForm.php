<?php

namespace App\Filament\Admin\Resources\NavLinks\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class NavLinkForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('label')->required()->maxLength(80),
                TextInput::make('href')
                    ->required()
                    ->default('#')
                    ->maxLength(255)
                    ->helperText('Path like /about or full URL.'),
                TextInput::make('sort_order')->numeric()->default(0)->required(),
            ]);
    }
}
