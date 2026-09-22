<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InternshipMajorStat extends Model
{
    protected $table = 'internship_major_stats';

    protected $fillable = ['internship_year_id', 'name', 'kub', 'non_kub', 'bumn', 'catalog_start_page', 'sort_order'];

    protected $casts = ['catalog_start_page' => 'integer'];

    public function year(): BelongsTo
    {
        return $this->belongsTo(InternshipYear::class, 'internship_year_id');
    }
}
