<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'gender', 'age', 'note', 'category', 'photos', 'disponibilite',
        'mean_evalue', 'description', 'price', 'price_per_square_metter',
        'duree', 'couleur', 'stylist_id', 'material_id'
    ];

    protected $casts = [
        'photos' => 'array',
    ];

    public function stylist()
    {
        return $this->belongsTo(User::class);
    }

    public function material()
    {
        return $this->belongsTo(Material::class);
    }
}
