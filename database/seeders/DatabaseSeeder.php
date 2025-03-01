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
                'name' => 'Laptop - Dell XPS 15',
                'serial_number' => 'LAP-001',
                'supplier' => 'Dell Inc.',
                'quantity' => 20,
                'price' => 1899.99,
                'served_to' => 3, // IT Department
            ],
            [
                'name' => 'Mechanical Keyboard - Keychron K6',
                'serial_number' => 'KB-001',
                'supplier' => 'Keychron',
                'quantity' => 50,
                'price' => 89.99,
                'served_to' => 3, // IT Department
            ],
            [
                'name' => 'Wireless Mouse - Logitech MX Master 3',
                'serial_number' => 'MOU-001',
                'supplier' => 'Logitech',
                'quantity' => 40,
                'price' => 99.99,
                'served_to' => 3, // IT Department
            ],
            [
                'name' => 'Monitor - LG UltraFine 27" 4K',
                'serial_number' => 'MON-001',
                'supplier' => 'LG Electronics',
                'quantity' => 25,
                'price' => 549.99,
                'served_to' => 3, // IT Department
            ],
            [
                'name' => 'External SSD - Samsung T7 1TB',
                'serial_number' => 'SSD-001',
                'supplier' => 'Samsung',
                'quantity' => 35,
                'price' => 129.99,
                'served_to' => 3, // IT Department
            ],
            [
                'name' => 'Webcam - Logitech C920',
                'serial_number' => 'CAM-001',
                'supplier' => 'Logitech',
                'quantity' => 45,
                'price' => 79.99,
                'served_to' => 3, // IT Department
            ],
            [
                'name' => 'Router - TP-Link AX6000',
                'serial_number' => 'ROU-001',
                'supplier' => 'TP-Link',
                'quantity' => 15,
                'price' => 249.99,
                'served_to' => 3, // IT Department
            ],
            [
                'name' => 'Headphones - Sony WH-1000XM4',
                'serial_number' => 'HP-001',
                'supplier' => 'Sony',
                'quantity' => 30,
                'price' => 349.99,
                'served_to' => 1, // IT Department
            ],
            [
                'name' => 'Graphics Tablet - Wacom Intuos Pro',
                'serial_number' => 'TAB-001',
                'supplier' => 'Wacom',
                'quantity' => 20,
                'price' => 379.99,
                'served_to' => 3, // IT Department
            ],
            [
                'name' => 'Docking Station - CalDigit TS4',
                'serial_number' => 'DOC-001',
                'supplier' => 'CalDigit',
                'quantity' => 18,
                'price' => 349.99,
                'served_to' => 2, // IT Department
            ],
            [
                'name' => 'NAS Storage - Synology DS920+',
                'serial_number' => 'NAS-001',
                'supplier' => 'Synology',
                'quantity' => 10,
                'price' => 549.99,
                'served_to' => 3, // IT Department
            ],
            [
                'name' => 'USB-C Hub - Anker PowerExpand 8-in-1',
                'serial_number' => 'HUB-001',
                'supplier' => 'Anker',
                'quantity' => 50,
                'price' => 79.99,
                'served_to' => 6, // IT Department
            ],
            [
                'name' => 'Smartphone - iPhone 14 Pro',
                'serial_number' => 'SP-001',
                'supplier' => 'Apple',
                'quantity' => 15,
                'price' => 1099.99,
                'served_to' => 3, // IT Department
            ],
            [
                'name' => 'Portable Projector - Anker Nebula Capsule II',
                'serial_number' => 'PROJ-001',
                'supplier' => 'Anker',
                'quantity' => 10,
                'price' => 469.99,
                'served_to' => 4, // IT Department
            ],
            [
                'name' => 'Smartwatch - Garmin Fenix 7',
                'serial_number' => 'SW-001',
                'supplier' => 'Garmin',
                'quantity' => 25,
                'price' => 699.99,
                'served_to' => 1, // IT Department
            ],
            [
                'name' => 'Microphone - Shure SM7B',
                'serial_number' => 'MIC-001',
                'supplier' => 'Shure',
                'quantity' => 12,
                'price' => 399.99,
                'served_to' => 3, // IT Department
            ],
            [
                'name' => 'Server Rack - StarTech 42U',
                'serial_number' => 'SRV-001',
                'supplier' => 'StarTech',
                'quantity' => 5,
                'price' => 1299.99,
                'served_to' => 3, // IT Department
            ],
            [
                'name' => 'Wireless Charger - Belkin BoostCharge',
                'serial_number' => 'WC-001',
                'supplier' => 'Belkin',
                'quantity' => 40,
                'price' => 49.99,
                'served_to' => 3, // IT Department
            ],
            [
                'name' => 'Smart Speaker - Amazon Echo Dot (5th Gen)',
                'serial_number' => 'SPK-001',
                'supplier' => 'Amazon',
                'quantity' => 30,
                'price' => 49.99,
                'served_to' => 3, // IT Department
            ]
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
