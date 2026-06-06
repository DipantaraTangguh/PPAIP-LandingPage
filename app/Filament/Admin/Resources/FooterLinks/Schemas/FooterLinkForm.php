<?php

namespace App\Filament\Admin\Resources\FooterLinks\Schemas;

use App\Rules\SafeLink;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class FooterLinkForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('group_index')
                    ->label('Kolom Footer')
                    ->options([1 => 'Kolom 1', 2 => 'Kolom 2', 3 => 'Kolom 3'])
                    ->required()
                    ->default(1),
                TextInput::make('label')->required()->maxLength(120),
                TextInput::make('url')
                    ->maxLength(255)
                    ->rules([new SafeLink])
                    ->helperText('Optional. Leave blank for plain text.'),
                TextInput::make('sort_order')->integer()->minValue(0)->default(0)->required(),
            ]);
    }
}
