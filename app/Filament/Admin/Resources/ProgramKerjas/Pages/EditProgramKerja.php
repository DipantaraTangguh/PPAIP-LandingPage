<?php

namespace App\Filament\Admin\Resources\ProgramKerjas\Pages;

use App\Filament\Admin\Resources\ProgramKerjas\ProgramKerjaResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditProgramKerja extends EditRecord
{
    protected static string $resource = ProgramKerjaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
