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
        $adminUser = User::updateOrCreate(
            ['email' => config('admin.email')],
            [
                'name' => config('admin.username'),
                'password' => Hash::make(config('admin.password')),
            ]
        );

        $adminUser->assignRole('Super-Admin');

        $moderatorUser = User::updateOrCreate(
            ['email' => 'moderator@example.com'],
            [
                'name' => 'Moderator',
                'password' => Hash::make('Moderatorpassword!2'),
            ]
        );

        $moderatorUser->assignRole('Moderator');

        User::updateOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'User',
                'password' => Hash::make('Userpassword!2'),
            ]
        );
    }
}
