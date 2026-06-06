<?php

namespace App\Filament\Admin\Resources\Faqs\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class FaqForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('question')->required()->maxLength(255)->columnSpanFull(),
                Textarea::make('answer')->required()->rows(5)->maxLength(5000)->columnSpanFull(),
                TextInput::make('sort_order')->integer()->minValue(0)->default(0)->required(),
            ]);
    }
}
