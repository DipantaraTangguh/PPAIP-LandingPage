<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PractitionerTeachingPractitioner extends Model
{
    protected $table = 'practitioner_teaching_practitioners';

    protected $fillable = [
        'practitioner_teaching_course_id',
        'photo',
        'name',
        'field',
        'experience',
        'bio',
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(PractitionerTeachingCourse::class, 'practitioner_teaching_course_id');
    }
}
