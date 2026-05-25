<?php

namespace App\Filament\Admin\Resources\PraktisiMengajarProdis\Pages;

use App\Filament\Admin\Resources\PraktisiMengajarProdis\PraktisiMengajarProdiResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditPraktisiMengajarProdi extends EditRecord
{
    protected static string $resource = PraktisiMengajarProdiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
