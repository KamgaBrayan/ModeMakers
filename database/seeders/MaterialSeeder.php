<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Material;

class MaterialSeeder extends Seeder
{
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
        }
    }
}
