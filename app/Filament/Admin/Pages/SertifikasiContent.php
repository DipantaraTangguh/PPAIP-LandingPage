<?php

namespace App\Filament\Admin\Pages;

use App\Models\PageContent;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class SertifikasiContent extends Page
{
    protected string $view = 'filament.admin.pages.sertifikasi-content';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static ?string $title = 'Konten Sertifikasi Mahasiswa';

    protected static ?string $navigationLabel = 'Konten Halaman';

    protected static string|\UnitEnum|null $navigationGroup = 'Sertifikasi Mahasiswa';

    protected static ?int $navigationSort = 0;

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'about_description' => PageContent::get('sertifikasi.about_description'),
            'banner_image' => PageContent::get('sertifikasi.banner_image') ?: null,
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Banner Halaman')
                    ->schema([
                        FileUpload::make('banner_image')
                            ->label('Gambar Banner')
                            ->image()
                            ->disk('public')
                            ->directory('banners')
                            ->imageEditor()
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                            ->maxSize(8192)
                            ->helperText('Banner di bagian atas halaman Sertifikasi Mahasiswa. Kosongkan untuk memakai gambar bawaan.')
                            ->columnSpanFull(),
                    ]),
                Section::make('Deskripsi')
                    ->schema([
                        Textarea::make('about_description')
                            ->label('Deskripsi Halaman Sertifikasi')
                            ->rows(8)
                            ->maxLength(10000)
                            ->columnSpanFull(),
                    ]),
            ])
            ->statePath('data');
    }

    protected function getFormActions(): array
    {
        return [
            Action::make('save')->label('Simpan')->submit('save'),
        ];
    }

    public function save(): void
    {
        $data = $this->form->getState();
        PageContent::put('sertifikasi.about_description', $data['about_description'] ?? null);
        PageContent::put('sertifikasi.banner_image', $data['banner_image'] ?? null);

        Notification::make()->title('Konten sertifikasi tersimpan')->success()->send();
    }
}
