<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MaterialController extends Controller
{
    // liste des materiaux
    public function index(){
        $materiaux = Material::all();
        return responce()->json($materiaux);
    }

    // details d'un produit
    public function show($id){
        $material = Material::find($id);
        return responce()->json($material);
    }

    // ajout d'un produit
    public function store(  Request $request){
        $material = Material::create($request->all());
        return responce()->json($material);   
    }


    // modification d'un produit
    public function update(Request $request, $id){
        $material = Material::find($id);
        $material->update($request->all());
        return responce()->json($material);
    }
    
}
