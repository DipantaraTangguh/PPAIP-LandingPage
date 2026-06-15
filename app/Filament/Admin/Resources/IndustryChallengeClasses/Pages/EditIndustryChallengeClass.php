<?php

namespace App\Filament\Admin\Resources\IndustryChallengeClasses\Pages;

use App\Filament\Admin\Resources\IndustryChallengeClasses\IndustryChallengeClassResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditIndustryChallengeClass extends EditRecord
{
    protected static string $resource = IndustryChallengeClassResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
