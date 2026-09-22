<?php

namespace App\Models;

use App\Models\Concerns\HasSortOrder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CertificationMajor extends Model
{
    use HasSortOrder;

    protected $table = 'certification_majors';

    protected $fillable = ['name', 'sort_order'];

    public function certifications(): HasMany
    {
        return $this->hasMany(Certification::class, 'certification_major_id')->orderBy('sort_order')->orderBy('id');
    }
}
