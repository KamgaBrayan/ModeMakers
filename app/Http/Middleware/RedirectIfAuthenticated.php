<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $guard = null)
    {
        // Vérifier si l'utilisateur est déjà authentifié
        if (Auth::guard($guard)->check()) {
            return redirect('/home'); // Rediriger l'utilisateur vers la page d'accueil ou une autre page
        }

        return $next($request);
    }
}
