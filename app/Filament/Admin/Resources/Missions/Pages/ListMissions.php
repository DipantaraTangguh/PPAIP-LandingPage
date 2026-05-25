<?php

namespace App\Filament\Admin\Resources\Missions\Pages;

use App\Filament\Admin\Resources\Missions\MissionResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListMissions extends ListRecords
{
    protected static string $resource = MissionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
