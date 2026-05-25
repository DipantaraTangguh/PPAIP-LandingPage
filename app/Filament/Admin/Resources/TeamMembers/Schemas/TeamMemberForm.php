<?php

namespace App\Filament\Admin\Resources\TeamMembers\Schemas;

use Filament\Forms\Components\FileUpload;
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
                FileUpload::make('photo')
                    ->image()
                    ->disk('public')
                    ->directory('team')
                    ->imageEditor()
                    ->maxSize(4096),
                Textarea::make('bio')->rows(3)->columnSpanFull(),
                TextInput::make('sort_order')->numeric()->default(0)->required(),
            ]);
    }
}
