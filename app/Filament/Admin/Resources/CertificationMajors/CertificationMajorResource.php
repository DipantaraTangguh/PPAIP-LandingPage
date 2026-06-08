<?php

namespace App\Filament\Admin\Resources\CertificationMajors;

use App\Filament\Admin\Resources\CertificationMajors\Pages\CreateCertificationMajor;
use App\Filament\Admin\Resources\CertificationMajors\Pages\EditCertificationMajor;
use App\Filament\Admin\Resources\CertificationMajors\Pages\ListCertificationMajors;
use App\Filament\Admin\Resources\CertificationMajors\Schemas\CertificationMajorForm;
use App\Filament\Admin\Resources\CertificationMajors\Tables\CertificationMajorsTable;
use App\Models\CertificationMajor;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class CertificationMajorResource extends Resource
{
    protected static ?string $model = CertificationMajor::class;

    protected static ?string $slug = 'certification-majors';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedAcademicCap;

    protected static ?string $navigationLabel = 'Prodi & Sertifikasi';

    protected static string|\UnitEnum|null $navigationGroup = 'Sertifikasi Mahasiswa';

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return CertificationMajorForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CertificationMajorsTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListCertificationMajors::route('/'),
            'create' => CreateCertificationMajor::route('/create'),
            'edit' => EditCertificationMajor::route('/{record}/edit'),
        ];
    }
}
