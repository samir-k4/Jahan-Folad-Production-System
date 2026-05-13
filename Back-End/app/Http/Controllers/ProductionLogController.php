<?php

namespace App\Http\Controllers;

use App\Models\ProductionLog;
use Illuminate\Http\Request;

class ProductionLogController extends Controller
{
    public function index()
    {
        return response()->json(ProductionLog::with(['branch', 'product'])->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'branch_id' => 'required|exists:branches,id',
            'product_id' => 'required|exists:products,id',
            // Default user_id to 1 if not provided, assuming user 1 exists (admin)
            'user_id' => 'sometimes|exists:users,id', 
            'quantity' => 'required|integer|min:1',
            'date' => 'required|date',
        ]);

        if (!isset($validated['user_id'])) {
            $validated['user_id'] = 1; // Fallback to first user
        }

        $log = ProductionLog::create($validated);

        return response()->json($log->load(['branch', 'product']), 201);
    }
}
