<?php

namespace App\Filament\Admin\Resources\SertifikasiProdis\Pages;

use App\Filament\Admin\Resources\SertifikasiProdis\SertifikasiProdiResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditSertifikasiProdi extends EditRecord
{
    protected static string $resource = SertifikasiProdiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
