<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payments;

class PaymentController extends Controller
{
    //liste des payments
    public function index() {
        $payments = Payments::all();
        return response()->json($payments);
    }

    //details d'un payment
    public function show($id) {
        $payment = Payments::find($id);
        if (!$payment) {
            return response()->json(['error' => 'Payment not found'], 404);
        }
        return response()->json($payment);
    }

    //ajout d'un payment
    public function store(Request $request) {
        $payment = Payments::create($request->all());
        return response()->json($payment);
    }

    //modification d'un payment
    public function update(Request $request, $id) {
        $payment = Payments::find($id);
        if (!$payment) {
            return response()->json(['error' => 'Payment not found'], 404);
        }
        $payment->update($request->all());
        return response()->json($payment);
    }

    //suppression d'un payment
    public function destroy($id) {
        $payment = Payments::find($id);
        if (!$payment) {
            return response()->json(['error' => 'Payment not found'], 404);
        }
        $payment->delete();
        return response()->json(['message' => 'Payment deleted successfully']);
    }


}
