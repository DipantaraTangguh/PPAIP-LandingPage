<?php

namespace App\Filament\Admin\Resources\ProgramKerjas\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ProgramKerjaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('icon')
                    ->label('Ikon (Lucide)')
                    ->searchable()
                    ->options([
                        'Briefcase' => 'Briefcase',
                        'GraduationCap' => 'GraduationCap',
                        'Award' => 'Award',
                        'Mic' => 'Mic',
                        'BookOpen' => 'BookOpen',
                        'Network' => 'Network',
                        'Users' => 'Users',
                        'Building2' => 'Building2',
                        'Target' => 'Target',
                        'Lightbulb' => 'Lightbulb',
                        'Globe' => 'Globe',
                        'Sparkles' => 'Sparkles',
                    ])
                    ->helperText('Nama ikon dari lucide-react.'),
                TextInput::make('title')->required()->maxLength(150),
                Textarea::make('description')->rows(3)->columnSpanFull(),
                TextInput::make('sort_order')->numeric()->default(0)->required(),
            ]);
    }
}
