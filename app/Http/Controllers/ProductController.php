<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

/**
 * @group Product Management
 *
 * APIs for managing products
 */
class ProductController extends Controller
{
    /**
     * List Products
     * 
     * Retrieve a list of all products.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $products = Product::with(['stylist', 'materials'])->get();
        $deliveries = \App\Models\Delivery::all();
        
        return response()->json(
            $products->map(function ($product) use ($deliveries) {
                return $this->formatProductResponse($product, $deliveries);
            }), 
            200
        );
    }

    /**
     * Retrieve a Product
     * 
     * Get details of a specific product by ID.
     * 
     * @urlParam id integer required The ID of the product.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $product = Product::with(['stylist', 'materials'])->find($id);
        $deliveries = \App\Models\Delivery::all();

        if (!$product) {
            return response()->json(['error' => 'Product not found.'], 404);
        }

        return response()->json($this->formatProductResponse($product, $deliveries), 200);
    }

    /**
     * Create a Product
     * 
     * Add a new product.
     * 
     * @bodyParam name string required The name of the product.
     * @bodyParam gender string required The gender category of the product.
     * @bodyParam age string required The age range of the product.
     * @bodyParam category string required The category of the product.
     * @bodyParam photos array required URLs of the product's photos.
     * @bodyParam description string required The description of the product.
     * @bodyParam price float required The price of the product.
     * @bodyParam stylist_id integer required The ID of the stylist.
     * @bodyParam materials array required The materials used in the product.
     * @bodyParam materials.*.id integer required The ID of the material.
     * @bodyParam materials.*.price_per_square_metter float required The price per square meter of the material.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'gender' => 'required|string',
            'age' => 'required|string',
            'category' => 'required|string',
            'photos' => 'required|array',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stylist_id' => [
                'required',
                'exists:users,id',
                function ($attribute, $value, $fail) {
                    $user = \App\Models\User::find($value);
                    if (!$user || $user->role !== 'ROLE_STYLIST') {
                        $fail('The selected stylist must be a user with ROLE_STYLIST role.');
                    }
                }
            ],
            'materials' => 'required|array',
            'materials.*.id' => 'required|exists:materials,id',
            'materials.*.price_per_square_metter' => 'required|numeric|min:0'
        ]);

        $product = Product::create([
            'name' => $validated['name'],
            'gender' => $validated['gender'],
            'age' => $validated['age'],
            'category' => $validated['category'],
            'photos' => $validated['photos'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'stylist_id' => $validated['stylist_id']
        ]);

        // Attacher les matériaux avec leurs prix au mètre carré
        foreach ($validated['materials'] as $material) {
            $product->materials()->attach($material['id'], [
                'price_per_square_metter' => $material['price_per_square_metter']
            ]);
        }

        return response()->json($this->formatProductResponse($product, \App\Models\Delivery::all()), 201);
    }

    /**
     * Update a Product
     * 
     * Modify an existing product by ID.
     * 
     * @urlParam id integer required The ID of the product.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['error' => 'Product not found.'], 404);
        }

        $validated = $request->validate([
            'name' => 'string',
            'gender' => 'string',
            'age' => 'string',
            'category' => 'string',
            'photos' => 'array',
            'description' => 'string',
            'price' => 'numeric|min:0',
            'stylist_id' => [
                'exists:users,id',
                function ($attribute, $value, $fail) {
                    $user = \App\Models\User::find($value);
                    if (!$user || $user->role !== 'ROLE_STYLIST') {
                        $fail('The selected stylist must be a user with ROLE_STYLIST role.');
                    }
                }
            ],
            'materials' => 'array',
            'materials.*.id' => 'exists:materials,id',
            'materials.*.price_per_square_metter' => 'numeric|min:0'
        ]);

        $product->update($validated);
        return response()->json($product, 200);
    }

    /**
     * Delete a Product
     * 
     * Remove a product by ID.
     * 
     * @urlParam id integer required The ID of the product.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['error' => 'Product not found.'], 404);
        }

        $product->delete();
        return response()->json(['message' => 'Product successfully deleted.'], 200);
    }

    /**
     * Get Products by Stylist ID
     * 
     * Retrieve all products created by a specific stylist.
     * 
     * @urlParam id integer required The ID of the stylist.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getByStylist($id)
    {
        // Vérifier si le styliste existe et a le bon rôle
        $stylist = \App\Models\User::where('id', $id)
                                 ->where('role', 'ROLE_STYLIST')
                                 ->first();

        if (!$stylist) {
            return response()->json(['error' => 'Stylist not found.'], 404);
        }

        $products = Product::with(['stylist', 'materials'])
                         ->where('stylist_id', $id)
                         ->get();
        
        $deliveries = \App\Models\Delivery::all();

        return response()->json(
            $products->map(function ($product) use ($deliveries) {
                return $this->formatProductResponse($product, $deliveries);
            }), 
            200
        );
    }

    private function formatProductResponse($product, $deliveries)
    {
        $user = $product->stylist;
        
        // Décoder les champs JSON
        $userPhotos = is_string($user->photos) ? json_decode($user->photos, true) : $user->photos;
        $userCalendar = is_string($user->calendar) ? json_decode($user->calendar, true) : $user->calendar;
        $productPhotos = is_string($product->photos) ? json_decode($product->photos, true) : $product->photos;
        
        return [
            'id' => $product->id,
            'name' => $product->name,
            'gender' => $product->gender,
            'age' => $product->age,
            'publishedDate' => $product->created_at->format('d/m/Y'),
            'createdAt' => $product->created_at->format('d/m/Y'),
            'description' => $product->description,
            'category' => $product->category,
            'rating' => (float) ($product->mean_evalue ?? 0),
            'isAvailable' => (bool) $product->disponibilite,
            'images' => $productPhotos ?? [],
            'delivery' => $deliveries->map(function($delivery) {
                return [
                    'id' => $delivery->id,
                    'day' => $delivery->day,
                    'price' => $delivery->price,
                    'type' => $delivery->type
                ];
            })->toArray(),
            'materials' => $product->materials->map(function($material) {
                return [
                    'id' => $material->id,
                    'name' => $material->name,
                    'type' => $material->type ?? 'default',
                    'photos' => is_string($material->photos) ? json_decode($material->photos, true) : ($material->photos ?? []),
                    'price_per_square_meter' => (float) $material->pivot->price_per_square_metter,
                    'description' => $material->description ?? ''
                ];
            })->toArray(),
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'roles' => [$user->role],
                'specialty' => $user->specialty,
                'photos' => $userPhotos ?? [],
                'biography' => $user->bibliography,
                'calendar' => $userCalendar ?? [],
                'experience' => $user->experience,
                'localisation' => $user->localisation,
                'phone' => $user->phone ?? '',
                'category' => ['Homme', 'Femme']
            ]
        ];
    }
}
