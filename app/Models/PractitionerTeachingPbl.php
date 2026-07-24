<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PractitionerTeachingPbl extends Model
{
    protected $table = 'practitioner_teaching_pbls';

    protected $fillable = [
        'practitioner_teaching_course_id',
        'photo',
        'title',
        'partner',
        'focus',
        'description',
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(PractitionerTeachingCourse::class, 'practitioner_teaching_course_id');
    }
}
