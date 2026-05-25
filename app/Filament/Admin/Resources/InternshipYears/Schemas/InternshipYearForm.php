<?php

namespace App\Filament\Admin\Resources\InternshipYears\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class InternshipYearForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Tahun')
                    ->columns(3)
                    ->schema([
                        TextInput::make('year')->required()->maxLength(8),
                        TextInput::make('summary_kub')
                            ->label('Ringkasan KUB')
                            ->numeric()->default(0)->required(),
                        TextInput::make('summary_non_kub')
                            ->label('Ringkasan Non-KUB')
                            ->numeric()->default(0)->required(),
                        TextInput::make('sort_order')->numeric()->default(0)->required(),
                    ]),
                Section::make('Statistik per Prodi')
                    ->schema([
                        Repeater::make('prodiStats')
                            ->relationship('prodiStats')
                            ->label('Statistik Prodi')
                            ->columns(4)
                            ->orderColumn('sort_order')
                            ->reorderable()
                            ->defaultItems(0)
                            ->schema([
                                TextInput::make('name')->label('Nama Prodi')->required()->columnSpan(2),
                                TextInput::make('kub')->label('KUB')->numeric()->default(0)->required(),
                                TextInput::make('non_kub')->label('Non-KUB')->numeric()->default(0)->required(),
                            ]),
                    ]),
            ]);
    }
}
