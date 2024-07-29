<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reminder extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'reminder',
        'priority',
        'reminder_time',
    ];

    protected $casts = [
        'reminder_time' => 'datetime',
    ];
    
}
