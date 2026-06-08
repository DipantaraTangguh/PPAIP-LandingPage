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
                    ->automaticallyResizeImagesMode('contain')
                    ->automaticallyResizeImagesToWidth('1000')
                    ->automaticallyResizeImagesToHeight('1000')
                    ->automaticallyUpscaleImagesWhenResizing(false)
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'])
                    ->maxSize(4096),
                Textarea::make('bio')->rows(3)->maxLength(3000)->columnSpanFull(),
                TextInput::make('sort_order')->integer()->minValue(0)->default(0)->required(),
            ]);
    }
}
