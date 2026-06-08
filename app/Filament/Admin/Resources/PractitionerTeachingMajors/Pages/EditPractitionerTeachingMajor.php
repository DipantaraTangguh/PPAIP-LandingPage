<?php

namespace App\Filament\Admin\Resources\PractitionerTeachingMajors\Pages;

use App\Filament\Admin\Resources\PractitionerTeachingMajors\PractitionerTeachingMajorResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditPractitionerTeachingMajor extends EditRecord
{
    protected static string $resource = PractitionerTeachingMajorResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
