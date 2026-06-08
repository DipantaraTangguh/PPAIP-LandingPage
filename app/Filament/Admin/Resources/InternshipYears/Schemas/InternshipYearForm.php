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
                    ->columns(4)
                    ->schema([
                        TextInput::make('year')
                            ->required()
                            ->rules(['digits:4'])
                            ->unique(ignoreRecord: true),
                        TextInput::make('summary_kub')
                            ->label('Ringkasan KUB')
                            ->integer()->minValue(0)->default(0)->required(),
                        TextInput::make('summary_non_kub')
                            ->label('Ringkasan Non-KUB')
                            ->integer()->minValue(0)->default(0)->required(),
                        TextInput::make('summary_bumn')
                            ->label('Ringkasan BUMN')
                            ->integer()->minValue(0)->default(0)->required(),
                        TextInput::make('sort_order')->integer()->minValue(0)->default(0)->required(),
                    ]),
                Section::make('Statistik per Prodi')
                    ->schema([
                        Repeater::make('majorStats')
                            ->relationship('majorStats')
                            ->label('Statistik Prodi')
                            ->columns(5)
                            ->orderColumn('sort_order')
                            ->reorderable()
                            ->defaultItems(0)
                            ->schema([
                                TextInput::make('name')->label('Nama Prodi')->required()->columnSpan(2),
                                TextInput::make('kub')->label('KUB')->integer()->minValue(0)->default(0)->required(),
                                TextInput::make('non_kub')->label('Non-KUB')->integer()->minValue(0)->default(0)->required(),
                                TextInput::make('bumn')->label('BUMN')->integer()->minValue(0)->default(0)->required(),
                            ]),
                    ]),
            ]);
    }
}
