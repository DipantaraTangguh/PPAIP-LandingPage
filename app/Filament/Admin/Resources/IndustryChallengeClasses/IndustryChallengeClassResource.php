<?php

namespace App\Filament\Admin\Resources\IndustryChallengeClasses;

use App\Filament\Admin\Resources\IndustryChallengeClasses\Pages\CreateIndustryChallengeClass;
use App\Filament\Admin\Resources\IndustryChallengeClasses\Pages\EditIndustryChallengeClass;
use App\Filament\Admin\Resources\IndustryChallengeClasses\Pages\ListIndustryChallengeClasses;
use App\Filament\Admin\Resources\IndustryChallengeClasses\Schemas\IndustryChallengeClassForm;
use App\Filament\Admin\Resources\IndustryChallengeClasses\Tables\IndustryChallengeClassesTable;
use App\Models\IndustryChallengeClass;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class IndustryChallengeClassResource extends Resource
{
    protected static ?string $model = IndustryChallengeClass::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedAcademicCap;

    protected static ?string $navigationLabel = 'Galeri Industry Challenge Class';

    protected static string|\UnitEnum|null $navigationGroup = 'Industry Challenge Class';

    public static function form(Schema $schema): Schema
    {
        return IndustryChallengeClassForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return IndustryChallengeClassesTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListIndustryChallengeClasses::route('/'),
            'create' => CreateIndustryChallengeClass::route('/create'),
            'edit' => EditIndustryChallengeClass::route('/{record}/edit'),
        ];
    }
}
