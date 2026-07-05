<?php

namespace Database\Seeders;

use App\Models\Character;
use App\Models\User;
use Illuminate\Database\Seeder;

class CharacterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', 'user@example.com')->first();

        Character::factory()->for($user)->create([
            'name' => 'Approved Char Seeded',
            'gender' => 'test',
            'skin_color' => 'test',
            'eye_color' => 'test',
            'eye_shape' => 'test',
            'hair_color' => 'test',
            'nose_shape' => 'test',
            'mouth_shape' => 'test',
            'is_shared' => false,
            'is_approved' => true,
        ]);

        Character::factory()->for($user)->create([
            'name' => 'Not Approved Char Seeded',
            'gender' => 'test',
            'skin_color' => 'test',
            'eye_color' => 'test',
            'eye_shape' => 'test',
            'hair_color' => 'test',
            'nose_shape' => 'test',
            'mouth_shape' => 'test',
            'is_shared' => false,
            'is_approved' => false,

        ]);

    }
}
