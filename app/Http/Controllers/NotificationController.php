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
        try {
            $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'content' => 'required|string',
            'date' => 'required|date',
            'readed' => 'boolean',
            'received' => 'boolean',
            ]);

            $user = \App\Models\User::find($validated['user_id']);
            if (!$user) {
            return response()->json(['error' => 'User not found.'], 404);
            }

            $notification = Notification::create($validated);

            return response()->json([
            'id' => $notification->id,
            'content' => $notification->content,
            'date' => $notification->date,
            'readed' => $notification->readed,
            'received' => $notification->received,
            'user' => [
                'user_id' => $user->id,
                'email' => $user->email,
                'role' => $user->role
            ],
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la création de la notification',
                'error' => $e->getMessage()
            ], 500);
        }
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
