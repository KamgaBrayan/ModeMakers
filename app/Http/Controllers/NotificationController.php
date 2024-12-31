<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

/**
 * @group Notifications
 *
 * APIs for managing notifications
 */
class NotificationController extends Controller
{
    /**
     * List Notifications
     *
     * Retrieve all notifications.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Notification::with('user')->get());
    }

    /**
     * Retrieve a Notification
     *
     * Get details of a specific notification by ID.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $notification = Notification::with('user')->find($id);
        if (!$notification) {
            return response()->json(['error' => 'Notification not found.'], 404);
        }

        return response()->json($notification);
    }

    /**
     * Create a Notification
     *
     * Store a newly created notification in the database.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'content' => 'required|string',
            'date' => 'required|date',
            'readed' => 'required|boolean',
            'received' => 'required|boolean',
        ]);

        $notification = Notification::create($validated);

        return response()->json($notification, 201);
    }

    /**
     * Update a Notification
     *
     * Modify an existing notification by ID.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $notification = Notification::find($id);
        if (!$notification) {
            return response()->json(['error' => 'Notification not found.'], 404);
        }

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'content' => 'required|string',
            'date' => 'required|date',
            'readed' => 'required|boolean',
            'received' => 'required|boolean',
        ]);

        $notification->update($validated);

        return response()->json($notification);
    }

    /**
     * Delete a Notification
     *
     * Remove a specific notification by ID.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $notification = Notification::find($id);
        if (!$notification) {
            return response()->json(['error' => 'Notification not found.'], 404);
        }

        $notification->delete();

        return response()->json(['message' => 'Notification successfully deleted.']);
    }
}
