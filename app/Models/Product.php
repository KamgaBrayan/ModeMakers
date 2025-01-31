<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'gender', 'age', 'note', 'category', 'photos', 'disponibilite',
        'mean_evalue', 'description', 'price', 'duree', 'couleur', 'stylist_id'
    ];

    protected $casts = [
        'photos' => 'array',
    ];

    public function stylist()
    {
        return $this->belongsTo(User::class, 'stylist_id');
    }

    public function materials()
    {
        return $this->belongsToMany(Material::class, 'product_material')
                    ->withPivot('price_per_square_metter')
                    ->withTimestamps();
    }
}
