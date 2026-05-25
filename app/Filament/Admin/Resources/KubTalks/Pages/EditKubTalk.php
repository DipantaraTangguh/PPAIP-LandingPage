<?php

namespace App\Filament\Admin\Resources\KubTalks\Pages;

use App\Filament\Admin\Resources\KubTalks\KubTalkResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditKubTalk extends EditRecord
{
    protected static string $resource = KubTalkResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
