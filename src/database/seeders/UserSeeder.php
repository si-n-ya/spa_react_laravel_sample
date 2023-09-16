<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'admin',
                'email' => 'admin@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make(12345678),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'yamada',
                'email' => 'yamada@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make(12345678),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tanaka',
                'email' => 'tanaka@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make(12345678),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}