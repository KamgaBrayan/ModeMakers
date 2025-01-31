<?php

namespace Database\Seeders;

<<<<<<< HEAD
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
=======
>>>>>>> 3e178013eabe79748d3f6935c6713eae0666bb53
use Illuminate\Database\Seeder;
use App\Models\Material;

class MaterialSeeder extends Seeder
{
<<<<<<< HEAD
    /**
     * Run the database seeds.
     */
    public function run(): void
    {


        for ($i = 0; $i < 10; $i++) {
            Material::create([
                'name' => "un nom",
                'description' => "description test",
                'price_per_square_meter' => "500",
                'color' => "red",
            ]);
=======
    public function run()
    {
        $materials = [
            [
                'name' => 'Satin',
                'type' => 'coton',
                'photos' => json_encode([
                    'assets/images/materials/satin1.jpg',
                    'assets/images/materials/satin2.jpg'
                ]),
                'description' => 'Un tissu soyeux et brillant parfait pour les robes de soirée',
                'color' => 'Blanc'
            ],
            [
                'name' => 'Microfiber',
                'type' => 'tissu',
                'photos' => json_encode([
                    'assets/images/materials/microfiber1.jpg',
                    'assets/images/materials/microfiber2.jpg'
                ]),
                'description' => 'Tissu léger et respirant idéal pour les vêtements de sport',
                'color' => 'Noir'
            ],
            [
                'name' => 'Polyester',
                'type' => 'silk',
                'photos' => json_encode([
                    'assets/images/materials/polyester1.jpg',
                    'assets/images/materials/polyester2.jpg'
                ]),
                'description' => 'Tissu durable et facile d\'entretien',
                'color' => 'Bleu'
            ],
            [
                'name' => 'Cotton',
                'type' => 'coton',
                'photos' => json_encode([
                    'assets/images/materials/cotton1.jpg',
                    'assets/images/materials/cotton2.jpg'
                ]),
                'description' => 'Tissu naturel respirant et confortable',
                'color' => 'Blanc'
            ]
        ];

        foreach ($materials as $material) {
            Material::create($material);
>>>>>>> 3e178013eabe79748d3f6935c6713eae0666bb53
        }
    }
}
