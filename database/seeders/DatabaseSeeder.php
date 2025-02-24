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

        DB::table('roles')->insert([
            ['name' => 'admin', 'description' => 'Administrator with full access'],
            ['name' => 'editor', 'description' => 'Editor with limited access'],
            ['name' => 'user', 'description' => 'Regular user with basic access'],
        ]);

        // Seed Services Table
        DB::table('services')->insert([
            ['name' => 'Cleaning Service', 'description' => 'Professional cleaning services', 'type' => 'service'],
            ['name' => 'Magazine A', 'description' => 'Monthly magazine publication', 'type' => 'magazine'],
            ['name' => 'Maintenance Service', 'description' => 'Building maintenance services', 'type' => 'service'],
        ]);

        // Seed Users Table
        DB::table('users')->insert([
            [
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
                'role_id' => 1, // admin role
                'service_id' => null,
            ],
            [
                'name' => 'Editor User',
                'email' => 'editor@example.com',
                'password' => Hash::make('password'),
                'role_id' => 2, // editor role
                'service_id' => 1, // Cleaning Service
            ],
            [
                'name' => 'Regular User',
                'email' => 'user@example.com',
                'password' => Hash::make('password'),
                'role_id' => 3, // user role
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
