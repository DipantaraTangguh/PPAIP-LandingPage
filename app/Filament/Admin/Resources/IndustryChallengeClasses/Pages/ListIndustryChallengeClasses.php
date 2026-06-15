<?php

namespace App\Filament\Admin\Resources\IndustryChallengeClasses\Pages;

use App\Filament\Admin\Resources\IndustryChallengeClasses\IndustryChallengeClassResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListIndustryChallengeClasses extends ListRecords
{
    protected static string $resource = IndustryChallengeClassResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
