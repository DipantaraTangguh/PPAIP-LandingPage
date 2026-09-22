<?php

namespace App\Filament\Admin\Pages;

use App\Filament\Support\ImageUpload;
use App\Models\PageContent;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Forms\Components\Textarea;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class PractitionerTeachingContent extends Page
{
    protected string $view = 'filament.admin.pages.practitioner-teaching-content';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static ?string $title = 'Konten Kemitraan dan Pembelajaran Berbasis Proyek';

    protected static ?string $navigationLabel = 'Konten Halaman';

    protected static ?string $slug = 'practitioner-teaching-content';

    protected static string|\UnitEnum|null $navigationGroup = 'Kemitraan dan Pembelajaran Berbasis Proyek';

    protected static ?int $navigationSort = 0;

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'about_description' => PageContent::get('praktisi_mengajar.about_description'),
            'banner_image' => PageContent::get('praktisi_mengajar.banner_image') ?: null,
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Banner Halaman')
                    ->schema([
                        ImageUpload::make('banner_image', 'banners', 1920, 1080, 8192)
                            ->label('Gambar Banner')
                            ->helperText('Banner di bagian atas halaman Kemitraan dan Pembelajaran Berbasis Proyek. Kosongkan untuk memakai gambar bawaan.')
                            ->columnSpanFull(),
                    ]),
                Section::make('Deskripsi')
                    ->schema([
                        Textarea::make('about_description')
                            ->label('Deskripsi Halaman Kemitraan dan Pembelajaran Berbasis Proyek')
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
        PageContent::put('praktisi_mengajar.about_description', $data['about_description'] ?? null);
        PageContent::put('praktisi_mengajar.banner_image', $data['banner_image'] ?? null);

        Notification::make()->title('Konten kemitraan dan pembelajaran berbasis proyek tersimpan')->success()->send();
    }
}
