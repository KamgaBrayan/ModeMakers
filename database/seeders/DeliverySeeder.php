<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Delivery;

class DeliverySeeder extends Seeder
{
    public function run()
    {
        $deliveries = [
            [
                'day' => 14,
                'price' => 15000,
                'type' => 'standard'
            ],
            [
                'day' => 7,
                'price' => 25000,
                'type' => 'advanced'
            ],
            [
                'day' => 3,
                'price' => 35000,
                'type' => 'express'
            ]
        ];

        foreach ($deliveries as $delivery) {
            Delivery::create($delivery);
        }
    }
}
