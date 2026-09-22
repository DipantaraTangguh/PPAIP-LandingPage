<?php

namespace App\Models\Concerns;

use Illuminate\Database\Eloquent\Builder;

/**
 * Orders records by their sort_order column, falling back to id so the order
 * stays stable when several rows share a position.
 *
 * FooterLink and InternshipYear sort differently and keep their own scope.
 */
trait HasSortOrder
{
    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderBy('id');
    }
}
