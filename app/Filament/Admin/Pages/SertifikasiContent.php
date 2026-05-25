<?php

namespace App\Filament\Admin\Pages;

use App\Models\PageContent;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Forms\Components\Textarea;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
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
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Textarea::make('about_description')
                    ->label('Deskripsi Halaman Sertifikasi')
                    ->rows(8)
                    ->columnSpanFull(),
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

        Notification::make()->title('Konten sertifikasi tersimpan')->success()->send();
    }
}
