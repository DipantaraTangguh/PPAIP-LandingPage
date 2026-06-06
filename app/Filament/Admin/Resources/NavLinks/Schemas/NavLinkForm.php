<?php

namespace App\Filament\Admin\Resources\NavLinks\Schemas;

use App\Rules\SafeLink;
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
                    ->rules([new SafeLink])
                    ->helperText('Path like /about or full URL.'),
                TextInput::make('sort_order')->integer()->minValue(0)->default(0)->required(),
            ]);
    }
}
