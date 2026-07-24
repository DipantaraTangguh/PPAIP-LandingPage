<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class PractitionerTeachingCourse extends Model
{
    protected $table = 'practitioner_teaching_courses';

    protected $fillable = ['practitioner_teaching_semester_id', 'name', 'is_practitioner', 'is_pbl', 'sort_order'];

    protected $casts = ['is_practitioner' => 'boolean', 'is_pbl' => 'boolean'];

    public function semester(): BelongsTo
    {
        return $this->belongsTo(PractitionerTeachingSemester::class, 'practitioner_teaching_semester_id');
    }

    public function practitioner(): HasOne
    {
        return $this->hasOne(PractitionerTeachingPractitioner::class, 'practitioner_teaching_course_id');
    }

    public function pbl(): HasOne
    {
        return $this->hasOne(PractitionerTeachingPbl::class, 'practitioner_teaching_course_id');
    }
}
