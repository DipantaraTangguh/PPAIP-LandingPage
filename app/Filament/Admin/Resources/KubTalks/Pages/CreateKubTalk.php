<?php

namespace App\Filament\Admin\Resources\KubTalks\Pages;

use App\Filament\Admin\Resources\KubTalks\KubTalkResource;
use Filament\Resources\Pages\CreateRecord;

class CreateKubTalk extends CreateRecord
{
    protected static string $resource = KubTalkResource::class;
}
