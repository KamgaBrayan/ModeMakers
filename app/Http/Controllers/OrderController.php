<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of orders.
     *
     * @group Order Management
     * @response 200 {
     *     "id": 1,
     *     "user": { "id": 123, "name": "Gabriel Nomo" },
     *     "order_date": "2024-12-29T10:00:00Z",
     *     "status": "Completed",
     *     "total_cost": 150.75,
     *     "payment_method": "Credit Card",
     *     "time_limit": "2024-12-31T23:59:59Z"
     * }
     */
    public function index()
    {
        return response()->json(Order::with('user')->get(), 200);
    }

    /**
     * Display the specified order.
     *
     * @group Order Management
     * @urlParam id integer required The ID of the order. Example: 1
     * @response 200 {
     *     "id": 1,
     *     "user": { "id": 123, "name": "Gabriel Nomo" },
     *     "order_date": "2024-12-29T10:00:00Z",
     *     "status": "Completed",
     *     "total_cost": 150.75,
     *     "payment_method": "Credit Card",
     *     "time_limit": "2024-12-31T23:59:59Z"
     * }
     */
    public function show($id)
    {
        $order = Order::with('user')->find($id);

        if (!$order) {
            return response()->json(['error' => 'Order not found.'], 404);
        }

        return response()->json($order, 200);
    }

    /**
     * Store a newly created order.
     *
     * @group Order Management
     * @bodyParam user_id integer required The ID of the user. Example: 123
     * @bodyParam order_date string required The date of the order. Example: "2024-12-29T10:00:00Z"
     * @bodyParam status string required The status of the order. Example: "Pending"
     * @bodyParam total_cost decimal required The total cost of the order. Example: 150.75
     * @bodyParam payment_method string required The payment method. Example: "Credit Card"
     * @bodyParam time_limit string required The time limit for the order. Example: "2024-12-31T23:59:59Z"
     * @response 201 {
     *     "id": 1,
     *     "user_id": 123,
     *     "order_date": "2024-12-29T10:00:00Z",
     *     "status": "Pending",
     *     "total_cost": 150.75,
     *     "payment_method": "Credit Card",
     *     "time_limit": "2024-12-31T23:59:59Z"
     * }
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'order_date' => 'required|date',
            'status' => 'required|string',
            'total_cost' => 'required|numeric',
            'payment_method' => 'required|string',
            'time_limit' => 'required|date',
        ]);

        $order = Order::create($validated);

        return response()->json($order, 201);
    }

    /**
     * Update the specified order.
     *
     * @group Order Management
     * @urlParam id integer required The ID of the order. Example: 1
     * @response 200 {
     *     "message": "Order updated successfully."
     * }
     */
    public function update(Request $request, $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['error' => 'Order not found.'], 404);
        }

        $validated = $request->validate([
            'user_id' => 'integer|exists:users,id',
            'order_date' => 'date',
            'status' => 'string',
            'total_cost' => 'numeric',
            'payment_method' => 'string',
            'time_limit' => 'date',
        ]);

        $order->update($validated);

        return response()->json(['message' => 'Order updated successfully.'], 200);
    }

    /**
     * Remove the specified order.
     *
     * @group Order Management
     * @urlParam id integer required The ID of the order. Example: 1
     * @response 200 {
     *     "message": "Order deleted successfully."
     * }
     */
    public function destroy($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['error' => 'Order not found.'], 404);
        }

        $order->delete();

        return response()->json(['message' => 'Order deleted successfully.'], 200);
    }
}
