<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Authenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  ...$guards
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$guards)
    {
        if (empty($guards)) {
            $guards = ['api']; // Utilisez 'api' comme guard par défaut pour JWT
        }

        // Si l'utilisateur n'est pas authentifié avec le guard spécifié
        if (Auth::guard($guards)->guest()) {
            return response()->json(['message' => 'Unauthorized'], 401); // Réponse 401 pour les utilisateurs non authentifiés
        }

        return $next($request);
    }
}
