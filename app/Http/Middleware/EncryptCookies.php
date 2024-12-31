<?php

namespace App\Http\Middleware;

use Illuminate\Cookie\Middleware\EncryptCookies as Middleware;

class EncryptCookies extends Middleware
{
    /**
     * Les cookies qui ne doivent pas être encryptés.
     *
     * @var array
     */
    protected $except = [
        // Ajoutez ici les cookies qui ne doivent pas être encryptés
    ];
}