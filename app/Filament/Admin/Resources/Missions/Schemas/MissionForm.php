<?php

namespace App\Filament\Admin\Resources\Missions\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class MissionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Textarea::make('statement')->required()->rows(4)->columnSpanFull(),
                TextInput::make('sort_order')->numeric()->default(0)->required(),
            ]);
    }
}
