<?php

namespace App\Filament\Admin\Resources\InternshipYears\Pages;

use App\Filament\Admin\Resources\InternshipYears\InternshipYearResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListInternshipYears extends ListRecords
{
    protected static string $resource = InternshipYearResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
