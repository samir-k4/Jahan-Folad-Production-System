<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Overtime extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'employee_id',
        'date',
        'hours',
    ];

    /**
     * Get the employee that the overtime belongs to.
     */
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
