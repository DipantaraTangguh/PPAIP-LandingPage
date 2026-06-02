<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InternshipYear extends Model
{
    protected $fillable = ['year', 'summary_kub', 'summary_non_kub', 'summary_bumn', 'sort_order'];

    public function prodiStats(): HasMany
    {
        return $this->hasMany(InternshipProdiStat::class)->orderBy('sort_order')->orderBy('id');
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderBy('year');
    }
}
