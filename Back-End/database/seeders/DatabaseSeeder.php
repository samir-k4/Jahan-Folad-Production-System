<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Branch;
use App\Models\Employee;
use App\Models\Category;
use App\Models\Product;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Clear tables before seeding to prevent conflicts
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        \App\Models\User::truncate();
        Employee::truncate();
        Branch::truncate();
        Category::truncate();
        Product::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Create a default user for production logs
        \App\Models\User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ]);

        $faker = Faker::create();

        // Step 1: Create 2 Branches with real names
        $branch1 = Branch::create([
            'name' => 'جهان فولاد',
            'location' => 'پارک های صنعتی',
        ]);

        $branch2 = Branch::create([
            'name' => 'گاز گروپ',
            'location' => 'سه راهی گاز گروپ',
        ]);

        $branches = [$branch1->id, $branch2->id];
        
        // Data for creating employees
        $dari_names = ['احمد', 'محمود', 'شفیق', 'فرید', 'جمشید', 'نصیر', 'حسیب'];
        $dari_positions = ['ولدر', 'اپرایتور', 'تخنیکر', 'برقکار', 'راننده'];

        // Step 2: Create 5 Employees with Dari data
        for ($i = 0; $i < 5; $i++) {
            Employee::create([
                'branch_id' => $faker->randomElement($branches),
                'full_name' => $faker->randomElement($dari_names),
                'position' => $faker->randomElement($dari_positions),
                'salary' => $faker->numberBetween(15000, 40000),
                'joining_date' => $faker->date(),
                'national_id' => $faker->numerify('#############'),
                'status' => 'فعال',
            ]);
        }

        // Step 3: Seed Categories and Products

        // 1. میخ
        $nailCategory = Category::create(['name' => 'میخ']);
        $nailSizes = ['1 * 14', '1 * 17', '1.5 * 10', '1.5 * 17', '1.5 * 17 بی سر', '2 * 10', '2 * 14', '2 * 14 بی سر', '2.5 * 10', '2.5 * 12'];
        foreach ($nailSizes as $size) {
            Product::create(['category_id' => $nailCategory->id, 'name' => $size, 'weight' => '12.5kg']);
            Product::create(['category_id' => $nailCategory->id, 'name' => $size, 'weight' => '25kg']);
        }

        // 2. سیم جستی
        $wireJastiCategory = Category::create(['name' => 'سیم جستی']);
        $wireJastiSizes = ['1mm', '2mm', '3mm', '4mm', '5mm'];
        foreach ($wireJastiSizes as $size) {
            Product::create(['category_id' => $wireJastiCategory->id, 'name' => $size, 'weight' => '25kg']);
            Product::create(['category_id' => $wireJastiCategory->id, 'name' => $size, 'weight' => '50kg']);
        }

        // 3. سیم سیاه
        $wireBlackCategory = Category::create(['name' => 'سیم سیاه']);
        Product::create(['category_id' => $wireBlackCategory->id, 'name' => 'سیم سیاه معمولی', 'weight' => null]);

        // 4. سیم خاردار حلقه ای
        $barbedRingCategory = Category::create(['name' => 'سیم خاردار حلقه ای']);
        Product::create(['category_id' => $barbedRingCategory->id, 'name' => '50cm', 'weight' => '3kg']);
        Product::create(['category_id' => $barbedRingCategory->id, 'name' => '50cm', 'weight' => '6kg']);
        Product::create(['category_id' => $barbedRingCategory->id, 'name' => '70cm', 'weight' => '3kg']);
        Product::create(['category_id' => $barbedRingCategory->id, 'name' => '70cm', 'weight' => '6kg']);

        // 5. سیم خاردار طنابی
        $barbedRopeCategory = Category::create(['name' => 'سیم خاردار طنابی']);
        Product::create(['category_id' => $barbedRopeCategory->id, 'name' => '2mm', 'weight' => '3kg']);
        Product::create(['category_id' => $barbedRopeCategory->id, 'name' => '2mm', 'weight' => '5kg']);

        // 6. میخ پرچین
        $rivetCategory = Category::create(['name' => 'میخ پرچین']);
        $rivetSizes = ['NUM 3', 'NUM 4', 'NUM 5'];
        foreach ($rivetSizes as $size) {
            Product::create(['category_id' => $rivetCategory->id, 'name' => $size, 'weight' => null]);
        }

        // 7. زنجیر
        $chainCategory = Category::create(['name' => 'زنجیر']);
        $chainSizes = ['3mm', '4mm', '5mm'];
        foreach ($chainSizes as $size) {
            Product::create(['category_id' => $chainCategory->id, 'name' => $size, 'weight' => '25kg']);
        }
    }
}
