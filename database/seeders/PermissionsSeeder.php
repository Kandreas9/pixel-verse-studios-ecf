<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        Permission::create(['name' => 'authorize characters']);
        Permission::create(['name' => 'authorize comments']);
        Permission::create(['name' => 'create items']);
        Permission::create(['name' => 'edit items']);
        Permission::create(['name' => 'delete items']);
        Permission::create(['name' => 'delete characters']);
        Permission::create(['name' => 'suspend user account']);

        $moderatorRole = Role::create(['name' => 'Moderator']);
        $moderatorRole->syncPermissions([
            'authorize characters',
            'authorize comments',
            'create items',
            'edit items',
            'delete items',
            'delete characters',
            'suspend user account',
        ]);

        Permission::create(['name' => 'create moderator account']);

        $superAdminRole = Role::create(['name' => 'Super-Admin']);
        $superAdminRole->givePermissionTo('create moderator account');
    }
}
