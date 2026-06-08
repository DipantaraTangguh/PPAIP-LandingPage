<?php

namespace App\Filament\Admin\Pages;

use App\Models\PageContent;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Forms\Components\FileUpload;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class InternshipContent extends Page
{
    protected string $view = 'filament.admin.pages.internship-content';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static ?string $title = 'Konten Internship Program';

    protected static ?string $navigationLabel = 'Konten Halaman';

    protected static string|\UnitEnum|null $navigationGroup = 'Internship Program';

    protected static ?int $navigationSort = 0;

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'banner_image' => PageContent::get('internship_program.banner_image') ?: null,
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
                            ->helperText('Banner di bagian atas halaman Internship Program. Kosongkan untuk memakai gambar bawaan.')
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
        PageContent::put('internship_program.banner_image', $data['banner_image'] ?? null);

        Notification::make()->title('Konten internship program tersimpan')->success()->send();
    }
}
