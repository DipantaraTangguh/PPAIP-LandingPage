<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Certification extends Model
{
    protected $fillable = [
        'certification_major_id',
        'title',
        'issuer',
        'is_available',
        'register_url',
        'sort_order',
    ];

    protected $casts = ['is_available' => 'boolean'];

    public function prodi(): BelongsTo
    {
        return $this->belongsTo(SertifikasiProdi::class, 'certification_major_id');
    }
}
