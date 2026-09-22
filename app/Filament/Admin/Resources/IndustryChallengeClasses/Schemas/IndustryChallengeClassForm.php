<?php

namespace App\Filament\Admin\Resources\IndustryChallengeClasses\Schemas;

use App\Filament\Support\ImageUpload;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class IndustryChallengeClassForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                ImageUpload::make('images', 'industry-challenge-classes', 1920, 1920, 8192)
                    ->label('Foto Event')
                    ->multiple()
                    ->reorderable()
                    ->maxFiles(30)
                    ->columnSpanFull(),
                TextInput::make('title')
                    ->label('Judul Kelas')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),
                Textarea::make('description')
                    ->label('Deskripsi')
                    ->rows(4)
                    ->maxLength(5000)
                    ->columnSpanFull(),

                Section::make('Identitas Perusahaan')
                    ->description('Informasi mitra industri yang tampil di halaman publik.')
                    ->schema([
                        TextInput::make('company_name')
                            ->label('Nama Perusahaan')
                            ->required()
                            ->maxLength(255),
                        ImageUpload::make('company_logo', 'industry-challenge-classes/logos', 800, 400, 2048)
                            ->label('Logo Perusahaan')
                            ->required()
                            ->helperText('Ukuran ideal 200x80px dengan format PNG transparan.'),
                    ])
                    ->columns(2)
                    ->collapsible(),

                Section::make('Fasilitator')
                    ->schema([
                        TextInput::make('speaker_name')
                            ->label('Nama Fasilitator')
                            ->maxLength(255),
                        TextInput::make('speaker_title')
                            ->label('Jabatan Fasilitator')
                            ->maxLength(255),
                        DatePicker::make('event_date')
                            ->label('Tanggal Kelas'),
                    ])
                    ->columns(3)
                    ->collapsible(),

                TextInput::make('sort_order')
                    ->label('Urutan')
                    ->integer()
                    ->minValue(0)
                    ->default(0)
                    ->required(),
            ]);
    }
}
