voici le contenu de ls migration:
"<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('role')->default('ROLE_USER');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('profil_picture')->nullable();
            $table->string('phone')->nullable();
            $table->json('photos')->nullable();
            $table->integer('note')->nullable();
            $table->text('bibliography')->nullable();
            $table->json('calendar')->nullable();
            $table->string('specialty')->nullable();
            $table->string('experience')->nullable();
            $table->string('localisation')->nullable();
            $table->json('preferences_id')->nullable();
            $table->json('measures_id')->nullable();
            
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }
    
    
    
    
    
    
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
"

du modele:
"<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'profil_picture',
        'role',
        'photos',
        'note',
        'bibliography',
        'calendar',
        'preferences_id',
        'measures_id',
        'specialty',
        'experience',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'photos' => 'array',
            'calendar' => 'array',
            'preferences_id' => 'array',
            'measures_id' => 'array',
        ];
    }

    /**
     * Get the identifier that will be stored in the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key-value array, containing any custom claims to be added to the JWT.
     *
     * @return array<string, mixed>
     */
    public function getJWTCustomClaims(): array
    {
        return [];
    }
}
"

controlleur:
"<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Tymon\JWTAuth\Facades\JWTAuth;
class UserController extends Controller
{
    /**
     * List Users
     * 
     * @group User Management
     * 
     * @response 200 {
     *  [{
     *      "id": 1,
     *      "name": "Gabriel Nomo",
     *      "email": "gabriel@example.com",
     *      "profil_picture": "profile1.jpg",
     *      "role": ["ROLE_STYLIST"],
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
        return response()->json(User::all());
    }

    /**
     * Get User
     * 
     * @group User Management
     * 
     * @urlParam id integer required The ID of the user.
     * 
     * @response 200 {
     *  {
     *      "id": 1,
     *      "name": "Gabriel Nomo",
     *      "email": "gabriel@example.com",
     *      "profil_picture": "profile1.jpg",
     *      "role": ["ROLE_STYLIST"],
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
        return response()->json( $user);
    }

    /**
     * Create User
     * 
     * @group User Management
     * 
     * @bodyParam name string required The name of the user.
     * @bodyParam email string required The email of the user.
     * @bodyParam password string required The password of the user.
     * @bodyParam role string required The user role (ROLE_USER or ROLE_STYLIST).
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
     *  {
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
            // 'role' => 'required|in:ROLE_USER,ROLE_STYLIST',
            'photos' => 'nullable|array',
            'note' => 'nullable|integer',
            'bibliography' => 'nullable|string',
            'calendar' => 'nullable|array',
            'preferences_id' => 'nullable|array',
            'measures_id' => 'nullable|array',
            // 'specialty' => 'required_if:role,ROLE_STYLIST',
            // 'experience' => 'required_if:role,ROLE_STYLIST'
        ]);

        $user = User::create($validated);
        return response()->json($user, 201);
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
     *   {
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
            // 'role' => 'sometimes|in:ROLE_USER,ROLE_STYLIST',
            'photos' => 'nullable|array',
            'note' => 'nullable|integer',
            'bibliography' => 'nullable|string',
            'calendar' => 'nullable|array',
            'preferences_id' => 'nullable|array',
            'measures_id' => 'nullable|array',
            // 'specialty' => 'required_if:role,ROLE_STYLIST',
            // 'experience' => 'required_if:role,ROLE_STYLIST'
        ]);

        $user->update($validated);
        return response()->json($user);
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
    public function uploadProfilePicture(Request $request,int $id)
    {
        $request->validate([
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg|max:5120'
        ]);

        if ($request->hasFile('profile_picture')) {

            $user = User::findOrFail($id);

            if(!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

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
            'message' => 'Profile picture updated successfully',
            'profile_picture_url' => Storage::url($path),
        ]);
     }

        return response()->json(['error' => 'No file uploaded'], 400);
    }
    
}"

kernel.php:
"<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * These middleware are run during every request to your application.
     *
     * @var array
     */
    protected $middleware = [
        // ... autres middlewares globaux ...
    ];

    /**
     * The application's route middleware groups.
     *
     * @var array
     */
    protected $middlewareGroups = [
        'web' => [
            \App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        'api' => [
            \Illuminate\Routing\Middleware\ThrottleRequests::class.':api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
    ];

    /**
     * The application's route middleware.
     *
     * These middleware may be assigned to groups or used individually.
     *
     * @var array
     */
    protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
        'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class,
        'can' => \Illuminate\Auth\Middleware\Authorize::class,
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'password.confirm' => \Illuminate\Auth\Middleware\RequirePassword::class,
        'signed' => \Illuminate\Routing\Middleware\ValidateSignature::class,
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
        'role' => \App\Http\Middleware\RoleMiddleware::class,
    ];
}
"

le middleware:

"<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $role)
    {
        if (!Auth::check() || Auth::user()->role !== $role) {
            abort(403, 'Accès non autorisé');
        }
        return $next($request);
    }
}"

api.php:
"<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SendEmailController;
use App\Http\Controllers\StripeTestController;
use App\Http\Controllers\MeasureController;
use App\Http\Controllers\PreferenceController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;

Route::get('/test-role', function () {
    return 'Middleware role fonctionne !';
});

// Authentication Routes
Route::post('auth/register', [AuthController::class, 'register']);
Route::post('auth/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::get('auth/profile', [AuthController::class, 'profile']);

    // Email and Stripe Payment Routes
    Route::post('/sendEmail', [SendEmailController::class, 'sendEmail']);
    Route::get('/test-stripe', [StripeTestController::class, 'testStripe']);
    Route::post('/create-payment', [StripeTestController::class, 'createPayment']);

    // User Management Routes
    Route::prefix('user')->group(function () {

        Route::middleware(['auth:api', 'role:ROLE_STYLIST'])->group(function () {
            Route::get('/', [UserController::class, 'index']);
        });
        
        Route::get('/{id}', [UserController::class, 'show']);
        Route::post('/', [UserController::class, 'store']);
        Route::put('/{id}', [UserController::class, 'update']);
        Route::delete('/{id}', [UserController::class, 'destroy']);
        Route::post('/{id}/profile-picture', [UserController::class, 'uploadProfilePicture']);
    });

    // Measure Routes
    Route::prefix('measure')->group(function () {
        Route::get('/', [MeasureController::class, 'index']);
        Route::get('/{id}', [MeasureController::class, 'show']);
        Route::post('/', [MeasureController::class, 'store']);
        Route::put('/{id}', [MeasureController::class, 'update']);
        Route::delete('/{id}', [MeasureController::class, 'destroy']);
    });

    // Preference Routes
    Route::prefix('preference')->group(function () {
        Route::get('/', [PreferenceController::class, 'index']);
        Route::get('/{id}', [PreferenceController::class, 'show']);
        Route::post('/', [PreferenceController::class, 'store']);
        Route::put('/{id}', [PreferenceController::class, 'update']);
        Route::delete('/{id}', [PreferenceController::class, 'destroy']);
    });
        // Notification Routes
    Route::prefix('notification')->middleware('auth:api')->group(function () {
        Route::get('/', [NotificationController::class, 'index']);
        Route::get('/{id}', [NotificationController::class, 'show']);
        Route::post('/', [NotificationController::class, 'store']);
        Route::put('/{id}', [NotificationController::class, 'update']);
        Route::delete('/{id}', [NotificationController::class, 'destroy']);
    });

    // Material Routes
    Route::prefix('materials')->group(function () {
        Route::get('/', [MaterialController::class, 'index']);
        Route::get('/{id}', [MaterialController::class, 'show']);
        Route::post('/', [MaterialController::class, 'store']);
        Route::put('/{id}', [MaterialController::class, 'update']);
        Route::delete('/{id}', [MaterialController::class, 'destroy']);
    });

    // Product Routes
    Route::prefix('products')->group(function () {
        Route::get('/', [ProductController::class, 'index'])->name('products.index');
        Route::get('/{id}', [ProductController::class, 'show'])->name('products.show');
        Route::post('/', [ProductController::class, 'store'])->name('products.store');
        Route::put('/{id}', [ProductController::class, 'update'])->name('products.update');
        Route::delete('/{id}', [ProductController::class, 'destroy'])->name('products.destroy');
    });




    // Review Routes
    Route::prefix('review')->group(function () {
        Route::get('/', [ReviewController::class, 'index'])->name('review.index');
        Route::get('/{id}', [ReviewController::class, 'show'])->name('review.show');
        Route::post('/', [ReviewController::class, 'store'])->name('review.store');
        Route::put('/{id}', [ReviewController::class, 'update'])->name('review.update');
        Route::delete('/{id}', [ReviewController::class, 'destroy'])->name('review.destroy');
    });

    //Orders routes
    Route::prefix('order')->group(function () {
        Route::get('/', [OrderController::class, 'index']); 
        Route::get('/{id}', [OrderController::class, 'show']); 
        Route::post('/', [OrderController::class, 'store']); 
        Route::put('/{id}', [OrderController::class, 'update']); 
        Route::delete('/{id}', [OrderController::class, 'destroy']); 
    });

    // Payments routes
    Route::prefix('payment')->group(function () {
        Route::get('/', [PaymentController::class, 'index']);  
        Route::get('/{id}', [PaymentController::class, 'show']);  
        Route::post('/', [PaymentController::class, 'store']);  
        Route::put('/{id}', [PaymentController::class, 'update']);  
        Route::delete('/{id}', [PaymentController::class, 'destroy']);  
    });

    

});

"

voici toute les ressources pour resourdre ce probleme.