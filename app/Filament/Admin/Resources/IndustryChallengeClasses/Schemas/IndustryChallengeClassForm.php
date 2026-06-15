<?php

namespace App\Filament\Admin\Resources\IndustryChallengeClasses\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
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
                FileUpload::make('images')
                    ->label('Foto Event')
                    ->image()
                    ->multiple()
                    ->reorderable()
                    ->disk('public')
                    ->directory('industry-challenge-classes')
                    ->imageEditor()
                    ->automaticallyResizeImagesMode('contain')
                    ->automaticallyResizeImagesToWidth('1920')
                    ->automaticallyResizeImagesToHeight('1920')
                    ->automaticallyUpscaleImagesWhenResizing(false)
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'])
                    ->maxFiles(30)
                    ->maxSize(8192)
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
                        FileUpload::make('company_logo')
                            ->label('Logo Perusahaan')
                            ->required()
                            ->image()
                            ->disk('public')
                            ->directory('industry-challenge-classes/logos')
                            ->imageEditor()
                            ->automaticallyResizeImagesMode('contain')
                            ->automaticallyResizeImagesToWidth('800')
                            ->automaticallyResizeImagesToHeight('400')
                            ->automaticallyUpscaleImagesWhenResizing(false)
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'])
                            ->maxSize(2048)
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
