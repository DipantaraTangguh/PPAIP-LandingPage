<?php

namespace App\Filament\Admin\Resources\TeamMembers\Schemas;

use App\Filament\Support\ImageUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class TeamMemberForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('type')
                    ->options(['ketua' => 'Ketua', 'staff' => 'Staff'])
                    ->default('staff')
                    ->required(),
                TextInput::make('name')->required()->maxLength(150),
                TextInput::make('role')->maxLength(150),
                ImageUpload::make('photo', 'team'),
                Textarea::make('bio')->rows(3)->maxLength(3000)->columnSpanFull(),
                TextInput::make('sort_order')->integer()->minValue(0)->default(0)->required(),
            ]);
    }
}
