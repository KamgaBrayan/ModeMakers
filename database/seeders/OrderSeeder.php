<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userIds = User::pluck('id')->toArray();
        $stylistIds = User::pluck('id')->toArray();

        for ($i = 0; $i < 10; $i++) {
            Order::create([
                'user_id' => $userIds[array_rand($userIds)],
                'stylist_id' => $stylistIds[array_rand($userIds)],
                'order_date' => now(),
                'status' => ['pending', 'completed', 'cancelled'][array_rand(['pending', 'completed', 'cancelled'])],
                'total_cost' => rand(20, 1000) + rand(0, 99) / 100,
                'payment_method' => ['credit_card', 'paypal', 'bank_transfer'][array_rand(['credit_card', 'paypal', 'bank_transfer'])],
                'time_limit' => now()->addDays(rand(1, 30)),
            ]);
        }
    }
}
