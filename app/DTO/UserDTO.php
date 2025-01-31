<?php


namespace App\DTO;

class UserDTO
{
    public int $userId;
    public string $userName;
    public array $roles;

    public function __construct(int $userId, string $userName, array $roles)
    {
    $this->userId = $userId;
    $this->userName = $userName;
    $this->roles = $roles;
   }
}
