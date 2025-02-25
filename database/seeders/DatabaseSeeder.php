<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // Create roles
        $roles = [
            ['name' => 'general_manager', 'description' => 'General Manager with all privileges'],
            ['name' => 'magazine_manager', 'description' => 'Manager overseeing the magazine operations'],
            ['name' => 'magazine_employee', 'description' => 'Employee working in the magazine'],
            ['name' => 'it_manager', 'description' => 'IT Manager overseeing IT operations'],
            ['name' => 'it_employee', 'description' => 'Employee working in IT services'],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }

        // Seed Services Table
        DB::table('services')->insert([
            ['name' => 'Cleaning Service', 'description' => 'Professional cleaning services', 'type' => 'service'],
            ['name' => 'IT service', 'description' => 'Professional techniciens services', 'type' => 'service'],
            ['name' => 'Magazine A', 'description' => 'Magazine A services', 'type' => 'magazine'],
            ['name' => 'Maintenance Service', 'description' => 'Building maintenance services', 'type' => 'service'],
            ['name' => 'Administration service', 'description' => 'Administrative affairs service', 'type' => 'service'],
            ['name' => 'HR service', 'description' => 'Human resources service', 'type' => 'service'],
        ]);

        // Seed Users Table
        DB::table('users')->insert([
            [
                'name' => 'Admin User',
                'email' => 'admin@umpd.com',
                'password' => Hash::make('password'),
                'role_id' => 1, // admin role
                'service_id' => null,
            ],
            [
                'name' => 'user 1',
                'email' => 'user1@umpd.com',
                'password' => Hash::make('password'),
                'role_id' => 2, // editor role
                'service_id' => 1, // Cleaning Service
            ],
            [
                'name' => 'user 2',
                'email' => 'user2@umpd.com',
                'password' => Hash::make('password'),
                'role_id' => 3, // user role
                'service_id' => 2, // Magazine A
            ],
            [
                'name' => 'user 3',
                'email' => 'user3@umpd.com',
                'password' => Hash::make('password'),
                'role_id' => 4, // user role
                'service_id' => 2, // Magazine A
            ],
            [
                'name' => 'user 4',
                'email' => 'user5@umpd.com',
                'password' => Hash::make('password'),
                'role_id' => 5, // user role
                'service_id' => 2, // Magazine A
            ],
        ]);

        // Seed Products Table
        DB::table('products')->insert([
            [
                'name' => 'Mop',
                'serial_number' => 'SN-001',
                'Supplier' => 'Supplier A',
                'quantity' => 50,
                'price' => 15.99,
                'served_to' => 1, // Cleaning Service
            ],
            [
                'name' => 'Broom',
                'serial_number' => 'SN-002',
                'Supplier' => 'Supplier B',
                'quantity' => 30,
                'price' => 9.99,
                'served_to' => 1, // Cleaning Service
            ],
            [
                'name' => 'Magazine Issue 1',
                'serial_number' => 'ISSN-001',
                'Supplier' => 'Publisher X',
                'quantity' => 100,
                'price' => 5.99,
                'served_to' => 2, // Magazine A
            ],
        ]);

        // Seed Movements Table
        DB::table('movements')->insert([
            [
                'product_id' => 1, // Mop
                'from_service_id' => 1, // Cleaning Service
                'to_service_id' => 3, // Maintenance Service
                'quantity' => 10,
                'movement_date' => now(),
                'user_id' => 1, // Admin User
                'note' => 'Moved 10 mops to Maintenance Service',
            ],
            [
                'product_id' => 2, // Broom
                'from_service_id' => 1, // Cleaning Service
                'to_service_id' => 3, // Maintenance Service
                'quantity' => 5,
                'movement_date' => now(),
                'user_id' => 2, // Editor User
                'note' => 'Moved 5 brooms to Maintenance Service',
            ],
        ]);

        // Seed Actions Table
        DB::table('actions')->insert([
            [
                'product_id' => 1, // Mop
                'user_id' => 1, // Admin User
                'action' => 'moved',
                'details' => 'Moved 10 mops from Cleaning Service to Maintenance Service',
            ],
            [
                'product_id' => 2, // Broom
                'user_id' => 2, // Editor User
                'action' => 'moved',
                'details' => 'Moved 5 brooms from Cleaning Service to Maintenance Service',
            ],
        ]);

        // Seed Notifications Table
        DB::table('notifications')->insert([
            [
                'user_id' => 1, // Admin User
                'type' => 'info',
                'message' => 'A new product has been added to the inventory.',
                'is_read' => false,
            ],
            [
                'user_id' => 2, // Editor User
                'type' => 'warning',
                'message' => 'Low stock alert for Mop (SN-001).',
                'is_read' => false,
            ],
        ]);

    }
}
