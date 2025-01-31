<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Vérifier si les rôles existent
        $userRole = Role::where('name', 'user')->first();
        $stylistRole = Role::where('name', 'stylist')->first();

        if (!$userRole || !$stylistRole) {
            $this->command->error("Les rôles n'ont pas été trouvés. Exécute d'abord RoleSeeder.");
            return;
        }

        // Utilisateur avec le rôle USER
        $user = User::create([
            'name' => 'User Test',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'profil_picture' => null,
            'photos' => json_encode([]),
            'note' => null,
            'bibliography' => null,
            'calendar' => json_encode([]),
            'preferences_id' => json_encode([]),
            'measures_id' => json_encode([]),
            'specialty' => null,
            'experience' => null,
            'localisation' => null,
        ]);
        $user->assignRole($userRole);

        // Utilisateur avec le rôle STYLIST
        $stylist = User::create([
            'name' => 'Stylist Test',
            'email' => 'stylist@example.com',
            'password' => Hash::make('password'),
            'profil_picture' => null,
            'photos' => json_encode(["profile1.jpg"]),
            'note' => 5,
            'bibliography' => "Styliste professionnel avec 10 ans d'expérience",
            'calendar' => json_encode(["Monday", "Wednesday", "Friday"]),
            'preferences_id' => json_encode([]),
            'measures_id' => json_encode([]),
            'specialty' => 'Haute Couture',
            'experience' => '10 ans',
            'localisation' => 'Paris, France',
        ]);
        $stylist->assignRole($stylistRole);
    }
}
