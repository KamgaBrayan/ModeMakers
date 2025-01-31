<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Stripe\Exception\ApiErrorException;
use Stripe\PaymentIntent;
use Stripe\Stripe;
use Illuminate\Support\Facades\Log;

class StripePaymentController extends Controller
{
    public function __construct()
    {
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    public function createIntent(Request $request)
    {
        $request->validate([
            'preOrderId' => 'required|exists:orders,id',
            'amount' => 'required|numeric|min:0',
            'currency' => 'required|string|size:3'
        ]);

        try {
            $order = Order::findOrFail($request->preOrderId);
            
            $intent = PaymentIntent::create([
                'amount' => $request->amount * 100, // Stripe utilise les centimes
                'currency' => $request->currency,
                'metadata' => [
                    'preOrderId' => $request->preOrderId
                ],
                // Configuration des méthodes de paiement automatiques
                'automatic_payment_methods' => [
                    'enabled' => true,
                    'allow_redirects' => 'never'
                ]
            ]);

            $payment = Payment::create([
                'pre_order_id' => $request->preOrderId,
                'amount' => $request->amount,
                'currency' => $request->currency,
                'payment_intent_id' => $intent->id,
                'client_secret' => $intent->client_secret,
                'status' => 'pending'
            ]);

            return response()->json([
                'clientSecret' => $intent->client_secret,
                'paymentIntentId' => $intent->id
            ]);

        } catch (\Exception $e) {
            Log::error('Erreur lors de la création du PaymentIntent: ' . $e->getMessage());
            return response()->json([
                'error' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function confirm(Request $request)
    {
        $request->validate([
            'paymentIntentId' => 'required|string',
            'preOrderId' => 'required|exists:orders,id',
            'paymentMethod' => 'required|string' // ID de la méthode de paiement Stripe
        ]);

        try {
            $payment = Payment::where('payment_intent_id', $request->paymentIntentId)
                            ->where('pre_order_id', $request->preOrderId)
                            ->firstOrFail();

            $intent = PaymentIntent::retrieve($request->paymentIntentId);
            
            // Attacher la méthode de paiement à l'intention
            $intent->payment_method = $request->paymentMethod;
            
            // Confirmer le paiement avec Stripe
            $intent->confirm([
                'payment_method' => $request->paymentMethod,
                'return_url' => config('app.url') . '/payment/complete' // URL de retour pour 3D Secure si nécessaire
            ]);
            
            // Vérifier si la confirmation a réussi
            if ($intent->status === 'succeeded' || $intent->status === 'requires_action') {
                if ($intent->status === 'succeeded') {
                    $payment->update(['status' => 'confirmed']);
                }
                
                return response()->json([
                    'status' => $intent->status,
                    'payment' => [
                        'id' => $payment->id,
                        'status' => $intent->status,
                        'createdAt' => $payment->created_at,
                        'amount' => $payment->amount,
                        'requires_action' => $intent->status === 'requires_action',
                        'client_secret' => $intent->client_secret // Nécessaire pour 3D Secure
                    ]
                ]);
            }

            return response()->json([
                'error' => 'Payment confirmation failed',
                'status' => $intent->status
            ], Response::HTTP_BAD_REQUEST);

        } catch (\Exception $e) {
            Log::error('Erreur lors de la confirmation du paiement: ' . $e->getMessage());
            return response()->json([
                'error' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function cancel(Request $request)
    {
        $request->validate([
            'paymentIntentId' => 'required|string',
            'preOrderId' => 'required|exists:orders,id'
        ]);

        try {
            $payment = Payment::where('payment_intent_id', $request->paymentIntentId)
                            ->where('pre_order_id', $request->preOrderId)
                            ->firstOrFail();

            $intent = PaymentIntent::retrieve($request->paymentIntentId);
            $intent->cancel();
            
            $payment->update(['status' => 'canceled']);

            return response()->json([
                'status' => 'canceled',
                'payment' => [
                    'id' => $payment->id,
                    'status' => 'canceled',
                    'createdAt' => $payment->created_at
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Erreur lors de l\'annulation du paiement: ' . $e->getMessage());
            return response()->json([
                'error' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function webhook(Request $request)
    {
        $payload = $request->all();
        $sig_header = $request->header('Stripe-Signature');

        try {
            \Stripe\Webhook::constructEvent(
                $request->getContent(),
                $sig_header,
                config('services.stripe.webhook_secret')
            );

            if ($payload['type'] === 'payment_intent.succeeded') {
                $paymentIntent = $payload['data']['object'];
                $payment = Payment::where('payment_intent_id', $paymentIntent['id'])->first();
                
                if ($payment) {
                    $payment->update(['status' => 'confirmed']);
                }
            }

            return response()->json(['received' => true]);

        } catch (\Exception $e) {
            Log::error('Erreur webhook Stripe: ' . $e->getMessage());
            return response()->json([
                'error' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function show($paymentId)
    {
        try {
            $payment = Payment::with('preOrder')->findOrFail($paymentId);

            return response()->json([
                'id' => $payment->id,
                'status' => $payment->status,
                'createdAt' => $payment->created_at,
                'preOrder' => [
                    'id' => $payment->preOrder->id,
                    'status' => $payment->preOrder->status
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Payment not found'
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function index(Request $request)
    {
        $query = Payment::with('preOrder');

        if ($request->has('userId')) {
            $query->whereHas('preOrder', function ($q) use ($request) {
                $q->where('user_id', $request->userId);
            });
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $page = $request->get('page', 1);
        $limit = $request->get('limit', 10);

        $payments = $query->paginate($limit);

        return response()->json([
            'payments' => $payments->items(),
            'total' => $payments->total(),
            'page' => $payments->currentPage(),
            'totalPages' => $payments->lastPage()
        ]);
    }
}
