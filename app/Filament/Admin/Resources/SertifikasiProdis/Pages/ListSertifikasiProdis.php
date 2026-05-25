<?php

namespace App\Filament\Admin\Resources\SertifikasiProdis\Pages;

use App\Filament\Admin\Resources\SertifikasiProdis\SertifikasiProdiResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListSertifikasiProdis extends ListRecords
{
    protected static string $resource = SertifikasiProdiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
