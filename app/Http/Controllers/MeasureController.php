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
     * @urlParam id integer required The ID of the measure.
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
        $measure = Measure::with('user')->findOrFail($id);
        return response()->json($measure);
    }

    /**
     * Create Measure
     * 
     * @group Measure Management
     * 
     * @bodyParam user_id integer required The ID of the user.
     * @bodyParam stature numeric required The stature of the user.
     * @bodyParam shoulder_circumference numeric required The shoulder circumference.
     * @bodyParam chest_circumference numeric required The chest circumference.
     * @bodyParam waist_circumference numeric required The waist circumference.
     * @bodyParam hip_circumference numeric required The hip circumference.
     * @bodyParam shoulder_height numeric required The shoulder height.
     * @bodyParam hip_height numeric required The hip height.
     * @bodyParam knee_height numeric required The knee height.
     * @bodyParam chest_spacing numeric required The chest spacing.
     * @bodyParam breast_height numeric required The breast height.
     * @bodyParam pelvis_height numeric required The pelvis height.
     * @bodyParam front_waist_length numeric required The front waist length.
     * @bodyParam shoulder_length numeric required The shoulder length.
     * @bodyParam back_waist_length numeric required The back waist length.
     * @bodyParam arm_length numeric required The arm length.
     * @bodyParam total_arm_length_bent numeric required The total arm length bent.
     * @bodyParam wrist_circumference numeric required The wrist circumference.
     * @bodyParam ankle_height numeric required The ankle height.
     * @bodyParam seated_height numeric required The seated height.
     * @bodyParam crotch_length numeric required The crotch length.
     * @bodyParam date_measure date required The date of the measurement.
     * 
     * @response 201 scenario="Created" {
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
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'stature' => 'required|numeric',
            'shoulder_circumference' => 'required|numeric',
            'chest_circumference' => 'required|numeric',
            'waist_circumference' => 'required|numeric',
            'hip_circumference' => 'required|numeric',
            'shoulder_height' => 'required|numeric',
            'hip_height' => 'required|numeric',
            'knee_height' => 'required|numeric',
            'chest_spacing' => 'required|numeric',
            'breast_height' => 'required|numeric',
            'pelvis_height' => 'required|numeric',
            'front_waist_length' => 'required|numeric',
            'shoulder_length' => 'required|numeric',
            'back_waist_length' => 'required|numeric',
            'arm_length' => 'required|numeric',
            'total_arm_length_bent' => 'required|numeric',
            'wrist_circumference' => 'required|numeric',
            'ankle_height' => 'required|numeric',
            'seated_height' => 'required|numeric',
            'crotch_length' => 'required|numeric',
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
     * @urlParam id integer required The ID of the measure.
     * [Similar bodyParam documentation as store method]
     * 
     * @response 200 {
     *   {
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
     */
    public function update(Request $request, $id)
    {
        $measure = Measure::findOrFail($id);

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'stature' => 'required|numeric',
            'shoulder_circumference' => 'required|numeric',
            'chest_circumference' => 'required|numeric',
            'waist_circumference' => 'required|numeric',
            'hip_circumference' => 'required|numeric',
            'shoulder_height' => 'required|numeric',
            'hip_height' => 'required|numeric',
            'knee_height' => 'required|numeric',
            'chest_spacing' => 'required|numeric',
            'breast_height' => 'required|numeric',
            'pelvis_height' => 'required|numeric',
            'front_waist_length' => 'required|numeric',
            'shoulder_length' => 'required|numeric',
            'back_waist_length' => 'required|numeric',
            'arm_length' => 'required|numeric',
            'total_arm_length_bent' => 'required|numeric',
            'wrist_circumference' => 'required|numeric',
            'ankle_height' => 'required|numeric',
            'seated_height' => 'required|numeric',
            'crotch_length' => 'required|numeric',
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
     * @urlParam id integer required The ID of the measure.
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
