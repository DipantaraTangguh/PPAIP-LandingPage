<?php

namespace App\Filament\Admin\Resources\NavLinks;

use App\Filament\Admin\Resources\NavLinks\Pages\CreateNavLink;
use App\Filament\Admin\Resources\NavLinks\Pages\EditNavLink;
use App\Filament\Admin\Resources\NavLinks\Pages\ListNavLinks;
use App\Filament\Admin\Resources\NavLinks\Schemas\NavLinkForm;
use App\Filament\Admin\Resources\NavLinks\Tables\NavLinksTable;
use App\Models\NavLink;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class NavLinkResource extends Resource
{
    protected static ?string $model = NavLink::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedBars3;

    protected static ?string $navigationLabel = 'Navigasi';

    protected static string|\UnitEnum|null $navigationGroup = 'Beranda';

    protected static ?int $navigationSort = 3;

    public static function form(Schema $schema): Schema
    {
        return NavLinkForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return NavLinksTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListNavLinks::route('/'),
            'create' => CreateNavLink::route('/create'),
            'edit' => EditNavLink::route('/{record}/edit'),
        ];
    }
}
