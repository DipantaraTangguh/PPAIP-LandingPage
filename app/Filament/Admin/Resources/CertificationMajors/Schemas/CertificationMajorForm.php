<?php

namespace App\Filament\Admin\Resources\CertificationMajors\Schemas;

use App\Rules\SafeLink;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class CertificationMajorForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Prodi')
                    ->columns(2)
                    ->schema([
                        TextInput::make('name')
                            ->required()
                            ->maxLength(150)
                            ->unique(ignoreRecord: true),
                        TextInput::make('sort_order')->integer()->minValue(0)->default(0)->required(),
                    ]),
                Section::make('Daftar Sertifikasi')
                    ->schema([
                        Repeater::make('certifications')
                            ->relationship('certifications')
                            ->label('Sertifikasi')
                            ->orderColumn('sort_order')
                            ->reorderable()
                            ->collapsible()
                            ->columns(4)
                            ->defaultItems(0)
                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? null)
                            ->schema([
                                TextInput::make('title')->required()->maxLength(255)->columnSpan(2),
                                TextInput::make('issuer')->maxLength(100),
                                Toggle::make('is_available')->label('Tersedia')->default(true)->inline(false),
                                TextInput::make('register_url')
                                    ->label('URL Pendaftaran')
                                    ->maxLength(255)
                                    ->rules([new SafeLink])
                                    ->columnSpan(4)
                                    ->helperText('Hanya diperlukan jika sertifikasi tersedia.'),
                            ]),
                    ]),
            ]);
    }
}
