<?php

namespace App\Filament\Admin\Resources\PraktisiMengajarProdis;

use App\Filament\Admin\Resources\PraktisiMengajarProdis\Pages\CreatePraktisiMengajarProdi;
use App\Filament\Admin\Resources\PraktisiMengajarProdis\Pages\EditPraktisiMengajarProdi;
use App\Filament\Admin\Resources\PraktisiMengajarProdis\Pages\ListPraktisiMengajarProdis;
use App\Filament\Admin\Resources\PraktisiMengajarProdis\Schemas\PraktisiMengajarProdiForm;
use App\Filament\Admin\Resources\PraktisiMengajarProdis\Tables\PraktisiMengajarProdisTable;
use App\Models\PraktisiMengajarProdi;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class PraktisiMengajarProdiResource extends Resource
{
    protected static ?string $model = PraktisiMengajarProdi::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedAcademicCap;

    protected static ?string $navigationLabel = 'Prodi';

    protected static string|\UnitEnum|null $navigationGroup = 'Praktisi Mengajar';

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return PraktisiMengajarProdiForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PraktisiMengajarProdisTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListPraktisiMengajarProdis::route('/'),
            'create' => CreatePraktisiMengajarProdi::route('/create'),
            'edit' => EditPraktisiMengajarProdi::route('/{record}/edit'),
        ];
    }
}
