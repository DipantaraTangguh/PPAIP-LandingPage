<?php

namespace App\Filament\Admin\Pages;

use App\Models\PageContent;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class KubTalkContent extends Page
{
    protected string $view = 'filament.admin.pages.kub-talk-content';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static ?string $title = 'Konten KUB Talk';

    protected static ?string $navigationLabel = 'Konten Halaman';

    protected static string|\UnitEnum|null $navigationGroup = 'KUB Talk';

    protected static ?int $navigationSort = 0;

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'banner_image' => PageContent::get('kub_talk.banner_image') ?: null,
            'total_students' => PageContent::get('kub_talk.total_students', '500+'),
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
                            ->helperText('Banner di bagian atas halaman KUB Talk. Kosongkan untuk memakai gambar bawaan.')
                            ->columnSpanFull(),
                    ]),
                Section::make('Statistik Halaman')
                    ->schema([
                        TextInput::make('total_students')
                            ->label('Jumlah Mahasiswa Terlibat')
                            ->placeholder('contoh: 500+')
                            ->required()
                            ->maxLength(20)
                            ->rules(['regex:/^[0-9][0-9.,]*\+?$/'])
                            ->helperText('Angka yang ditampilkan di bagian statistik halaman KUB Talk.'),
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
        PageContent::put('kub_talk.banner_image', $data['banner_image'] ?? null);
        PageContent::put('kub_talk.total_students', $data['total_students'] ?? '500+');

        Notification::make()->title('Konten KUB Talk tersimpan')->success()->send();
    }
}
