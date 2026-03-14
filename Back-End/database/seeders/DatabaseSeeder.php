<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Branch;
use App\Models\Employee;
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
        Employee::truncate();
        Branch::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $faker = Faker::create();

        // Step 1: Create 2 Branches with Dari names
        $branch1 = Branch::create([
            'name' => 'نمایندگی کابل',
            'location' => 'کابل, افغانستان',
        ]);

        $branch2 = Branch::create([
            'name' => 'نمایندگی مزار',
            'location' => 'مزار شریف, افغانستان',
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
                'national_id' => $faker->numerify('#############'), // 13-digit random number
                'status' => 'فعال',
            ]);
        }
    }
}
