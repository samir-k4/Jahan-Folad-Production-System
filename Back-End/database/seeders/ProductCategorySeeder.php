<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use Illuminate\Database\Seeder;

class ProductCategorySeeder extends Seeder
{
    public function run(): void
    {
        $names = [
            'میخ',
            'سیم جستی',
            'سیم خاردار طنابی',
            'سیم خاردار حلقه ای',
            'زنجیر',
            'میخ پرچین',
            'پیچ اسکرو',
        ];

        foreach ($names as $name) {
            ProductCategory::firstOrCreate(['name' => $name]);
        }
    }
}
