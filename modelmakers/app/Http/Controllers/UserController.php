<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


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
    
}
