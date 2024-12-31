<?php

use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});


// Route pour obtenir le token CSRF
Route::get('/csrf', function() {
    return response()->json(['token' => csrf_token()]);
});

// //methode pour tester le paiement avec stripe
// Route::get('/test-stripe', [StripeTestController::class, 'testStripe']);
// Route::post('/create-payment', [StripeTestController::class, 'createPayment']);

