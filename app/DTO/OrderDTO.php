<?php

namespace App\DTO;

use App\Models\Payment;

class OrderDTO
{
    public int $id;
    public PaymentDTO $payment;
    public array $photos;
    public array $utils;
    public string $createdAt;
    public string $updatedAt;
    public int $day;
    public float $workforce;
    public array $meseaure;
    public UserDTO $user;
    public string $gender;
    public string $location;
    public string $specification;
    public string $status;
    public StylistDTO $stylist;

    public function __construct(
        int $id,
        PaymentDTO $payment,
        array $photos,
        array $utils,
        string $createdAt,
        string $updatedAt,
        int $day,
        float $workforce,
        array $meseaure,
        UserDTO $user,
        string $gender,
        string $location,
        string $specification,
        string $status,
        StylistDTO $stylist
    ) {
        $this->id = $id;
        $this->payment = $payment;
        $this->photos = $photos;
        $this->utils = $utils;
        $this->createdAt = $createdAt;
        $this->updatedAt = $updatedAt;
        $this->day = $day;
        $this->workforce = $workforce;
        $this->meseaure = $meseaure;
        $this->user = $user;
        $this->gender = $gender;
        $this->location = $location;
        $this->specification = $specification;
        $this->status = $status;
        $this->stylist = $stylist;
    }

}
