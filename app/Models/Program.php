<?php

namespace App\Models;

use App\Models\Concerns\HasSortOrder;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    use HasSortOrder;

    protected $fillable = ['name', 'image', 'link', 'sort_order'];
}
