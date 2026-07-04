<?php

namespace App\Models;

use Database\Factories\CommentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    /** @use HasFactory<CommentFactory> */
    use HasFactory;

    public function user()
    {
        $this->belongsTo(User::class);
    }

    public function character()
    {

        $this->belongsTo(Character::class);
    }
}
