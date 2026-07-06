<?php

namespace Database\Seeders;

use App\Models\Character;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', 'user@example.com')->first();
        $character = Character::where('user_id', $user->id)->first();

        Comment::factory()->count(5)->create([
            'user_id' => $user->id,
            'character_id' => $character->id,
        ]);
    }
}
