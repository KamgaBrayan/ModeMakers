<?php

namespace App\DTO;

class PaymentDTO
{
    public int $id;
    public string $paymentMethod;
    public float $account;
    public string $createdAt;
    public string $status;

    /*public function __construct(int $id, string $paymentMethod, float $account, string $createdAt, string $status)
    {
        $this->id = $id;
        $this->paymentMethod = $paymentMethod;
        $this->account = $account;
        $this->createdAt = $createdAt;
        $this->status = $status;
    }*/

    public function __construct()
    {
        $this->id = 0;
        $this->paymentMethod = '';
        $this->account = 0.0;
        $this->createdAt = '';
        $this->status = '';
    }

    // Getter pour id
    public function getId(): int
    {
        return $this->id;
    }

    // Setter pour id
    public function setId(int $id): void
    {
        $this->id = $id;
    }

    // Getter pour paymentMethod
    public function getPaymentMethod(): string
    {
        return $this->paymentMethod;
    }

    // Setter pour paymentMethod
    public function setPaymentMethod(string $paymentMethod): void
    {
        $this->paymentMethod = $paymentMethod;
    }

    // Getter pour account
    public function getAccount(): float
    {
        return $this->account;
    }

    // Setter pour account
    public function setAccount(float $account): void
    {
        $this->account = $account;
    }

    // Getter pour createdAt
    public function getCreatedAt(): string
    {
        return $this->createdAt;
    }

    // Setter pour createdAt
    public function setCreatedAt(string $createdAt): void
    {
        $this->createdAt = $createdAt;
    }

    // Getter pour status
    public function getStatus(): string
    {
        return $this->status;
    }

    // Setter pour status
    public function setStatus(string $status): void
    {
        $this->status = $status;
    }
}

