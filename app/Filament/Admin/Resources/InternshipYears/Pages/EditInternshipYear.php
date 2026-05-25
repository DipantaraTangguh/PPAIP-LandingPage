<?php

namespace App\Filament\Admin\Resources\InternshipYears\Pages;

use App\Filament\Admin\Resources\InternshipYears\InternshipYearResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditInternshipYear extends EditRecord
{
    protected static string $resource = InternshipYearResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
