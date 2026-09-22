<?php

namespace App\Models;

use App\Models\Concerns\HasSortOrder;
use Illuminate\Database\Eloquent\Model;

class IndustryChallengeClass extends Model
{
    use HasSortOrder;

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
}
