<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PraktisiMengajarProdi extends Model
{
    protected $table = 'practitioner_teaching_majors';

    protected $fillable = ['name', 'slug', 'sort_order'];

    public function semesters(): HasMany
    {
        return $this->hasMany(PraktisiMengajarSemester::class, 'practitioner_teaching_major_id')->orderBy('sort_order')->orderBy('id');
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderBy('id');
    }
}
