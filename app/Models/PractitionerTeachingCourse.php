<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PractitionerTeachingCourse extends Model
{
    protected $table = 'practitioner_teaching_courses';

    protected $fillable = ['practitioner_teaching_semester_id', 'name', 'is_practitioner', 'sort_order'];

    protected $casts = ['is_practitioner' => 'boolean'];

    public function semester(): BelongsTo
    {
        return $this->belongsTo(PractitionerTeachingSemester::class, 'practitioner_teaching_semester_id');
    }
}
