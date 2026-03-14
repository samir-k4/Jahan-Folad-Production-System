<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'category_id',
        'name',
        'weight',
    ];

    /**
     * Get the category that owns the product.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the production logs for the product.
     */
    public function productionLogs()
    {
        return $this->hasMany(ProductionLog::class);
    }

    /**
     * Get the inventories for the product.
     */
    public function inventories()
    {
        return $this->hasMany(Inventory::class);
    }
}
