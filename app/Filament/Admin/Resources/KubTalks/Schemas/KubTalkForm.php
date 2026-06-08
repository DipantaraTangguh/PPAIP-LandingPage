<?php

namespace App\Filament\Admin\Resources\KubTalks\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
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
                FileUpload::make('images')
                    ->label('Foto Event')
                    ->image()
                    ->multiple()
                    ->reorderable()
                    ->disk('public')
                    ->directory('kub-talks')
                    ->imageEditor()
                    ->automaticallyResizeImagesMode('contain')
                    ->automaticallyResizeImagesToWidth('1920')
                    ->automaticallyResizeImagesToHeight('1920')
                    ->automaticallyUpscaleImagesWhenResizing(false)
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'])
                    ->maxFiles(30)
                    ->maxSize(8192)
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
                        FileUpload::make('company_logo')
                            ->label('Logo Perusahaan')
                            ->required()
                            ->image()
                            ->disk('public')
                            ->directory('kub-talks/logos')
                            ->imageEditor()
                            ->automaticallyResizeImagesMode('contain')
                            ->automaticallyResizeImagesToWidth('800')
                            ->automaticallyResizeImagesToHeight('400')
                            ->automaticallyUpscaleImagesWhenResizing(false)
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'])
                            ->maxSize(2048)
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
