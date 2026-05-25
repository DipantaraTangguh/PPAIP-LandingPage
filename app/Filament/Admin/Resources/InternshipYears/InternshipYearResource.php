<?php

namespace App\Filament\Admin\Resources\InternshipYears;

use App\Filament\Admin\Resources\InternshipYears\Pages\CreateInternshipYear;
use App\Filament\Admin\Resources\InternshipYears\Pages\EditInternshipYear;
use App\Filament\Admin\Resources\InternshipYears\Pages\ListInternshipYears;
use App\Filament\Admin\Resources\InternshipYears\Schemas\InternshipYearForm;
use App\Filament\Admin\Resources\InternshipYears\Tables\InternshipYearsTable;
use App\Models\InternshipYear;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class InternshipYearResource extends Resource
{
    protected static ?string $model = InternshipYear::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedChartBar;

    protected static ?string $navigationLabel = 'Data Tahunan';

    protected static string|\UnitEnum|null $navigationGroup = 'Internship Program';

    public static function form(Schema $schema): Schema
    {
        return InternshipYearForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return InternshipYearsTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListInternshipYears::route('/'),
            'create' => CreateInternshipYear::route('/create'),
            'edit' => EditInternshipYear::route('/{record}/edit'),
        ];
    }
}
