<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class DatabaseSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_is_not_created_without_configured_credentials(): void
    {
        config()->set('ppaip.admin.email');
        config()->set('ppaip.admin.password');

        $this->seed(DatabaseSeeder::class);

        $this->assertDatabaseCount('users', 0);
    }

    public function test_admin_is_created_from_configured_credentials(): void
    {
        config()->set('ppaip.admin.name', 'Secure Admin');
        config()->set('ppaip.admin.email', 'admin@example.com');
        config()->set('ppaip.admin.password', 'secure-password-123');

        $this->seed(DatabaseSeeder::class);

        $admin = User::query()->where('email', 'admin@example.com')->firstOrFail();

        $this->assertSame('Secure Admin', $admin->name);
        $this->assertTrue($admin->is_admin);
        $this->assertTrue(Hash::check('secure-password-123', $admin->password));
    }
}
