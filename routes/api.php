<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SendEmailController;
use App\Http\Controllers\StripeTestController;
use App\Http\Controllers\MeasureController;
use App\Http\Controllers\PreferenceController;
use App\Http\Controllers\NotificationController;
use Illuminate\Routing\Controllers\Middleware;

Route::post('auth/register', [AuthController::class, 'register']);
Route::post('auth/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {

    //authentication

    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::get('auth/profile', [AuthController::class, 'profile']);
    

    // email and stripe payment
    Route::post('/sendEmail', [SendEmailController::class, 'sendEmail']);
    Route::get('/test-stripe', [StripeTestController::class, 'testStripe']);
    Route::post('/create-payment', [StripeTestController::class, 'createPayment']);

    // users management

    Route::get('/user', [UserController::class, 'index']);
    Route::get('/user/{id}', [UserController::class, 'show']);
    Route::post('/user', [UserController::class, 'store']);
    Route::put('/user/{id}', [UserController::class, 'update']);
    Route::delete('/user/{id}', [UserController::class, 'destroy']);
    Route::post('/user/{id}/profile-picture', [UserController::class, 'uploadProfilePicture']);


    //measures

    Route::get('/measure', [MeasureController::class, 'index']);
    Route::get('/measure/{id}', [MeasureController::class, 'show']);
    Route::post('/measure', [MeasureController::class, 'store']);
    Route::put('/measure/{id}', [MeasureController::class, 'update']);
    Route::delete('/measure/{id}', [MeasureController::class, 'destroy']);


    //preferences


    Route::get('preference', [PreferenceController::class, 'index']);
    Route::get('preference/{id}', [PreferenceController::class, 'show']);
    Route::post('preference', [PreferenceController::class, 'store']);
    Route::put('preference/{id}', [PreferenceController::class, 'update']);
    Route::delete('preference/{id}', [PreferenceController::class, 'destroy']);
});

//notifications

Route::prefix('notification')->group(function () {
    Route::get('/', [NotificationController::class, 'index']);
    Route::get('/{id}', [NotificationController::class, 'show']);
    Route::post('/', [NotificationController::class, 'store']);
    Route::put('/{id}', [NotificationController::class, 'update']);
    Route::delete('/{id}', [NotificationController::class, 'destroy']);
})->Middleware('auth:api');









