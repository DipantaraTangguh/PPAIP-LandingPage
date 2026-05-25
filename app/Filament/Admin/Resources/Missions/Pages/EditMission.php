<?php

namespace App\Filament\Admin\Resources\Missions\Pages;

use App\Filament\Admin\Resources\Missions\MissionResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditMission extends EditRecord
{
    protected static string $resource = MissionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
