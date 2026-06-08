<?php

namespace App\Filament\Admin\Resources\InternshipYears\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class InternshipYearsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('year', 'desc')
            ->columns([
                TextColumn::make('year')->searchable()->sortable(),
                TextColumn::make('summary_kub')->label('KUB')->sortable(),
                TextColumn::make('summary_non_kub')->label('Non-KUB')->sortable(),
                TextColumn::make('summary_bumn')->label('BUMN')->sortable(),
                TextColumn::make('major_stats_count')->counts('majorStats')->label('# Prodi'),
            ])
            ->recordActions([EditAction::make(), DeleteAction::make()])
            ->toolbarActions([BulkActionGroup::make([DeleteBulkAction::make()])]);
    }
}
