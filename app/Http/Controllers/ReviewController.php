<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;



class ReviewController extends Controller
{
    // liste des reviews(commentaires)
    public function index() {
        $reviews = Review::all();
        return response()->json($reviews);
    }

    // details d'une review
    public function show($id) {
        $review = Review::find($id);
        if (!$review) {
            return response()->json(['error' => 'Review not found'], 404);
        }
        return response()->json($review);
    }

    // ajout d'une review
    public function store(Request $request) {
        $review = Review::create($request->all());
        return response()->json($review);
    }

    // modification d'une review
    public function update(Request $request, $id) {
        $review = Review::find($id);
        if (!$review) {
            return response()->json(['error' => 'Review not found'], 404);
        }
        $review->update($request->all());
        return response()->json($review);
    }


    // suppression d'une review
    public function destroy($id) {
        $review = Review::find($id);
        if (!$review) {
            return response()->json(['error' => 'Review not found'], 404);
        }
        $review->delete();
        return response()->json(['message' => 'Review deleted successfully']);
    }

}
