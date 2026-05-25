<?php

namespace App\Filament\Admin\Resources\ProgramKerjas;

use App\Filament\Admin\Resources\ProgramKerjas\Pages\CreateProgramKerja;
use App\Filament\Admin\Resources\ProgramKerjas\Pages\EditProgramKerja;
use App\Filament\Admin\Resources\ProgramKerjas\Pages\ListProgramKerjas;
use App\Filament\Admin\Resources\ProgramKerjas\Schemas\ProgramKerjaForm;
use App\Filament\Admin\Resources\ProgramKerjas\Tables\ProgramKerjasTable;
use App\Models\ProgramKerja;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ProgramKerjaResource extends Resource
{
    protected static ?string $model = ProgramKerja::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedSquares2x2;

    protected static ?string $navigationLabel = 'Program Kerja';

    protected static string|\UnitEnum|null $navigationGroup = 'Tentang Kami';

    protected static ?int $navigationSort = 3;

    public static function form(Schema $schema): Schema
    {
        return ProgramKerjaForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ProgramKerjasTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListProgramKerjas::route('/'),
            'create' => CreateProgramKerja::route('/create'),
            'edit' => EditProgramKerja::route('/{record}/edit'),
        ];
    }
}
