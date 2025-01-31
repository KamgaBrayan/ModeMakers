<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

//        User::factory()->create([

        /*User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);


        $this->call([
            UserSeeder::class,
        ]);*/

        // Utilisateur avec le rôle ROLE_USER
        User::create([
            'name' => 'User Test',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'roles' => 'ROLE_USER',
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
            'roles' => 'ROLE_STYLIST',
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

        $this->call(MaterialSeeder::class);
        $this->call(DeliverySeeder::class);
        $this->call(ProductSeeder::class);
        
    }
}
