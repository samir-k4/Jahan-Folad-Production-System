<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id(); // Database Primary Key
            $table->string('employee_ID')->unique(); // Company specific ID (e.g., JF-001)
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->string('full_name');
            $table->string('position')->nullable();
            $table->decimal('salary', 10, 2); // Allows up to 10 digits and 2 decimals (e.g., 50000.00)
            $table->date('joining_date'); // The exact date they started
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
