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

class PractitionerTeachingContent extends Page
{
    protected string $view = 'filament.admin.pages.practitioner-teaching-content';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static ?string $title = 'Konten Praktisi Mengajar';

    protected static ?string $navigationLabel = 'Konten Halaman';

    protected static ?string $slug = 'practitioner-teaching-content';

    protected static string|\UnitEnum|null $navigationGroup = 'Praktisi Mengajar';

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
                        FileUpload::make('banner_image')
                            ->label('Gambar Banner')
                            ->image()
                            ->disk('public')
                            ->directory('banners')
                            ->imageEditor()
                            ->automaticallyResizeImagesMode('contain')
                            ->automaticallyResizeImagesToWidth('1920')
                            ->automaticallyResizeImagesToHeight('1080')
                            ->automaticallyUpscaleImagesWhenResizing(false)
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'])
                            ->maxSize(8192)
                            ->helperText('Banner di bagian atas halaman Praktisi Mengajar. Kosongkan untuk memakai gambar bawaan.')
                            ->columnSpanFull(),
                    ]),
                Section::make('Deskripsi')
                    ->schema([
                        Textarea::make('about_description')
                            ->label('Deskripsi Halaman Praktisi Mengajar')
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

        Notification::make()->title('Konten praktisi mengajar tersimpan')->success()->send();
    }
}
