<?php

namespace App\Http\Controllers;

use App\Models\ProductionBatch;
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
            'user_id' => 'sometimes|exists:users,id',
            'quantity' => 'required|integer|min:1',
            'date' => 'required|date',
            'description' => 'nullable|string|max:1000',
        ]);

        if (!isset($validated['user_id'])) {
            $validated['user_id'] = 1;
        }

        $description = trim((string) ($validated['description'] ?? ''));
        $batch = null;
        if ($description !== '') {
            $batch = ProductionBatch::create([
                'branch_id' => $validated['branch_id'],
                'user_id' => $validated['user_id'],
                'date' => $validated['date'],
                'description' => $description,
            ]);
        }

        $log = ProductionLog::create([
            ...$validated,
            'production_batch_id' => $batch?->id,
        ]);

        return response()->json($log->load(['branch', 'product']), 201);
    }

    public function storeMultiple(Request $request)
    {
        $validated = $request->validate([
            'branch_id' => 'required|exists:branches,id',
            'date' => 'required|date',
            'description' => 'nullable|string|max:1000',
            'products' => 'required|array|min:1',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
            'products.*.weight' => 'nullable|string|max:255',
            'user_id' => 'sometimes|exists:users,id',
        ]);

        $userId = $validated['user_id'] ?? 1;
        $description = trim((string) ($validated['description'] ?? ''));
        $batch = null;
        if ($description !== '') {
            $batch = ProductionBatch::create([
                'branch_id' => $validated['branch_id'],
                'user_id' => $userId,
                'date' => $validated['date'],
                'description' => $description,
            ]);
        }

        $createdLogs = [];

        foreach ($validated['products'] as $productEntry) {
            $log = ProductionLog::create([
                'branch_id' => $validated['branch_id'],
                'product_id' => $productEntry['product_id'],
                'user_id' => $userId,
                'quantity' => $productEntry['quantity'],
                'date' => $validated['date'],
                'production_batch_id' => $batch?->id,
            ]);

            $createdLogs[] = $log->load(['branch', 'product']);
        }

        return response()->json([
            'message' => 'Production records created successfully.',
            'data' => $createdLogs,
            'batch' => $batch?->load(['branch', 'user']),
        ], 201);
    }
}
