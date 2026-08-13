<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Delete all products once before seeding everything fresh
        Product::query()->delete();

        $data = [
            'میخ' => [
                ['name' => '1 x 17', 'weight' => '25KG'],
                ['name' => '1.5 x 17', 'weight' => '25KG'],
                ['name' => '1.5 x 17 (قوطی دار)', 'weight' => '25KG'],
                ['name' => '1 x 10', 'weight' => '25KG'],
                ['name' => '1 x 10 (قوطی دار)', 'weight' => '25KG'],
                ['name' => '1 x 12', 'weight' => '25KG'],
                ['name' => '1 x 12 (قوطی دار)', 'weight' => '25KG'],
                ['name' => '2 x 10', 'weight' => '25KG'],
                ['name' => '2 x 10 (قوطی دار)', 'weight' => '25KG'],
                ['name' => '2 x 10', 'weight' => '12.5KG'],
                ['name' => '2 x 12', 'weight' => '25KG'],
                ['name' => '2 x 12 (قوطی دار)', 'weight' => '25KG'],
                ['name' => '2 x 12', 'weight' => '12.5KG'],
                ['name' => '2 x 14', 'weight' => '25KG'],
                ['name' => '2 x 14 (قوطی دار)', 'weight' => '25KG'],
                ['name' => '2 x 14', 'weight' => '12.5KG'],
                ['name' => '2.5 x 12', 'weight' => '25KG'],
                ['name' => '2.5 x 12 (قوطی دار)', 'weight' => '25KG'],
                ['name' => '2.5 x 12', 'weight' => '12.5KG'],
                ['name' => '2.5 x 10', 'weight' => '25KG'],
                ['name' => '2.5 x 10 (قوطی دار)', 'weight' => '25KG'],
                ['name' => '2.5 x 10', 'weight' => '12.5KG'],
                ['name' => '3 x 10', 'weight' => '25KG'],
                ['name' => '3 x 10 (قوطی دار)', 'weight' => '25KG'],
                ['name' => '3 x 10', 'weight' => '12.5KG'],
                ['name' => '3 x 12', 'weight' => '25KG'],
                ['name' => '3 x 12 (قوطی دار)', 'weight' => '25KG'],
                ['name' => '3 x 12', 'weight' => '12.5KG'],
                ['name' => '4 x 10', 'weight' => '25KG'],
                ['name' => '4 x 10 (قوطی دار)', 'weight' => '25KG'],
                ['name' => '4 x 10', 'weight' => '12.5KG'],
                ['name' => '5 x 8', 'weight' => '25KG'],
                ['name' => '6 x 6', 'weight' => '25KG'],
                ['name' => '7 x 7', 'weight' => '25KG'],
                ['name' => '8 x 5', 'weight' => '25KG'],
            ],

            'سیم جستی' => [
                ['name' => '1 میلی', 'weight' => '25KG'],
                ['name' => '1.5 میلی', 'weight' => '25KG'],
                ['name' => '2 میلی', 'weight' => '25KG'],
                ['name' => '2 میلی', 'weight' => '50KG'],
                ['name' => '2.70 میلی', 'weight' => '25KG'],
                ['name' => '2.70 میلی', 'weight' => '50KG'],
                ['name' => '3 میلی', 'weight' => '25KG'],
                ['name' => '3 میلی', 'weight' => '50KG'],
                ['name' => '4 میلی', 'weight' => '25KG'],
                ['name' => '4 میلی', 'weight' => '50KG'],
                ['name' => '4.5 میلی', 'weight' => '25KG'],
                ['name' => '4.5 میلی', 'weight' => '50KG'],
                ['name' => '5 میلی', 'weight' => '25KG'],
                ['name' => '5 میلی', 'weight' => '50KG'],
            ],

            'سیم خاردار طنابی' => [
                ['name' => 'سیم خاردار طنابی', 'weight' => '5KG'],
                ['name' => 'سیم خاردار طنابی', 'weight' => '3.5KG'],
            ],

            'سیم خاردار حلقه ای' => [
                ['name' => '60 سانتی', 'weight' => '5KG'],
                ['name' => '60 سانتی', 'weight' => '4.300KG'],
                ['name' => '45 سانتی', 'weight' => '5KG'],
                ['name' => '45 سانتی', 'weight' => '4.300KG'],
                ['name' => '70 سانتی', 'weight' => '5KG'],
            ],

            'زنجیر' => [
                ['name' => '2 میلی', 'weight' => '25KG'],
                ['name' => '3 میلی', 'weight' => '25KG'],
                ['name' => '4 میلی', 'weight' => '25KG'],
                ['name' => '5 میلی', 'weight' => '25KG'],
            ],

            'میخ پرچین' => [
                ['name' => 'شماره 3', 'weight' => '25KG'],
                ['name' => 'شماره 4', 'weight' => '25KG'],
                ['name' => 'شماره 5', 'weight' => '25KG'],
            ],
        ];

        foreach ($data as $categoryName => $products) {
            $category = ProductCategory::where('name', $categoryName)->first();

            if (!$category) {
                $this->command->info("Category '{$categoryName}' not found.");
                continue;
            }

            foreach ($products as $product) {
                Product::create([
                    'category_id' => $category->id,
                    'name' => $product['name'],
                    'weight' => $product['weight'],
                    'low_stock_threshold' => 10,
                ]);
            }
        }
    }
}
