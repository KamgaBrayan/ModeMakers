<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    /**
     * Authenticates a user and provides an access token.
     * 
     * @group Authentication
     * 
     * @bodyParam email string required The user's email address. Example: gabriel@example.com
     * @bodyParam password string required The user's password. Example: password123
     * 
     * @response 200 {
     *  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     *  "token_type": "bearer",
     *  "expires_in": 3600
     * }
     * 
     * @response 401 {
     *  "error": "Invalid credentials"
     * }
     * 
     * @response 500 {
     *  "error": "Could not create token"
     * }
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }

        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60, 
        ]);
    }

    /**
     * Registers a new user and provides a JWT token upon success.
     * 
     * @group Authentication
     * 
     * @bodyParam name string required The user's full name. Example: gabriel
     * @bodyParam email string required The user's email address. Example: gabriel@example.com
     * @bodyParam password string required The user's password. Example: password123
     * @bodyParam password_confirmation string required The user's password confirmation. Example: password123
     * 
     * @response 201 {
     *  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     *  "token_type": "bearer",
     *  "expires_in": 3600,
     *  "user": {
     *      "id": 1,
     *      "name": "gabriel",
     *      "email": "gabriel@example.com"
     *  }
     * }
     * 
     * @response 400 {
     *  "error": "Validation error",
     *  "details": {
     *      "email": "The email field is required."
     *  }
     * }
     * 
     * @response 500 {
     *  "error": "An unexpected error occurred. Please try again later."
     * }
     */
    public function register(Request $request)
    {
        try {
            // Validation
            $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6',
            ]);
    
            // Création de l'utilisateur
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
    
            // Création du token
            try {
                $token = JWTAuth::fromUser($user);
            } catch (JWTException $e) {
                return response()->json([
                    'message' => 'Could not create token',
                    'error' => $e->getMessage()
                ], 500);
            }
    
            // Réponse
            return response()->json([
                'user' => $user,
                'token' => $token,
                'token_type' => 'bearer',
                'expires_in' => JWTAuth::factory()->getTTL() * 60,
            ], 201);
    
        } catch (\Exception $e) {
            // En cas d'erreur, on supprime l'utilisateur créé
            if (isset($user)) {
                $user->delete();
            }
            
            return response()->json([
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Fetches the profile of the authenticated user.
     * 
     * @group Authentication
     * 
     * @response 200 {
     *  "id": 1,
     *  "name": "gabriel",
     *  "email": "gabriel@example.com",
     *  "profile_picture_url": "http://localhost/storage/profile_pictures/gabriel.jpg"
     * }
     * 
     * @response 401 {
     *  "error": "Token expired"
     * }
     * 
     * @response 404 {
     *  "error": "User not found"
     * }
     */
    public function profile()
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['error' => 'User not found'], 404);
            }
            return response()->json([
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'profile_picture_url' => $user->profile_picture ? Storage::url($user->profile_picture) : null,
            ]);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['error' => 'Token expired'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['error' => 'Token invalid'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'Token absent'], 401);
        }
    }

    /**
     * Logs out the authenticated user by invalidating their access token.
     * 
     * @group Authentication
     * 
     * @response 200 {
     *  "message": "Successfully logged out."
     * }
     * 
     * @response 401 {
     *  "error": "Invalid or missing token."
     * }
     */
    public function logout()
    {
        try {
            $token = JWTAuth::getToken();
            if ($token) {
                JWTAuth::invalidate($token);
                return response()->json(['message' => 'Successfully logged out']);
            }
            return response()->json(['error' => 'Token not provided'], 401);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Failed to logout'], 500);
        }
    }
}
