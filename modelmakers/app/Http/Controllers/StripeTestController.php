<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Customer;

class StripeTestController extends Controller
{
    public function __construct()
    {
        // Set your secret key: remember to change this to your live secret key in production
        // See your keys here: https://dashboard.stripe.com/account/apikeys
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    public function testStripe()
    {
        try {
            // Create a new customer
            $customer = Customer::create([
                'email' => 'test@example.com',
                'name' => 'Test Customer',
             ]);

            return response()->json([
                'message' => 'Stripe configuration is working!',
                'customer' => $customer,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Stripe configuration failed.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function createPayment(Request $request)
{
    try {
        // Create a PaymentIntent
        $paymentIntent = \Stripe\PaymentIntent::create([
            'amount' => $request->amount, // Amount in cents
            'currency' => 'usd',
            'payment_method_types' => ['card'],
        ]);

        return response()->json([
            'message' => 'PaymentIntent created successfully!',
            'client_secret' => $paymentIntent->client_secret,
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Failed to create PaymentIntent.',
            'error' => $e->getMessage(),
        ], 500);
    }
}

}
