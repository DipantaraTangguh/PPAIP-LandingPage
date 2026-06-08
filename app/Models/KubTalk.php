<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string|null $image
 * @property array|null $images
 * @property string $title
 * @property string|null $description
 * @property string|null $company_name
 * @property string|null $company_logo
 * @property string|null $speaker_name
 * @property string|null $speaker_title
 * @property \Carbon\Carbon|null $event_date
 * @property int $sort_order
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 */
class KubTalk extends Model
{
    protected $fillable = [
        'image',
        'images',
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
        'images' => 'array',
    ];

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderBy('id');
    }
}
