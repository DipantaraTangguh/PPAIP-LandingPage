<?php

namespace App\Filament\Admin\Resources\KubTalks\Schemas;

use App\Filament\Support\ImageUpload;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class KubTalkForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                ImageUpload::make('images', 'kub-talks', 1920, 1920, 8192)
                    ->label('Foto Event')
                    ->multiple()
                    ->reorderable()
                    ->maxFiles(30)
                    ->columnSpanFull(),
                TextInput::make('title')->required()->maxLength(255)->columnSpanFull(),
                Textarea::make('description')->rows(4)->maxLength(5000)->columnSpanFull(),

                Section::make('Identitas Perusahaan')
                    ->description('Informasi perusahaan mitra yang tampil di halaman publik.')
                    ->schema([
                        TextInput::make('company_name')
                            ->label('Nama Perusahaan')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('contoh: PT Telkom Indonesia'),
                        ImageUpload::make('company_logo', 'kub-talks/logos', 800, 400, 2048)
                            ->label('Logo Perusahaan')
                            ->required()
                            ->helperText('Wajib diisi. Ukuran ideal: 200x80px, format PNG transparan.'),
                    ])
                    ->columns(2)
                    ->collapsible(),

                Section::make('Pembicara')
                    ->schema([
                        TextInput::make('speaker_name')
                            ->label('Nama Pembicara')
                            ->maxLength(255)
                            ->placeholder('contoh: Andi Budiman'),
                        TextInput::make('speaker_title')
                            ->label('Jabatan Pembicara')
                            ->maxLength(255)
                            ->placeholder('contoh: VP of Engineering'),
                        DatePicker::make('event_date')
                            ->label('Tanggal Event'),
                    ])
                    ->columns(3)
                    ->collapsible(),

                TextInput::make('sort_order')->integer()->minValue(0)->default(0)->required(),
            ]);
    }
}
