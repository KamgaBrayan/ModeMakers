<?php

namespace App\DTO;

class UtilityDTO
{
    public string $name;
    public string $type;
    public array $photos;
    public float $pricePerSquareMeter;
    public int $quantity;

    public function __construct(
        string $name,
        string $type,
        array $photos,
        float $pricePerSquareMeter,
        int $quantity
    ) {
        $this->name = $name;
        $this->type = $type;
        $this->photos = $photos;
        $this->pricePerSquareMeter = $pricePerSquareMeter;
        $this->quantity = $quantity;
    }

}
