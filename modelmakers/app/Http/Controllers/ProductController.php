<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class ProductController extends Controller
{
    
    
    // liste des produits
    public function index() {
        $products = Product::all();
        return response()->json($products);
    }

    // details d'un produit
    public function show($id) {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }
        return response()->json($product);
    }

    // ajout d'un produit
    public function store(Request $request) {
        $product = Product::create($request->all());
        return response()->json($product);
    }

    // modification d'un produit
    public function update(Request $request, $id) {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }
        $product->update($request->all());
        return response()->json($product);
    }

    // suppression d'un produit
    public function destroy($id) {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }


}
