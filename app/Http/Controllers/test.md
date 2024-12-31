// database/migrations/[timestamp]_create_users_table.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('profil_picture')->nullable();
            $table->enum('roles', ['ROLE_USER', 'ROLE_STYLIST']);
            $table->json('photos')->nullable();
            $table->integer('note')->nullable();
            $table->text('bibliography')->nullable();
            $table->json('calendar')->nullable();
            $table->json('preferences_id')->nullable();
            $table->json('measures_id')->nullable();
            $table->string('specialty')->nullable();
            $table->string('experience')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
};

// app/Models/User.php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'profil_picture',
        'roles',
        'photos',
        'note',
        'bibliography',
        'calendar',
        'preferences_id',
        'measures_id',
        'specialty',
        'experience'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'photos' => 'array',
        'calendar' => 'array',
        'preferences_id' => 'array',
        'measures_id' => 'array',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}

// app/Http/Controllers/UserController.php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * List Users
     * 
     * @group User Management
     * 
     * @response 200 {
     *  "data": [{
     *      "id": 1,
     *      "name": "Gabriel Nomo",
     *      "email": "gabriel@example.com",
     *      "profil_picture": "profile1.jpg",
     *      "roles": ["ROLE_STYLIST"],
     *      "photos": ["photo1.jpg", "photo2.jpg"],
     *      "note": 5,
     *      "bibliography": "Some biography text.",
     *      "calendar": ["monday", "thursday","sunday"],
     *      "preferences_id": [1, 2],
     *      "measures_id": [101, 102],
     *      "specialty": "clothes",
     *      "experience": "5 years in stylism"
     *  }]
     * }
     * 
     * @response 401 {
     *  "error": {
     *      "code": 401,
     *      "message": "Unauthorized"
     *  }
     * }
     */
    public function index()
    {
        return response()->json(['data' => User::all()]);
    }

    /**
     * Get User
     * 
     * @group User Management
     * 
     * @urlParam id integer required The ID of the user.
     * 
     * @response 200 {
     *  "data": {
     *      "id": 1,
     *      "name": "Gabriel Nomo",
     *      "email": "gabriel@example.com",
     *      "profil_picture": "profile1.jpg",
     *      "roles": ["ROLE_STYLIST"],
     *      "photos": ["photo1.jpg", "photo2.jpg"],
     *      "note": 5,
     *      "bibliography": "Some biography text.",
     *      "calendar": ["monday", "thursday","sunday"],
     *      "preferences_id": [1, 2],
     *      "measures_id": [101, 102],
     *      "specialty": "clothes",
     *      "experience": "5 years in stylism"
     *  }
     * }
     * 
     * @response 404 {
     *  "error": {
     *      "code": 404,
     *      "message": "User not found"
     *  }
     * }
     */
    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json(['data' => $user]);
    }

    /**
     * Create User
     * 
     * @group User Management
     * 
     * @bodyParam name string required The name of the user.
     * @bodyParam email string required The email of the user.
     * @bodyParam password string required The password of the user.
     * @bodyParam roles string required The user role (ROLE_USER or ROLE_STYLIST).
     * @bodyParam photos array optional User's photos.
     * @bodyParam note integer optional User's rating.
     * @bodyParam bibliography string optional User's biography.
     * @bodyParam calendar array optional User's availability.
     * @bodyParam preferences_id array optional User's preferences IDs.
     * @bodyParam measures_id array optional User's measures IDs.
     * @bodyParam specialty string optional required for stylists.
     * @bodyParam experience string optional required for stylists.
     * 
     * @response 201 scenario="Created" {
     *  "data": {
     *      "id": 1,
     *      "name": "Gabriel Nomo",
     *      "email": "gabriel@example.com"
     *  }
     * }
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'roles' => 'required|in:ROLE_USER,ROLE_STYLIST',
            'photos' => 'nullable|array',
            'note' => 'nullable|integer',
            'bibliography' => 'nullable|string',
            'calendar' => 'nullable|array',
            'preferences_id' => 'nullable|array',
            'measures_id' => 'nullable|array',
            'specialty' => 'required_if:roles,ROLE_STYLIST',
            'experience' => 'required_if:roles,ROLE_STYLIST'
        ]);

        $user = User::create($validated);
        return response()->json(['data' => $user], 201);
    }

    /**
     * Update User
     * 
     * @group User Management
     * 
     * @urlParam id integer required The ID of the user.
     * [Similar bodyParam documentation as store method]
     * 
     * @response 200 {
     *  "data": {
     *      "id": 1,
     *      "name": "Gabriel Nomo Updated"
     *  }
     * }
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $validated = $request->validate([
            'name' => 'sometimes|string',
            'email' => 'sometimes|email|unique:users,email,'.$id,
            'password' => 'sometimes|min:6',
            'roles' => 'sometimes|in:ROLE_USER,ROLE_STYLIST',
            'photos' => 'nullable|array',
            'note' => 'nullable|integer',
            'bibliography' => 'nullable|string',
            'calendar' => 'nullable|array',
            'preferences_id' => 'nullable|array',
            'measures_id' => 'nullable|array',
            'specialty' => 'required_if:roles,ROLE_STYLIST',
            'experience' => 'required_if:roles,ROLE_STYLIST'
        ]);

        $user->update($validated);
        return response()->json(['data' => $user]);
    }

    /**
     * Delete User
     * 
     * @group User Management
     * 
     * @urlParam id integer required The ID of the user.
     * 
     * @response 200 {
     *  "message": "User successfully deleted"
     * }
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User successfully deleted']);
    }

    /**
     * Upload Profile Picture
     * 
     * @group User Management
     * 
     * @bodyParam profile_picture file required The profile picture to upload.
     * 
     * @response 200 {
     *  "message": "Profile picture updated successfully",
     *  "profile_picture_url": "profile1.jpg"
     * }
     */
    public function uploadProfilePicture(Request $request)
    {
        $request->validate([
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg|max:5120'
        ]);

        if ($request->hasFile('profile_picture')) {
            $path = $request->file('profile_picture')->store('profile_pictures', 'public');
            
            $user = auth()->user();
            if ($user->profil_picture) {
                Storage::disk('public')->delete($user->profil_picture);
            }
            
            $user->profil_picture = $path;
            $user->save();

            return response()->json([
                'message' => 'Profile picture updated successfully',
                'profile_picture_url' => Storage::url($path)
            ]);
        }

        return response()->json(['error' => 'No file uploaded'], 400);
    }
}