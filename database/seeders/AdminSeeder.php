<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'username'=> 'admin',
            'avatar'=> 'default.svg',
            'phone'=> '89204534224',
            'address'=>'Irkutsk',
            'email'=>'admin@gmail.com',
            'password'=> Hash::make('password'),
            'role'=>'admin',
            'status'=>'active',
        ]);
    }
}
