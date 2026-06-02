<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InternshipProdiStat extends Model
{
    protected $table = 'internship_major_stats';

    protected $fillable = ['internship_year_id', 'name', 'kub', 'non_kub', 'bumn', 'sort_order'];

    public function year(): BelongsTo
    {
        return $this->belongsTo(InternshipYear::class, 'internship_year_id');
    }
}
