<?php

namespace App\Filament\Admin\Resources\KubTalks;

use App\Filament\Admin\Resources\KubTalks\Pages\CreateKubTalk;
use App\Filament\Admin\Resources\KubTalks\Pages\EditKubTalk;
use App\Filament\Admin\Resources\KubTalks\Pages\ListKubTalks;
use App\Filament\Admin\Resources\KubTalks\Schemas\KubTalkForm;
use App\Filament\Admin\Resources\KubTalks\Tables\KubTalksTable;
use App\Models\KubTalk;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class KubTalkResource extends Resource
{
    protected static ?string $model = KubTalk::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedMicrophone;

    protected static ?string $navigationLabel = 'Galeri KUB Talk';

    protected static string|\UnitEnum|null $navigationGroup = 'KUB Talk';

    public static function form(Schema $schema): Schema
    {
        return KubTalkForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return KubTalksTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListKubTalks::route('/'),
            'create' => CreateKubTalk::route('/create'),
            'edit' => EditKubTalk::route('/{record}/edit'),
        ];
    }
}
