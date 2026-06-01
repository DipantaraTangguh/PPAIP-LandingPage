<?php

namespace App\Filament\Admin\Resources\PraktisiMengajarProdis\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class PraktisiMengajarProdiForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Prodi')
                    ->columns(3)
                    ->schema([
                        TextInput::make('name')
                            ->required()
                            ->maxLength(150)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($state, Set $set) => $set('slug', Str::slug(str_replace('&', 'dan', (string) $state))))
                            ->columnSpan(2),
                        TextInput::make('slug')
                            ->required()
                            ->maxLength(150)
                            ->helperText('URL-safe identifier. Auto-generated from name.'),
                        TextInput::make('sort_order')->numeric()->default(0)->required(),
                    ]),
                Section::make('Semester & Mata Kuliah')
                    ->schema([
                        Repeater::make('semesters')
                            ->relationship('semesters')
                            ->label('Semester')
                            ->orderColumn('sort_order')
                            ->reorderable()
                            ->cloneable()
                            ->collapsible()
                            ->collapsed()
                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? 'Semester')
                            ->defaultItems(0)
                            ->schema([
                                TextInput::make('title')
                                    ->required()
                                    ->default('Semester')
                                    ->maxLength(80),
                                Repeater::make('courses')
                                    ->relationship('courses')
                                    ->label('Mata Kuliah')
                                    ->orderColumn('sort_order')
                                    ->reorderable()
                                    ->columns(3)
                                    ->defaultItems(0)
                                    ->schema([
                                        TextInput::make('name')->required()->maxLength(150)->columnSpan(2),
                                        Toggle::make('is_practitioner')->label('Praktisi'),
                                    ]),
                            ]),
                    ]),
            ]);
    }
}
