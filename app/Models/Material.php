<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Material extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'photos',
        'description'
    ];

    protected $casts = [
        'photos' => 'array'
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_material')
                    ->withPivot('price_per_square_meter')
                    ->withTimestamps();
    }
}
