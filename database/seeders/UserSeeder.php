<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Utilisateur avec le rôle ROLE_USER
        User::create([
            'name' => 'User Test',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'role' => 'ROLE_USER',
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

        // Utilisateur avec le rôle ROLE_STYLIST
        User::create([
            'name' => 'Stylist Test',
            'email' => 'stylist@example.com',
            'password' => Hash::make('password'),
            'role' => 'ROLE_STYLIST',
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
    }
}
