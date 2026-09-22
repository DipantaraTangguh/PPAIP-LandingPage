<?php

namespace App\Models;

use App\Models\Concerns\HasSortOrder;
use Illuminate\Database\Eloquent\Model;

class NavLink extends Model
{
    use HasSortOrder;

    protected $fillable = ['label', 'href', 'sort_order'];
}
