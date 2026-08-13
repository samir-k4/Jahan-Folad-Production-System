<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'branch_id',
        'full_name',
        'position',
        'salary',
        'joining_date',
        'national_id',
        'status',
    ]; // Notice we removed 'employee_code' from here because the user won't type it!

    // THE LOGIC: Automatically generate the code before saving
    protected static function booted()
    {
        static::creating(function ($employee) {
            // Generates "JFC-" + a random number between 1000 and 9999
            $employee->employee_ID = 'JFC-' . rand(1000, 9999);
        });
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function overtimes()
    {
        return $this->hasMany(Overtime::class);
    }
}