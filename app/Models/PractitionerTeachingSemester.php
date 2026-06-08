<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PractitionerTeachingSemester extends Model
{
    protected $table = 'practitioner_teaching_semesters';

    protected $fillable = ['practitioner_teaching_major_id', 'title', 'sort_order'];

    public function major(): BelongsTo
    {
        return $this->belongsTo(PractitionerTeachingMajor::class, 'practitioner_teaching_major_id');
    }

    public function courses(): HasMany
    {
        return $this->hasMany(PractitionerTeachingCourse::class, 'practitioner_teaching_semester_id')->orderBy('sort_order')->orderBy('id');
    }
}
