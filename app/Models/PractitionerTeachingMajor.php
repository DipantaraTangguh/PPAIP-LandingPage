<?php

namespace App\Models;

use App\Models\Concerns\HasSortOrder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PractitionerTeachingMajor extends Model
{
    use HasSortOrder;

    protected $table = 'practitioner_teaching_majors';

    protected $fillable = ['name', 'slug', 'sort_order'];

    public function semesters(): HasMany
    {
        return $this->hasMany(PractitionerTeachingSemester::class, 'practitioner_teaching_major_id')->orderBy('sort_order')->orderBy('id');
    }
}
