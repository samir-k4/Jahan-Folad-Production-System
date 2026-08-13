<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetches all employees and includes their branch data
        $employees = Employee::with('branch')->get();
        
        // Returns the data as a JSON response
        return response()->json($employees);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }

        // Validate the request
        $validatedData = $request->validate([
            'status' => 'required|string',
        ]);

        $employee->status = $validatedData['status'];
        $employee->save();

        return response()->json(['message' => 'Employee status updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }

        // Perform a hard delete
        $employee->delete();
        
        return response()->json(['message' => 'Employee permanently deleted'], 200);
    }
}
