<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Measure;

class MeasureController extends Controller
{
    //liste des mesures
    public function index(){
        $mesures = Measure::all();
        return responce()->json($mesures);
    }

    //details d'une mesure
    public function show($id){
        $mesure = Measure::find($id);
        return responce()->json($mesure);
    }



    //ajout d'une mesure
    public function store(  Request $request){
        $mesure = Measure::create($request->all());
        return responce()->json($mesure);   
    }


    //modification d'une mesure
    public function update(Request $request, $id){
        $mesure = Measure::find($id);
        if(!$mesure){
            return responce()->json(['error' => 'mesure not found'], 404);
        }
        $mesure->update($request->all());
        return responce()->json($mesure);
    }


}
