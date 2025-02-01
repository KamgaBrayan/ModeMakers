<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Tymon\JWTAuth\Facades\JWTAuth;

class StylistController extends Controller
{
    /**
     * List Stylists
     *
     * @group Stylist Management
     *
     * @response 200 {
     *  [{
     *      "id": 1,
     *      "name": "Gabriel Nomo",
     *      "email": "gabriel@example.com",
     *      "profil_picture": "profile1.jpg",
     *      "role": ["ROLE_USER", "ROLE_STYLIST"],
     *      "photos": ["photo1.jpg", "photo2.jpg"],
     *      "note": 5,
     *      "bibliography": "Some biography text.",
     *      "calendar": ["monday", "thursday", "sunday"],
     *      "preferences_id": [1, 2],
     *      "measures_id": [101, 102],
     *      "specialty": "Hair Stylist",  
     *      "experience": "5 years of experience in hairstyling."
     *  }]
     * }
     */
    public function index()
    {
        $stylists = User::role('ROLE_STYLIST')->get();

        return response()->json($stylists);
    }

    /**
     * Get Stylist
     *
     * @group Stylist Management
     *
     * @urlParam id integer required The ID of the stylist.
     *
     * @response 200 {
     *  {
     *      "id": 1,
     *      "name": "Gabriel Nomo",
     *      "email": "gabriel@example.com",
     *      "profil_picture": "profile1.jpg",
     *      "role": ["ROLE_USER", "ROLE_STYLIST"],
     *      "photos": ["photo1.jpg", "photo2.jpg"],
     *      "note": 5,
     *      "bibliography": "Some biography text.",
     *      "calendar": ["monday", "thursday", "sunday"],
     *      "preferences_id": [1, 2],
     *      "measures_id": [101, 102],
     *      "specialty": "Hair Stylist",  
     *      "experience": "5 years of experience in hairstyling."
     *  }
     * }
     */
    public function show($id)
    {
        $stylist = User::findOrFail($id);

        // Verifier que l'utilisateur est un styliste
        if ($stylist->hasRole('ROLE_STYLIST')) {
            return response()->json($stylist);
        }

        return response()->json(['error' => 'Stylist not found'], 404);
    }

    /**
     * Create Stylist
     *
     * @group Stylist Management
     *
     * @bodyParam name string required The name of the stylist.
     * @bodyParam email string required The email of the stylist.
     * @bodyParam password string required The password of the stylist.
     * @bodyParam photos array optional Stylist's photos.
     * @bodyParam note integer optional Stylist's rating.
     * @bodyParam bibliography string optional Stylist's biography.
     * @bodyParam calendar array optional Stylist's availability.
     * @bodyParam preferences_id array optional Stylist's preferences IDs.
     * @bodyParam measures_id array optional Stylist's measures IDs.
     * @bodyParam specialty string required Stylist's specialty (e.g., Hair Stylist).
     * @bodyParam experience string required Stylist's experience (e.g., 5 years of experience).
     *
     * @response 201 {
     *  {
     *      "id": 1,
     *      "name": "Gabriel Nomo",
     *      "email": "gabriel@example.com",
     *      "photos": ["photo1.jpg", "photo2.jpg"],
     *      "note": 5,
     *      "bibliography": "Some biography text.",
     *      "calendar": ["monday", "thursday", "sunday"],
     *      "preferences_id": [1, 2],
     *      "measures_id": [101, 102],
     *      "specialty": "Hair Stylist",  
     *      "experience": "5 years of experience in hairstyling."
     *  }
     * }
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'photos' => 'nullable|array',
            'photos.*' => 'image|mimes:jpeg,png,jpg|max:5120',  
            'note' => 'nullable|integer',
            'bibliography' => 'nullable|string',
            'calendar' => 'nullable|array',
            'preferences_id' => 'nullable|array',
            'measures_id' => 'nullable|array',
            'specialty' => 'required|string',
            'experience' => 'required|string',
        ]);

        // Créer le styliste
        $stylist = User::create($validated);

        // Assigner le rôle
        $stylist->assignRole('ROLE_STYLIST');

        // Gérer l'upload des photos
        if ($request->hasFile('photos')) {
            $photos = [];
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('stylist_photos', 'public');
                $photos[] = $path;
            }
            $stylist->photos = $photos;
            $stylist->save();
        }

        return response()->json($stylist, 201);
    }

    /**
     * Update Stylist
     *
     * @group Stylist Management
     *
     * @urlParam id integer required The ID of the stylist.
     * @bodyParam name string optional The name of the stylist.
     * @bodyParam email string optional The email of the stylist.
     * @bodyParam password string optional The password of the stylist.
     * @bodyParam photos array optional Stylist's photos.
     * @bodyParam note integer optional Stylist's rating.
     * @bodyParam bibliography string optional Stylist's biography.
     * @bodyParam calendar array optional Stylist's availability.
     * @bodyParam preferences_id array optional Stylist's preferences IDs.
     * @bodyParam measures_id array optional Stylist's measures IDs.
     * @bodyParam specialty string optional Stylist's specialty.
     * @bodyParam experience string optional Stylist's experience.
     *
     * @response 200 {
     *  {
     *      "id": 1,
     *      "name": "Gabriel Nomo",
     *      "email": "gabriel@example.com",
     *      "role": ["ROLE_USER", "ROLE_STYLIST"],
     *      "photos": ["photo1.jpg", "photo2.jpg"],
     *      "note": 5,
     *      "bibliography": "Some biography text.",
     *      "calendar": ["monday", "thursday", "sunday"],
     *      "preferences_id": [1, 2],
     *      "measures_id": [101, 102],
     *      "specialty": "Hair Stylist",  
     *      "experience": "5 years of experience in hairstyling."
     *  }
     * }
     */
    public function update(Request $request, $id)
    {
        $stylist = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'password' => 'sometimes|min:6',
            'photos' => 'nullable|array',
            'photos.*' => 'image|mimes:jpeg,png,jpg|max:5120',
            'note' => 'nullable|integer',
            'bibliography' => 'nullable|string',
            'calendar' => 'nullable|array',
            'preferences_id' => 'nullable|array',
            'measures_id' => 'nullable|array',
            'specialty' => 'nullable|string',
            'experience' => 'nullable|string',
        ]);

        // Mettre à jour le styliste
        $stylist->update($validated);

        // Mettre à jour les photos si elles sont présentes
        if ($request->hasFile('photos')) {
            foreach ($stylist->photos as $oldPhoto) {
                Storage::disk('public')->delete($oldPhoto);
            }

            $photos = [];
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('stylist_photos', 'public');
                $photos[] = $path;
            }
            $stylist->photos = $photos;
            $stylist->save();
        }

        return response()->json($stylist);
    }

    /**
     * Delete Stylist
     *
     * @group Stylist Management
     *
     * @urlParam id integer required The ID of the stylist.
     *
     * @response 204 {
     *  "message": "Stylist deleted successfully."
     * }
     */
    public function destroy($id)
    {
        $stylist = User::findOrFail($id);
        $stylist->delete();

        return response()->json(['message' => 'Stylist deleted successfully.'], 204);
    }
}
