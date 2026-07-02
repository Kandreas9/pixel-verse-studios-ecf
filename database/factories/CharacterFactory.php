<?php

namespace Database\Factories;

use App\Models\Character;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Character>
 */
class CharacterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'gender' => fake()->text(50),
            'skin_color' => fake()->text(50),
            'eye_color' => fake()->text(50),
            'eye_shape' => fake()->text(50),
            'hair_color' => fake()->text(50),
            'nose_color' => fake()->text(50),
            'mouth_color' => fake()->text(50),
            'isShared' => fake()->boolean(),
            'isAuthorized' => fake()->boolean(),
        ];
    }
}
