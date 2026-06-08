<?php

namespace App\Filament\Admin\Resources\WorkPrograms;

use App\Filament\Admin\Resources\WorkPrograms\Pages\CreateWorkProgram;
use App\Filament\Admin\Resources\WorkPrograms\Pages\EditWorkProgram;
use App\Filament\Admin\Resources\WorkPrograms\Pages\ListWorkPrograms;
use App\Filament\Admin\Resources\WorkPrograms\Schemas\WorkProgramForm;
use App\Filament\Admin\Resources\WorkPrograms\Tables\WorkProgramsTable;
use App\Models\WorkProgram;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class WorkProgramResource extends Resource
{
    protected static ?string $model = WorkProgram::class;

    protected static ?string $slug = 'work-programs';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedSquares2x2;

    protected static ?string $navigationLabel = 'Program Kerja';

    protected static string|\UnitEnum|null $navigationGroup = 'Tentang Kami';

    protected static ?int $navigationSort = 3;

    public static function form(Schema $schema): Schema
    {
        return WorkProgramForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return WorkProgramsTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListWorkPrograms::route('/'),
            'create' => CreateWorkProgram::route('/create'),
            'edit' => EditWorkProgram::route('/{record}/edit'),
        ];
    }
}
