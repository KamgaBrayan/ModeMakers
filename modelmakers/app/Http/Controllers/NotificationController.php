<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;

class NotificationController extends Controller
{
    // liste des notifications
    public function index() {
        $notifications = Notification::all();
        return response()->json($notifications);
    }

    // details d'une notification
    public function show($id) {
        $notification = Notification::find($id);
        if (!$notification) {
            return response()->json(['error' => 'Notification not found'], 404);
        }
        return response()->json($notification);
    }

    // ajout d'une notification
    public function store(Request $request) {
        $notification = Notification::create($request->all());
        return response()->json($notification);
    }

    // modification d'une notification
    public function update(Request $request, $id) {
        $notification = Notification::find($id);
        if (!$notification) {
            return response()->json(['error' => 'Notification not found'], 404);
        }
        $notification->update($request->all());
        return response()->json($notification);
    }

    // suppression d'une notification
    public function destroy($id) {
        $notification = Notification::find($id);
        if (!$notification) {
            return response()->json(['error' => 'Notification not found'], 404);
        }
        $notification->delete();
        return response()->json(['message' => 'Notification deleted successfully']);
    }


}
