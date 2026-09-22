<?php

namespace App\Models;

use App\Models\Concerns\HasSortOrder;
use Illuminate\Database\Eloquent\Model;

class WorkProgram extends Model
{
    use HasSortOrder;

    protected $table = 'work_programs';

    protected $fillable = ['icon', 'title', 'description', 'sort_order'];
}
