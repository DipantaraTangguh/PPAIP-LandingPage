<?php

namespace App\Filament\Admin\Pages;

use App\Models\PageContent;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class TentangKamiContent extends Page
{
    protected string $view = 'filament.admin.pages.tentang-kami-content';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static ?string $title = 'Konten Tentang Kami';

    protected static ?string $navigationLabel = 'Konten Halaman';

    protected static string|\UnitEnum|null $navigationGroup = 'Tentang Kami';

    protected static ?int $navigationSort = 0;

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'about_intro' => PageContent::get('tentang_kami.about_intro'),
            'vision' => PageContent::get('tentang_kami.vision'),
            'group_photo_src' => PageContent::get('tentang_kami.group_photo_src'),
            'group_photo_fallback' => PageContent::get('tentang_kami.group_photo_fallback'),
            'group_photo_caption' => PageContent::get('tentang_kami.group_photo_caption'),
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Pendahuluan & Visi')
                    ->schema([
                        Textarea::make('about_intro')
                            ->label('Intro Tentang Kami')
                            ->rows(6)
                            ->maxLength(10000)
                            ->columnSpanFull(),
                        Textarea::make('vision')
                            ->label('Visi')
                            ->rows(4)
                            ->maxLength(5000)
                            ->columnSpanFull(),
                    ]),
                Section::make('Foto Tim (Group Photo)')
                    ->schema([
                        FileUpload::make('group_photo_src')
                            ->label('Foto Utama')
                            ->image()
                            ->disk('public')
                            ->directory('tentang-kami')
                            ->imageEditor()
                            ->automaticallyResizeImagesMode('contain')
                            ->automaticallyResizeImagesToWidth('1920')
                            ->automaticallyResizeImagesToHeight('1080')
                            ->automaticallyUpscaleImagesWhenResizing(false)
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'])
                            ->maxSize(8192)
                            ->columnSpanFull(),
                        FileUpload::make('group_photo_fallback')
                            ->label('Foto Fallback (opsional)')
                            ->image()
                            ->disk('public')
                            ->directory('tentang-kami')
                            ->automaticallyResizeImagesMode('contain')
                            ->automaticallyResizeImagesToWidth('1920')
                            ->automaticallyResizeImagesToHeight('1080')
                            ->automaticallyUpscaleImagesWhenResizing(false)
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'])
                            ->maxSize(8192)
                            ->columnSpanFull(),
                        TextInput::make('group_photo_caption')
                            ->label('Caption Foto')
                            ->maxLength(255)
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
        foreach ([
            'about_intro',
            'vision',
            'group_photo_src',
            'group_photo_fallback',
            'group_photo_caption',
        ] as $key) {
            PageContent::put("tentang_kami.$key", $data[$key] ?? null);
        }

        Notification::make()->title('Konten tentang kami tersimpan')->success()->send();
    }
}
