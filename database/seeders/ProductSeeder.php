<?php

namespace Database\Seeders;

<<<<<<< HEAD
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
=======
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\User;
use App\Models\Material;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // Récupérer un styliste
        $stylist = User::where('role', 'ROLE_STYLIST')->first();
        
        // Récupérer tous les matériaux
        $materials = Material::all();

        if (!$stylist || $materials->isEmpty()) {
            return;
        }

        $products = [
            [
                'name' => 'Elegant Summer Dress',
                'gender' => 'Female',
                'age' => 'Adult',
                'note' => 4.5,
                'category' => 'Women',
                'photos' => json_encode([
                    'assets/images/products/dress1.jpg',
                    'assets/images/products/dress2.jpg',
                    'assets/images/products/dress3.jpg',
                    'assets/images/products/dress4.jpg'
                ]),
                'disponibilite' => true,
                'mean_evalue' => 4.5,
                'description' => 'Beautiful floral summer dress perfect for any occasion',
                'price' => 150000,
                'duree' => '14 days',
                'couleur' => 'Blue',
                'stylist_id' => $stylist->id,
                'materials' => [
                    ['id' => $materials[0]->id, 'price_per_square_metter' => 1000],
                    ['id' => $materials[1]->id, 'price_per_square_metter' => 1200]
                ]
            ],
            [
                'name' => 'Classic Men\'s Suit',
                'gender' => 'Male',
                'age' => 'Adult',
                'note' => 4.8,
                'category' => 'Men',
                'photos' => json_encode([
                    'assets/images/products/suit1.jpg',
                    'assets/images/products/suit2.jpg',
                    'assets/images/products/suit3.jpg'
                ]),
                'disponibilite' => true,
                'mean_evalue' => 4.8,
                'description' => 'Elegant classic suit perfect for formal occasions',
                'price' => 250000,
                'duree' => '21 days',
                'couleur' => 'Black',
                'stylist_id' => $stylist->id,
                'materials' => [
                    ['id' => $materials[2]->id, 'price_per_square_metter' => 1500],
                    ['id' => $materials[3]->id, 'price_per_square_metter' => 1800]
                ]
            ],
            [
                'name' => 'Kids Party Dress',
                'gender' => 'Female',
                'age' => 'Child',
                'note' => 4.3,
                'category' => 'Children',
                'photos' => json_encode([
                    'assets/images/products/kidsdress1.jpg',
                    'assets/images/products/kidsdress2.jpg'
                ]),
                'disponibilite' => true,
                'mean_evalue' => 4.3,
                'description' => 'Adorable party dress for little princesses',
                'price' => 75000,
                'duree' => '10 days',
                'couleur' => 'Pink',
                'stylist_id' => $stylist->id,
                'materials' => [
                    ['id' => $materials[0]->id, 'price_per_square_metter' => 800],
                    ['id' => $materials[1]->id, 'price_per_square_metter' => 900]
                ]
            ]
        ];

        foreach ($products as $productData) {
            $materials = $productData['materials'];
            unset($productData['materials']);
            
            $product = Product::create($productData);
            
            // Attacher les matériaux avec leurs prix
            foreach ($materials as $material) {
                $product->materials()->attach($material['id'], [
                    'price_per_square_metter' => $material['price_per_square_metter']
                ]);
            }
>>>>>>> 3e178013eabe79748d3f6935c6713eae0666bb53
        }
    }
}
