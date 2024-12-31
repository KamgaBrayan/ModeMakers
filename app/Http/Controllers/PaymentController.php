<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * @group Payments management
 *
 * APIs for managing payments.
 */
class PaymentController extends Controller
{
    /**
     * Display a listing of the payments.
     *
     * @group Payments management
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json(Payment::all(), Response::HTTP_OK);
    }

    /**
     * Display the specified payment.
     *
     * @group Payments management
     * 
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json([
                'error' => [
                    'code' => 404,
                    'type' => 'Not Found',
                    'message' => 'Payment not found.'
                ]
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json($payment, Response::HTTP_OK);
    }

    /**
     * Store a newly created payment in storage.
     *
     * @group Payments management
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'orderId' => 'required|exists:orders,id',
            'payment_cost' => 'required|numeric',
            'payment_date' => 'required|date',
            'payment_method' => 'required|string',
            'status' => 'required|string',
        ]);

        $payment = Payment::create($request->all());

        return response()->json($payment, Response::HTTP_CREATED);
    }

    /**
     * Update the specified payment in storage.
     *
     * @group Payments management
     * 
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json([
                'error' => [
                    'code' => 404,
                    'type' => 'Not Found',
                    'message' => 'Payment not found.'
                ]
            ], Response::HTTP_NOT_FOUND);
        }

        $request->validate([
            'orderId' => 'required|exists:orders,id',
            'payment_cost' => 'required|numeric',
            'payment_date' => 'required|date',
            'payment_method' => 'required|string',
            'status' => 'required|string',
        ]);

        $payment->update($request->all());

        return response()->json($payment, Response::HTTP_OK);
    }

    /**
     * Remove the specified payment from storage.
     *
     * @group Payments management
     * 
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json([
                'error' => [
                    'code' => 404,
                    'type' => 'Not Found',
                    'message' => 'Payment not found.'
                ]
            ], Response::HTTP_NOT_FOUND);
        }

        $payment->delete();

        return response()->json(['message' => 'Payment successfully deleted.'], Response::HTTP_OK);
    }
}
