<?php
namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\Request;

/**
 * @group Materials Management
 *
 * APIs for managing materials
 */
class MaterialController extends Controller
{
    /**
     * List Materials
     *
     * Retrieve a list of all materials.
     *
     * @response 200 {
     *  "id": 1,
     *  "name": "Cotton",
     *  "description": "Soft and breathable fabric.",
     *  "price_per_square_meter": 10.0,
     *  "color": "White"
     * }
     */
    public function index()
    {
        return response()->json(Material::all());
    }

    /**
     * Retrieve a Material
     *
     * Get details of a specific material by ID.
     *
     * @urlParam id integer required The ID of the material. Example: 1
     * @response 404 {
     *  "error": "Material not found."
     * }
     */
    public function show($id)
    {
        $material = Material::find($id);

        if (!$material) {
            return response()->json(['error' => 'Material not found.'], 404);
        }

        return response()->json($material);
    }

    /**
     * Create a Material
     *
     * Create a new material with the provided data.
     *
     * @bodyParam name string required The name of the material. Example: Cotton
     * @bodyParam description string The description of the material. Example: Soft and breathable fabric.
     * @bodyParam price_per_square_meter number The price per square meter. Example: 10.0
     * @bodyParam color string required The color of the material. Example: White
     * @response 201 {
     *  "id": 1,
     *  "name": "Cotton",
     *  "description": "Soft and breathable fabric.",
     *  "price_per_square_meter": 10.0,
     *  "color": "White"
     * }
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price_per_square_meter' => 'required|numeric|min:0',
            'color' => 'required|string',
        ]);

        $material = Material::create($validated);

        return response()->json($material, 201);
    }

    /**
     * Update a Material
     *
     * Update an existing material by ID.
     *
     * @urlParam id integer required The ID of the material. Example: 1
     * @bodyParam name string The name of the material. Example: Cotton
     * @bodyParam description string The description of the material. Example: Soft and breathable fabric.
     * @bodyParam price_per_square_meter number The price per square meter. Example: 12.0
     * @bodyParam color string The color of the material. Example: White
     * @response 404 {
     *  "error": "Material not found."
     * }
     */
    public function update(Request $request, $id)
    {
        $material = Material::find($id);

        if (!$material) {
            return response()->json(['error' => 'Material not found.'], 404);
        }

        $validated = $request->validate([
            'name' => 'string',
            'description' => 'nullable|string',
            'price_per_square_meter' => 'numeric|min:0',
            'color' => 'string',
        ]);

        $material->update($validated);

        return response()->json($material);
    }

    /**
     * Delete a Material
     *
     * Delete a specific material by ID.
     *
     * @urlParam id integer required The ID of the material. Example: 1
     * @response 404 {
     *  "error": "Material not found."
     * }
     */
    public function destroy($id)
    {
        $material = Material::find($id);

        if (!$material) {
            return response()->json(['error' => 'Material not found.'], 404);
        }

        $material->delete();

        return response()->json(['message' => 'Material successfully deleted.']);
    }
}
