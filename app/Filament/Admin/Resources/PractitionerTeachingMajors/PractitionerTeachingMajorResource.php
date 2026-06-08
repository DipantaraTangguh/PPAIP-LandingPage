<?php

namespace App\Filament\Admin\Resources\PractitionerTeachingMajors;

use App\Filament\Admin\Resources\PractitionerTeachingMajors\Pages\CreatePractitionerTeachingMajor;
use App\Filament\Admin\Resources\PractitionerTeachingMajors\Pages\EditPractitionerTeachingMajor;
use App\Filament\Admin\Resources\PractitionerTeachingMajors\Pages\ListPractitionerTeachingMajors;
use App\Filament\Admin\Resources\PractitionerTeachingMajors\Schemas\PractitionerTeachingMajorForm;
use App\Filament\Admin\Resources\PractitionerTeachingMajors\Tables\PractitionerTeachingMajorsTable;
use App\Models\PractitionerTeachingMajor;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class PractitionerTeachingMajorResource extends Resource
{
    protected static ?string $model = PractitionerTeachingMajor::class;

    protected static ?string $slug = 'practitioner-teaching-majors';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedAcademicCap;

    protected static ?string $navigationLabel = 'Prodi';

    protected static string|\UnitEnum|null $navigationGroup = 'Praktisi Mengajar';

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return PractitionerTeachingMajorForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PractitionerTeachingMajorsTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListPractitionerTeachingMajors::route('/'),
            'create' => CreatePractitionerTeachingMajor::route('/create'),
            'edit' => EditPractitionerTeachingMajor::route('/{record}/edit'),
        ];
    }
}
