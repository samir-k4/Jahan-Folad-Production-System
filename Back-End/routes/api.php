<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\ProductionLogController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/employees', [EmployeeController::class, 'index']);
Route::put('/employees/{id}', [EmployeeController::class, 'update']);
Route::delete('/employees/{id}', [EmployeeController::class, 'destroy']);

Route::apiResource('categories', ProductCategoryController::class);
Route::apiResource('product-categories', ProductCategoryController::class);
Route::apiResource('products', ProductController::class);
Route::get('/branches', [BranchController::class, 'index']);
Route::post('/productions', [ProductionLogController::class, 'storeMultiple']);
Route::apiResource('production-logs', ProductionLogController::class)->only(['index', 'store']);
