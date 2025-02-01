<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run()
    {
        // Création des rôles
        $stylistRole = Role::create(['name' => 'ROLE_STYLIST']);
        $userRole = Role::create(['name' => 'ROLE_USER']);

        // Définition des permissions
        $permissions = [
            'manage user account',
            'manage stylist account' ,
            'create styles',
            'edit styles',
            'delete styles',
            'view styles',
            'test roles',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Associer des permissions aux rôles
        $stylistRole->givePermissionTo($permissions);
        $userRole->givePermissionTo('manage user account');

        // Assigner un rôle à un utilisateur (optionnel)
        $user = \App\Models\User::find(1); // Change l'ID selon ton utilisateur
        if ($user) {
            $user->assignRole('stylist');
        }
    }
}
