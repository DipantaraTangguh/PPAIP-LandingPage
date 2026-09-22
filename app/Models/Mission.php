<?php

namespace App\Models;

use App\Models\Concerns\HasSortOrder;
use Illuminate\Database\Eloquent\Model;

class Mission extends Model
{
    use HasSortOrder;

    protected $fillable = ['statement', 'sort_order'];
}
