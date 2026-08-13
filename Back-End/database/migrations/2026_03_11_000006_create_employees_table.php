<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('employee_ID')->unique();
            $table->foreignId('branch_id')->constrained();
            $table->string('full_name');
            $table->string('position')->nullable();
            $table->decimal('salary', 10, 2);
            $table->date('joining_date');
            $table->string('national_id')->nullable()->unique();
            $table->string('status')->default('فعال');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
