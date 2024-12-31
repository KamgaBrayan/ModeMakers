<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    //recuprer tout les utilisateurs
    public function index() {
        $users = User::all();
        return response()->json($users);
    }

    // recuperer un utilisateur
    public function show($id) {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        return response()->json($user);
    }

    //ajouter un utilisateur
    public function store(Request $request) {
        $user = User::create($request->all());
        return response()->json($user);
    }

    // modifier un utilisateur
    public function update(Request $request, $id) {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        $user->update($request->all());
        return response()->json($user);
    }

    // supprimer un utilisateur
    public function destroy($id) {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
    
    public function uploadProfilePicture(Request $request)
    {
        // Valider le fichier
        $request->validate([
            'profile_picture' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $user = JWTAuth::user();

        // Supprimer l'ancienne photo si elle existe
        if ($user->profile_picture) {
            Storage::disk('public')->delete($user->profile_picture);
        }

        // Sauvegarder la nouvelle photo
        $path = $request->file('profile_picture')->store('profile_pictures', 'public');

        // Mettre à jour le chemin dans la base de données
        $user->profile_picture = $path;
        $user->save();

        return response()->json([
            'message' => 'Photo de profil mise à jour avec succès.',
            'profile_picture_url' => Storage::url($path),
        ]);
    }
}
