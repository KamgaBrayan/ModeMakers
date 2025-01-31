<?php

namespace App\Http\Controllers;

use App\Models\Measure;
use Illuminate\Http\Request;

class MeasureController extends Controller
{
    /**
     * List Measures
     * 
     * @group Measure Management
     * 
     * @response 200 {
     *  [{
     *      "id": 1,
     *      "user_id": 1,
     *      "stature": 170,
     *      "shoulder_circumference": 45,
     *      "chest_circumference": 90,
     *      "waist_circumference": 80,
     *      "hip_circumference": 95,
     *      "shoulder_height": 60,
     *      "hip_height": 90,
     *      "knee_height": 40,
     *      "chest_spacing": 18,
     *      "breast_height": 25,
     *      "pelvis_height": 30,
     *      "front_waist_length": 45,
     *      "shoulder_length": 60,
     *      "back_waist_length": 50,
     *      "arm_length": 55,
     *      "total_arm_length_bent": 50,
     *      "wrist_circumference": 15,
     *      "ankle_height": 20,
     *      "seated_height": 90,
     *      "crotch_length": 70,
     *      "date_measure": "2024-12-31"
     *  }]
     * }
     */
    public function index()
    {
        return response()->json(Measure::with('user')->get());
    }

    /**
     * Get Measure
     * 
     * @group Measure Management
     * 
     * @urlParam id integer nullable The ID of the measure.
     * 
     * @response 200 {
     *  {
     *      "id": 1,
     *      "user_id": 1,
     *      "stature": 170,
     *      "shoulder_circumference": 45,
     *      "chest_circumference": 90,
     *      "waist_circumference": 80,
     *      "hip_circumference": 95,
     *      "shoulder_height": 60,
     *      "hip_height": 90,
     *      "knee_height": 40,
     *      "chest_spacing": 18,
     *      "breast_height": 25,
     *      "pelvis_height": 30,
     *      "front_waist_length": 45,
     *      "shoulder_length": 60,
     *      "back_waist_length": 50,
     *      "arm_length": 55,
     *      "total_arm_length_bent": 50,
     *      "wrist_circumference": 15,
     *      "ankle_height": 20,
     *      "seated_height": 90,
     *      "crotch_length": 70,
     *      "date_measure": "2024-12-31"
     *  }
     * }
     * 
     * @response 404 {
     *  "error": {
     *      "code": 404,
     *      "message": "Measure not found"
     *  }
     * }
     */
    public function show($id)
    {
        try {
            $measure = Measure::with('user')->find($id);
            return response()->json($measure);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => ['code' => 404, 'message' => 'Measure not found']], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => ['code' => 500, 'message' => 'An unexpected error occurred']], 500);
        }
    }

    /**
     * Create Measure
     * 
     * @group Measure Management
     * 
     * @bodyParam user_id integer required The ID of the user.
     * @bodyParam stature numeric nullable The stature of the user.
     * @bodyParam shoulder_circumference numeric nullable The shoulder circumference.
     * @bodyParam chest_circumference numeric nullable The chest circumference.
     * @bodyParam waist_circumference numeric nullable The waist circumference.
     * @bodyParam hip_circumference numeric nullable The hip circumference.
     * @bodyParam shoulder_height numeric nullable The shoulder height.
     * @bodyParam hip_height numeric nullable The hip height.
     * @bodyParam knee_height numeric nullable The knee height.
     * @bodyParam chest_spacing numeric nullable The chest spacing.
     * @bodyParam breast_height numeric nullable The breast height.
     * @bodyParam pelvis_height numeric nullable The pelvis height.
     * @bodyParam front_waist_length numeric nullable The front waist length.
     * @bodyParam shoulder_length numeric nullable The shoulder length.
     * @bodyParam back_waist_length numeric nullable The back waist length.
     * @bodyParam arm_length numeric nullable The arm length.
     * @bodyParam total_arm_length_bent numeric nullable The total arm length bent.
     * @bodyParam wrist_circumference numeric nullable The wrist circumference.
     * @bodyParam ankle_height numeric nullable The ankle height.
     * @bodyParam seated_height numeric nullable The seated height.
     * @bodyParam crotch_length numeric nullable The crotch length.
     * @bodyParam date_measure date required The date of the measurement.
     * 
     * @response 201 scenario="Created" {
     * {
     *   "user_id": 123,
     *   "head_circumference": 56.5,
     *   "neck_circumference": 38.2,
     *   "shoulder_length": 45.7,
     *   "arm_length": 62.3,
     *   "chest_circumference": 98.4,
     *   "underbust_circumference": 85.0,
     *   "waist_circumference": 82.5,
     *   "iliac_crest_circumference": 90.3,
     *   "hip_circumference": 102.7,
     *   "thigh_circumference": 58.6,
     *   "knee_circumference": 42.1,
     *   "calf_circumference": 38.2,
     *   "ankle_circumference": 23.4,
     *   "biceps_circumference": 33.0,
     *   "elbow_circumference": 30.5,
     *   "forearm_circumference": 28.9,
     *   "wrist_circumference": 17.6,
     *   "wrist_to_elbow_length": 29.8,
     *   "knee_to_ankle_length": 42.7,
     *   "inseam_length": 78.2,
     *   "outseam_length": 102.3,
     *   "total_height": 175.6,
     *   "front_body_length": 55.4,
     *   "back_body_length": 57.1,
     *   "date_measure": "2025-01-31"
     * }
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'head_circumference' => 'nullable|numeric',
            'neck_circumference' => 'nullable|numeric',
            'shoulder_length' => 'nullable|numeric',
            'arm_length' => 'nullable|numeric',
            'chest_circumference' => 'nullable|numeric',
            'underbust_circumference' => 'nullable|numeric',
            'waist_circumference' => 'nullable|numeric',
            'iliac_crest_circumference' => 'nullable|numeric',
            'hip_circumference' => 'nullable|numeric',
            'thigh_circumference' => 'nullable|numeric',
            'knee_circumference' => 'nullable|numeric',
            'calf_circumference' => 'nullable|numeric',
            'ankle_circumference' => 'nullable|numeric',
            'biceps_circumference' => 'nullable|numeric',
            'elbow_circumference' => 'nullable|numeric',
            'forearm_circumference' => 'nullable|numeric',
            'wrist_circumference' => 'nullable|numeric',
            'wrist_to_elbow_length' => 'nullable|numeric',
            'knee_to_ankle_length' => 'nullable|numeric',
            'inseam_length' => 'nullable|numeric',
            'outseam_length' => 'nullable|numeric',
            'total_height' => 'nullable|numeric',
            'front_body_length' => 'nullable|numeric',
            'back_body_length' => 'nullable|numeric',
            'date_measure' => 'required|date',
        ]);

        $measure = Measure::create($validated);
        return response()->json($measure, 201);
    }

    /**
     * Update Measure
     * 
     * @group Measure Management
     * 
     * @urlParam id integer nullable The ID of the measure.
     * [Similar bodyParam documentation as store method]
     * 
     * @response 200 {
     *   {
    *   "user_id": 123,
     *   "head_circumference": 56.5,
     *   "neck_circumference": 38.2,
     *   "shoulder_length": 45.7,
     *   "arm_length": 62.3,
     *   "chest_circumference": 98.4,
     *   "underbust_circumference": 85.0,
     *   "waist_circumference": 82.5,
     *   "iliac_crest_circumference": 90.3,
     *   "hip_circumference": 102.7,
     *   "thigh_circumference": 58.6,
     *   "knee_circumference": 42.1,
     *   "calf_circumference": 38.2,
     *   "ankle_circumference": 23.4,
     *   "biceps_circumference": 33.0,
     *   "elbow_circumference": 30.5,
     *   "forearm_circumference": 28.9,
     *   "wrist_circumference": 17.6,
     *   "wrist_to_elbow_length": 29.8,
     *   "knee_to_ankle_length": 42.7,
     *   "inseam_length": 78.2,
     *   "outseam_length": 102.3,
     *   "total_height": 175.6,
     *   "front_body_length": 55.4,
     *   "back_body_length": 57.1,
     *   "date_measure": "2025-01-31"
     *  }
     * }
     */
    public function update(Request $request, $id)
    {
        $measure = Measure::findOrFail($id);

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'stature' => 'nullable|numeric',
            'shoulder_circumference' => 'nullable|numeric',
            'chest_circumference' => 'nullable|numeric',
            'waist_circumference' => 'nullable|numeric',
            'hip_circumference' => 'nullable|numeric',
            'shoulder_height' => 'nullable|numeric',
            'hip_height' => 'nullable|numeric',
            'knee_height' => 'nullable|numeric',
            'chest_spacing' => 'nullable|numeric',
            'breast_height' => 'nullable|numeric',
            'pelvis_height' => 'nullable|numeric',
            'front_waist_length' => 'nullable|numeric',
            'shoulder_length' => 'nullable|numeric',
            'back_waist_length' => 'nullable|numeric',
            'arm_length' => 'nullable|numeric',
            'total_arm_length_bent' => 'nullable|numeric',
            'wrist_circumference' => 'nullable|numeric',
            'ankle_height' => 'nullable|numeric',
            'seated_height' => 'nullable|numeric',
            'crotch_length' => 'nullable|numeric',
            'date_measure' => 'required|date',
        ]);

        $measure->update($validated);
        return response()->json($measure);
    }

    /**
     * Delete Measure
     * 
     * @group Measure Management
     * 
     * @urlParam id integer nullable The ID of the measure.
     * 
     * @response 204 {
     *  "message": "Measure deleted successfully"
     * }
     */
    public function destroy($id)
    {
        $measure = Measure::findOrFail($id);
        $measure->delete();
        return response()->json(['message' => 'Measure deleted successfully'], 204);
    }
}
