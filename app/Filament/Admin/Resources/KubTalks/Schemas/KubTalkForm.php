<?php

namespace App\Filament\Admin\Resources\KubTalks\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class KubTalkForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                FileUpload::make('image')
                    ->image()
                    ->disk('public')
                    ->directory('kub-talks')
                    ->imageEditor()
                    ->maxSize(8192)
                    ->columnSpanFull(),
                TextInput::make('title')->required()->maxLength(255)->columnSpanFull(),
                Textarea::make('description')->rows(4)->columnSpanFull(),
                TextInput::make('sort_order')->numeric()->default(0)->required(),
            ]);
    }
}
