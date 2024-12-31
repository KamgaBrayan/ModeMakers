<?php

namespace App\Http\Controllers;

use App\Models\Preference;
use Illuminate\Http\Request;

class PreferenceController extends Controller
{
    /**
     * List Preferences
     * 
     * @group Preference Management
     * 
     * @response 200 {
     *   "id": 1,
     *   "user": {
     *     "user_id": 123,
     *     "user_name": "gabriel Nomo"
     *   },
     *   "category": "Category A",
     *   "field1": "Value 1"
     * }
     * @response 500 {
     *   "error": {
     *     "code": 500,
     *     "type": "Internal server error",
     *     "message": "An unexpected error occurred while fetching the preferences. Please try again later."
     *   }
     * }
     */
    public function index()
    {
        $preferences = Preference::with('user')->get();
        return response()->json($preferences);
    }

    /**
     * Retrieve a Preference
     * 
     * @group Preference Management
     * 
     * @urlParam id integer required The ID of the preference.
     * 
     * @response 200 {
     *   "id": 1,
     *   "user": {
     *     "user_id": 123,
     *     "user_name": "gabriel Nomo"
     *   },
     *   "category": "Category A",
     *   "field1": "Value 1"
     * }
     * @response 404 {
     *   "error": {
     *     "code": 404,
     *     "type": "Not Found",
     *     "message": "Preference not found."
     *   }
     * }
     * @response 500 {
     *   "error": {
     *     "code": 500,
     *     "type": "Internal server error",
     *     "message": "An unexpected error occurred while fetching the preference. Please try again later."
     *   }
     * }
     */
    public function show($id)
    {
        $preference = Preference::with('user')->find($id);

        if (!$preference) {
            return response()->json(['error' => 'Preference not found.'], 404);
        }

        return response()->json($preference);
    }

    /**
     * Create a Preference
     * 
     * @group Preference Management
     * 
     * @bodyParam user_id integer required The user ID. Example: 123
     * @bodyParam category string required The category. Example: "Category A"
     * @bodyParam field1 string required The field1 value. Example: "Value 1"
     * 
     * @response 201 {
     *   "id": 1,
     *   "user": {
     *     "user_id": 123,
     *     "user_name": "gabriel Nomo"
     *   },
     *   "category": "Category A",
     *   "field1": "Value 1"
     * }
     * @response 400 {
     *   "error": "Validation error.",
     *   "details": {
     *     "user": "The user information is required.",
     *     "category": "The category field is required.",
     *     "field1": "The field1 field is required."
     *   }
     * }
     * @response 500 {
     *   "error": {
     *     "code": 500,
     *     "type": "Internal server error",
     *     "message": "An unexpected error occurred while creating the preference. Please try again later."
     *   }
     * }
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'category' => 'required|string',
            'field1' => 'required|string',
        ]);

        $preference = Preference::create($validated);

        return response()->json($preference, 201);
    }

    /**
     * Update a Preference
     * 
     * @group Preference Management
     * 
     * @urlParam id integer required The ID of the preference.
     * 
     * @bodyParam user_id integer required The user ID. Example: 123
     * @bodyParam category string required The category. Example: "Category A"
     * @bodyParam field1 string required The field1 value. Example: "Updated Value"
     * 
     * @response 200 {
     *   "id": 1,
     *   "user": {
     *     "user_id": 123,
     *     "user_name": "gabriel Nomo"
     *   },
     *   "category": "Category A",
     *   "field1": "Updated Value"
     * }
     * @response 404 {
     *   "error": {
     *     "code": 404,
     *     "type": "Not Found",
     *     "message": "Preference not found."
     *   }
     * }
     * @response 400 {
     *   "error": "Validation error.",
     *   "details": {
     *     "user": "The user information is required.",
     *     "category": "The category field is required.",
     *     "field1": "The field1 field is required."
     *   }
     * }
     * @response 500 {
     *   "error": {
     *     "code": 500,
     *     "type": "Internal server error",
     *     "message": "An unexpected error occurred while updating the preference. Please try again later."
     *   }
     * }
     */
    public function update(Request $request, $id)
    {
        $preference = Preference::find($id);

        if (!$preference) {
            return response()->json(['error' => 'Preference not found.'], 404);
        }

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'category' => 'required|string',
            'field1' => 'required|string',
        ]);

        $preference->update($validated);

        return response()->json($preference);
    }

    /**
     * Delete a Preference
     * 
     * @group Preference Management
     * 
     * @urlParam id integer required The ID of the preference.
     * 
     * @response 200 {
     *   "message": "Preference successfully deleted."
     * }
     * @response 404 {
     *   "error": {
     *     "code": 404,
     *     "type": "Not Found",
     *     "message": "Preference not found."
     *   }
     * }
     * @response 500 {
     *   "error": {
     *     "code": 500,
     *     "type": "Internal server error",
     *     "message": "An unexpected error occurred while deleting the preference. Please try again later."
     *   }
     * }
     */
    public function destroy($id)
    {
        $preference = Preference::find($id);

        if (!$preference) {
            return response()->json(['error' => 'Preference not found.'], 404);
        }

        $preference->delete();

        return response()->json(['message' => 'Preference successfully deleted.']);
    }
}
