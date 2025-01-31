<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'pre_order_id',
        'amount',
        'currency',
        'payment_intent_id',
        'client_secret',
        'status'
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function preOrder()
    {
        return $this->belongsTo(Order::class, 'pre_order_id');
    }

    public function user()
    {
        return $this->hasOneThrough(
            User::class,
            Order::class,
            'id', // Clé étrangère sur orders
            'id', // Clé primaire sur users
            'pre_order_id', // Clé locale sur payments
            'user_id' // Clé étrangère sur orders
        );
    }
}
