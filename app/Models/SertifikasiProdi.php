<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SertifikasiProdi extends Model
{
    protected $table = 'certification_majors';

    protected $fillable = ['name', 'sort_order'];

    public function certifications(): HasMany
    {
        return $this->hasMany(Certification::class, 'certification_major_id')->orderBy('sort_order')->orderBy('id');
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderBy('id');
    }
}
