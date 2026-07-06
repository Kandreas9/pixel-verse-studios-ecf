<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class CharacterLog extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'character_logs';

    protected $fillable = [
        'user_email',
        'name',
        'changes',
        'items',
    ];
}
