<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Customer;

/**
 * @OA\Tag(
 *     name="Stripe",
 *     description="Operations related to Stripe payment processing"
 * )
 */
class StripeTestController extends Controller
{
    public function __construct()
    {
        // Set your secret key: remember to change this to your live secret key in production
        // See your keys here: https://dashboard.stripe.com/account/apikeys
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    /**
     * @OA\Get(
     *     path="/api/stripe/test",
     *     summary="Test Stripe configuration",
     *     tags={"Stripe"},
     *     @OA\Response(
     *         response=200,
     *         description="Stripe configuration is working",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Stripe configuration is working!"),
     *             @OA\Property(property="customer", type="object", ref="#/components/schemas/Customer")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Stripe configuration failed",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Stripe configuration failed."),
     *             @OA\Property(property="error", type="string")
     *         )
     *     )
     * )
     */
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

    /**
     * @OA\Post(
     *     path="/api/stripe/payment",
     *     summary="Create a PaymentIntent for Stripe payment",
     *     tags={"Stripe"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="amount", type="integer", description="Amount in cents"),
     *             @OA\Property(property="currency", type="string", description="Currency code")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="PaymentIntent created successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="PaymentIntent created successfully!"),
     *             @OA\Property(property="client_secret", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Failed to create PaymentIntent",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Failed to create PaymentIntent."),
     *             @OA\Property(property="error", type="string")
     *         )
     *     )
     * )
     */
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
