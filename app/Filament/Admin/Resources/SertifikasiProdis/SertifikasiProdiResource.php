<?php

namespace App\Filament\Admin\Resources\SertifikasiProdis;

use App\Filament\Admin\Resources\SertifikasiProdis\Pages\CreateSertifikasiProdi;
use App\Filament\Admin\Resources\SertifikasiProdis\Pages\EditSertifikasiProdi;
use App\Filament\Admin\Resources\SertifikasiProdis\Pages\ListSertifikasiProdis;
use App\Filament\Admin\Resources\SertifikasiProdis\Schemas\SertifikasiProdiForm;
use App\Filament\Admin\Resources\SertifikasiProdis\Tables\SertifikasiProdisTable;
use App\Models\SertifikasiProdi;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class SertifikasiProdiResource extends Resource
{
    protected static ?string $model = SertifikasiProdi::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedAcademicCap;

    protected static ?string $navigationLabel = 'Prodi & Sertifikasi';

    protected static string|\UnitEnum|null $navigationGroup = 'Sertifikasi Mahasiswa';

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return SertifikasiProdiForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return SertifikasiProdisTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListSertifikasiProdis::route('/'),
            'create' => CreateSertifikasiProdi::route('/create'),
            'edit' => EditSertifikasiProdi::route('/{record}/edit'),
        ];
    }
}
