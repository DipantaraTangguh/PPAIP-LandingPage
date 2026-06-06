<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use RuntimeException;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $this->seedAdmin();

        $this->call(CmsContentSeeder::class);
    }

    private function seedAdmin(): void
    {
        $email = config('ppaip.admin.email');
        $password = config('ppaip.admin.password');

        if (! $email && ! $password) {
            $this->command?->warn('Admin account skipped. Set ADMIN_EMAIL and ADMIN_PASSWORD before seeding.');

            return;
        }

        if (! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new RuntimeException('ADMIN_EMAIL must contain a valid email address.');
        }

        if (! is_string($password) || strlen($password) < 12) {
            throw new RuntimeException('ADMIN_PASSWORD must contain at least 12 characters.');
        }

        User::updateOrCreate(
            ['email' => $email],
            [
                'name' => config('ppaip.admin.name'),
                'password' => Hash::make($password),
                'is_admin' => true,
            ],
        );
    }
}
