<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SendEmailController;
use App\Http\Controllers\StripeTestController;


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
});









