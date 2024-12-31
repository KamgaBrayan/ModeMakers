<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'commandId',
        'payment_cost',
        'payment_date',
        'payment_method',
        'status',
    ];

    protected $dates = ['payment_date'];

    public function command()
    {
        return $this->belongsTo(Order::class);
    }
}
