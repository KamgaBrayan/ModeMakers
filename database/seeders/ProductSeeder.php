<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Exécute le seeder.
     */
    public function run()
    {
        // Nombre de produits à créer
        $numberOfProducts = 10;

        // Boucle pour créer plusieurs produits
        for ($i = 1; $i <= $numberOfProducts; $i++) {
            Product::create([
                'name' => 'Product ' . $i,
                'gender' => $i % 2 === 0 ? 'Male' : 'Female', // Alterne entre Male et Female
                'age' => rand(18, 60) . ' years', // Âge aléatoire entre 18 et 60
                'category' => 'Category ' . rand(1, 5), // Catégorie aléatoire
                'photos' => json_encode(['photo1.jpg', 'photo2.jpg']), // Tableau de photos
                'description' => 'This is a description for Product ' . $i,
                'price' => rand(10, 1000), // Prix aléatoire entre 10 et 1000
                'stylist_id' => 2, // ID de styliste aléatoire (assurez-vous que ces IDs existent)
                'material_id' => 2, // ID de matériau aléatoire (assurez-vous que ces IDs existent)
            ]);
        }
    }
}
