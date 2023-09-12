<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    // create()はfillableが必要
    protected $fillable = [
        'title', 'is_done'
    ];

    protected $casts = [
        'is_done' => 'bool'
    ];
}