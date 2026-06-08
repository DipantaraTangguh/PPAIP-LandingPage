<?php

namespace App\Filament\Admin\Resources\CertificationMajors\Pages;

use App\Filament\Admin\Resources\CertificationMajors\CertificationMajorResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditCertificationMajor extends EditRecord
{
    protected static string $resource = CertificationMajorResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
