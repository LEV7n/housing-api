<?php

namespace App\Http\Controllers;

use App\Models\Housing;
use Illuminate\Http\Request;

class HousingController extends Controller
{
    public function search(Request $request)
    {
        $query = Housing::query();

        // Search by name (partial match)
        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->input('name') . '%');
        }

        // Search by exact match for bedrooms, bathrooms, storeys, and garages
        if ($request->has('bedrooms')) {
            $query->where('bedrooms', $request->input('bedrooms'));
        }

        if ($request->has('bathrooms')) {
            $query->where('bathrooms', $request->input('bathrooms'));
        }

        if ($request->has('storeys')) {
            $query->where('storeys', $request->input('storeys'));
        }
        
        if ($request->has('garages')) {
            $query->where('garages', $request->input('garages'));
        }

        // Search by price range
        if ($request->has('price_min') && $request->has('price_max')) {
            $query->whereBetween('price', [$request->input('price_min'), $request->input('price_max')]);
        }

        // Paginate the results (e.g., 10 items per page)
        $results = $query->paginate(10);

        return response()->json($results);
    }
}