<?php

namespace App\Filament\Admin\Resources\PractitionerTeachingMajors\Pages;

use App\Filament\Admin\Resources\PractitionerTeachingMajors\PractitionerTeachingMajorResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPractitionerTeachingMajors extends ListRecords
{
    protected static string $resource = PractitionerTeachingMajorResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
