<?php

namespace App\Filament\Admin\Resources\CertificationMajors\Pages;

use App\Filament\Admin\Resources\CertificationMajors\CertificationMajorResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListCertificationMajors extends ListRecords
{
    protected static string $resource = CertificationMajorResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
