<?php

namespace App\Models;

use App\Models\Concerns\HasSortOrder;
use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    use HasSortOrder;

    protected $fillable = ['type', 'name', 'role', 'photo', 'bio', 'sort_order'];
}
