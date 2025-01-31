<?php

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
use App\Http\Controllers\StripePaymentController;


// Authentication Routes
Route::post('auth/register', [AuthController::class, 'register']);
Route::post('auth/login', [AuthController::class, 'login']);

// Public Product Routes
Route::get('product', [ProductController::class, 'index']);
Route::get('product/{id}', [ProductController::class, 'show']);
Route::get('stylists/{id}/products', [ProductController::class, 'getByStylist']);

Route::middleware('auth:api')->group(function () {

    Route::get('/test-role', function () {
        return "Accès autorisé pour stylist";
    })->middleware('can:test roles');
    

    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::get('auth/profile', [AuthController::class, 'profile']);

    // Email and Stripe Payment Routes
    Route::post('/sendEmail', [SendEmailController::class, 'sendEmail']);
    Route::get('/test-stripe', [StripeTestController::class, 'testStripe']);
    Route::post('/create-payment', [StripeTestController::class, 'createPayment']);



    // User Management Routes
    Route::prefix('user')->group(function () {


        // Route::middleware(['role:ROLE_STYLIST'])->group(function () {
        //     Route::get('/', [UserController::class, 'index']);
        // });
        Route::get('/', [UserController::class, 'index']);
// =======
//         Route::middleware(['role:ROLE_STYLIST'])->group(function () {
//             Route::get('/', [UserController::class, 'index']);
//         });
// >>>>>>> d59d47feeaad19e7e423f1b06260c91c31c50015
        Route::get('/{id}', [UserController::class, 'show']);
        Route::post('/', [UserController::class, 'store']);
        Route::put('/{id}', [UserController::class, 'update']);
        Route::delete('/{id}', [UserController::class, 'destroy']);
        Route::post('/{id}/profile-picture', [UserController::class, 'uploadProfilePicture']);
        Route::get('/{id}/notifications', [NotificationController::class, 'show']);
        Route::get('/{id}/measures', [MeasureController::class, 'show']);

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

//     // Protected Product Routes
//     Route::post('product', [ProductController::class, 'store']);
//     Route::put('product/{id}', [ProductController::class, 'update']);
//     Route::delete('product/{id}', [ProductController::class, 'destroy']);

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

    // Routes pour les paiements Stripe
    Route::prefix('payments')->group(function () {
        Route::post('/create-intent', [StripePaymentController::class, 'createIntent']);
        Route::post('/confirm', [StripePaymentController::class, 'confirm']);
        Route::post('/cancel', [StripePaymentController::class, 'cancel']);
        Route::post('/webhook', [StripePaymentController::class, 'webhook']);
        Route::get('/{paymentId}', [StripePaymentController::class, 'show']);
        Route::get('/', [StripePaymentController::class, 'index']);
    });
});
