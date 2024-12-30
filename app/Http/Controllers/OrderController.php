<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OrderController extends Controller
{
    //liste des orders
    public function index() {
        $orders = Order::all();
        return response()->json($orders);
    }

    //details d'un order
    public function show($id) {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }
        return response()->json($order);
    }

    //ajout d'un order
    public function store(Request $request) {
        $order = Order::create($request->all());
        return response()->json($order);
    }


    //modification d'un order
    public function update(Request $request, $id) {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }
        $order->update($request->all());
        return response()->json($order);
    }

    //suppression d'un order
    public function destroy($id) {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }
        $order->delete();
        return response()->json(['message' => 'Order deleted successfully']);
    }

    //liste des orders d'un user
    public function indexByUser($userId) {
        $orders = Order::where('user_id', $userId)->get();
        return response()->json($orders);
    }

    //details d'un order d'un user
    public function showByUser($userId, $orderId) {
        $order = Order::where('user_id', $userId)->find($orderId);
        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }
        return response()->json($order);
    }

    //ajout d'un order d'un user
    public function storeByUser($userId, Request $request) {
        $order = Order::where('user_id', $userId)->create($request->all());
        return response()->json($order);
    }

    

}
