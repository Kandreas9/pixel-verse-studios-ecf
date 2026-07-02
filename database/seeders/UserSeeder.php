<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminUser = User::factory()->create([
            'name' => config('admin.username'),
            'email' => config('admin.email'),
            'password' => Hash::make(config('admin.password')),
        ]);
        $adminUser->assignRole('Super-Admin');

        // Not protecting the moderator and normal user like i do for the super admin seeder data since these are just for testing anyway
        $moderatorUser = User::factory()->create([
            'name' => 'Moderator',
            'email' => 'moderator@example.com',
        ]);
        $moderatorUser->assignRole('Moderator');

        User::factory()->create([
            'name' => 'Test',
            'email' => 'user@example.com',
        ]);
    }
}
