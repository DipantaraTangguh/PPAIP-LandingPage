<?php

namespace App\Models;

use App\Models\Concerns\HasSortOrder;
use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    use HasSortOrder;

    protected $fillable = ['question', 'answer', 'sort_order'];
}
