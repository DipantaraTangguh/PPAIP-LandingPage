<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class KubTalk extends Model
{
    protected $fillable = [
        'image',
        'title',
        'description',
        'company_name',
        'company_logo',
        'speaker_name',
        'speaker_title',
        'event_date',
        'sort_order',
    ];

    protected $casts = [
        'event_date' => 'date',
    ];

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderBy('id');
    }
}
