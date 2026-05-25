<?php

namespace App\Filament\Admin\Resources\KubTalks\Pages;

use App\Filament\Admin\Resources\KubTalks\KubTalkResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListKubTalks extends ListRecords
{
    protected static string $resource = KubTalkResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
