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
        $products = Product::with(['stylist', 'material'])->get();
        return response()->json($products, 200);
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
        $product = Product::with(['stylist', 'material'])->find($id);

        if (!$product) {
            return response()->json(['error' => 'Product not found.'], 404);
        }

        return response()->json($product, 200);
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
     * @bodyParam material_id integer required The ID of the material.
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
            'stylist_id' => 'required|exists:stylists,id',
            'material_id' => 'required|exists:materials,id',
        ]);

        $product = Product::create($validated);
        return response()->json($product, 201);
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
            'stylist_id' => 'exists:stylists,id',
            'material_id' => 'exists:materials,id',
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
}
