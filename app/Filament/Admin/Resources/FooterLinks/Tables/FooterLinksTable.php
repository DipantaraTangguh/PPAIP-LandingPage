<?php

namespace App\Filament\Admin\Resources\FooterLinks\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class FooterLinksTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('group_index')
            ->reorderable('sort_order')
            ->columns([
                TextColumn::make('group_index')->label('Kolom')->sortable(),
                TextColumn::make('label')->searchable(),
                TextColumn::make('url')->limit(40),
                TextColumn::make('sort_order')->sortable(),
            ])
            ->recordActions([EditAction::make(), DeleteAction::make()])
            ->toolbarActions([BulkActionGroup::make([DeleteBulkAction::make()])]);
    }
}
