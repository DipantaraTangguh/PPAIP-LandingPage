<?php

namespace App\Filament\Admin\Resources\KubTalks\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class KubTalksTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->columns([
                ImageColumn::make('images')
                    ->label('Foto Event')
                    ->disk('public')
                    ->square()
                    ->stacked()
                    ->limit(3),
                TextColumn::make('title')->searchable()->wrap()->limit(60),
                TextColumn::make('company_name')
                    ->label('Perusahaan')
                    ->searchable()
                    ->placeholder('—'),
                ImageColumn::make('company_logo')
                    ->label('Logo')
                    ->disk('public')
                    ->square()
                    ->toggleable(),
                TextColumn::make('speaker_name')
                    ->label('Pembicara')
                    ->placeholder('—')
                    ->toggleable(),
                TextColumn::make('event_date')
                    ->label('Tanggal')
                    ->date('d M Y')
                    ->placeholder('—')
                    ->toggleable(),
                TextColumn::make('sort_order')->sortable(),
            ])
            ->recordActions([EditAction::make(), DeleteAction::make()])
            ->toolbarActions([BulkActionGroup::make([DeleteBulkAction::make()])]);
    }
}
