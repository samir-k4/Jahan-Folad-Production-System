<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'location',
    ];

    /**
     * Get the employees for the branch.
     */
    public function employees()
    {
        return $this->hasMany(Employee::class);
    }

    /**
     * Get the production logs for the branch.
     */
    public function productionLogs()
    {
        return $this->hasMany(ProductionLog::class);
    }

    /**
     * Get the inventories for the branch.
     */
    public function inventories()
    {
        return $this->hasMany(Inventory::class);
    }
}
