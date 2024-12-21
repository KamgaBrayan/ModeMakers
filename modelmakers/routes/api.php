<?php

use App\Http\Controllers\UserController;




// liste des utilisateurs
Route::get('/users', [UserController::class, 'index']);
// details d'un utilisateur
Route::get('/users/{id}', [UserController::class, 'show']);
// ajout d'un utilisateur
Route::post('/users', [UserController::class, 'store']);
// modification d'un utilisateur
Route::put('/users/{id}', [UserController::class, 'update']);
// suppression d'un utilisateur
Route::delete('/users/{id}', [UserController::class, 'destroy']);




// liste des produits
Route::get('/products', [ProductController::class, 'index']);
// details d'un produit
Route::get('/products/{id}', [ProductController::class, 'show']);
// ajout d'un produit
Route::post('/products', [ProductController::class, 'store']);
// modification d'un produit
Route::put('/products/{id}', [ProductController::class, 'update']);
// suppression d'un produit
Route::delete('/products/{id}', [ProductController::class, 'destroy']);



// liste des reviews
Route::get('/reviews', [ReviewController::class, 'index']);
// details d'une review
Route::get('/reviews/{id}', [ReviewController::class, 'show']);
// ajout d'une review
Route::post('/reviews', [ReviewController::class, 'store']);
// modification d'une review
Route::put('/reviews/{id}', [ReviewController::class, 'update']);
// suppression d'une review
Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);



// liste des payments
Route::get('/payments', [PaymentController::class, 'index']);
// details d'un payment
Route::get('/payments/{id}', [PaymentController::class, 'show']);
// ajout d'un payment
Route::post('/payments', [PaymentController::class, 'store']);
// modification d'un payment
Route::put('/payments/{id}', [PaymentController::class, 'update']);
// suppression d'un payment
Route::delete('/payments/{id}', [PaymentController::class, 'destroy']);



// liste des orders
Route::get('/orders', [OrderController::class, 'index']);
// details d'un order
Route::get('/orders/{id}', [OrderController::class, 'show']);
// ajout d'un order
Route::post('/orders',[OrderController::class,'store']);
// modification d'un order
Route::put('/orders/{id}', [OrderController::class, 'update']);
// suppression d'un order
Route::delete('/orders/{id}', [OrderController::class, 'destroy']);
// liste des orders d'un user
Route::get('/orders/user/{userId}', [OrderController::class, 'indexByUser']);
// details d'un order d'un user
Route::get('/orders/user/{userId}/{orderId}', [OrderController::class, 'showByUser']);
// ajout d'un order d'un user
Route::post('/orders/user/{userId}', [OrderController::class, 'storeByUser']);



// liste des notifications
Route::get('/notifications', [NotificationController::class, 'index']);
// details d'une notification
Route::get('/notifications/{id}', [NotificationController::class, 'show']);
// ajout d'une notification
Route::post('/notifications', [NotificationController::class, 'store']);
// modification d'une notification
Route::put('/notifications/{id}', [NotificationController::class, 'update']);
// suppression d'une notification
Route::delete('/notifications/{id}', [NotificationController::class, 'destroy']);



// liste des mesures
Route::get('/mesures', [MeasureController::class, 'index']);
// details d'une mesure
Route::get('/mesures/{id}', [MeasureController::class, 'show']);
// ajout d'une mesure
Route::post('/mesures', [MeasureController::class, 'store']);
// modification d'une mesure
Route::put('/mesures/{id}', [MeasureController::class, 'update']);





// liste des materiaux
Route::get('/materials', [MaterialController::class, 'index']);
// details d'un materiau
Route::get('/materials/{id}', [MaterialController::class, 'show']);
// ajout d'un materiau
Route::post('/materials', [MaterialController::class, 'store']);
// modification d'un materiau
Route::put('/materials/{id}', [MaterialController::class, 'update']);








