<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class FooterLink extends Model
{
    protected $fillable = ['group_index', 'label', 'url', 'sort_order'];

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('group_index')->orderBy('sort_order')->orderBy('id');
    }
}
