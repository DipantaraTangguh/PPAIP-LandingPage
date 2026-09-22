<?php

namespace App\Filament\Admin\Pages;

use App\Filament\Support\ImageUpload;
use App\Models\PageContent;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class IndustryChallengeClassContent extends Page
{
    protected string $view = 'filament.admin.pages.simple-form';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static ?string $title = 'Konten Industry Challenge Class';

    protected static ?string $navigationLabel = 'Konten Halaman';

    protected static string|\UnitEnum|null $navigationGroup = 'Industry Challenge Class';

    protected static ?int $navigationSort = 0;

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'banner_image' => PageContent::get('industry_challenge_class.banner_image') ?: null,
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
                            ->helperText('Kosongkan untuk memakai gambar bawaan.')
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

        PageContent::put(
            'industry_challenge_class.banner_image',
            $data['banner_image'] ?? null,
        );

        Notification::make()
            ->title('Konten Industry Challenge Class tersimpan')
            ->success()
            ->send();
    }
}
