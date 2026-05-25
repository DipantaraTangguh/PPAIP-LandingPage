<?php

namespace App\Filament\Admin\Resources\PraktisiMengajarProdis\Pages;

use App\Filament\Admin\Resources\PraktisiMengajarProdis\PraktisiMengajarProdiResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPraktisiMengajarProdis extends ListRecords
{
    protected static string $resource = PraktisiMengajarProdiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
