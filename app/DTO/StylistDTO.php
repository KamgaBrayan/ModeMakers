<?php

namespace App\DTO;

class StylistDTO
{
    public int $id;
    public array $roles;
    public string $name;
    public string $specialty;
    public array $photos;
    public string $biography;
    public array $calendar;
    public string $experience;
    public string $localisation;
    public string $phone;
    public array $category;

    public function __construct(
        int $id,
        array $roles,
        string $name,
        string $specialty,
        array $photos,
        string $biography,
        array $calendar,
        string $experience,
        string $localisation,
        string $phone,
        array $category
    ) {
        $this->id = $id;
        $this->roles = $roles;
        $this->name = $name;
        $this->specialty = $specialty;
        $this->photos = $photos;
        $this->biography = $biography;
        $this->calendar = $calendar;
        $this->experience = $experience;
        $this->localisation = $localisation;
        $this->phone = $phone;
        $this->category = $category;
    }

}
