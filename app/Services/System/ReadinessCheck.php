<?php

namespace App\Services\System;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use RuntimeException;
use Throwable;

class ReadinessCheck
{
    /**
     * @return array<string, bool>
     */
    public function run(): array
    {
        return [
            'database' => $this->passes('database', fn () => DB::select('select 1')),
            'cache' => $this->passes('cache', fn () => $this->checkCache()),
            'storage' => $this->passes('storage', fn () => $this->checkStorage()),
        ];
    }

    private function passes(string $name, callable $check): bool
    {
        try {
            $check();

            return true;
        } catch (Throwable $exception) {
            Log::warning('Readiness check gagal.', [
                'check' => $name,
                'exception' => $exception,
            ]);

            return false;
        }
    }

    private function checkCache(): void
    {
        $key = 'readiness:'.Str::uuid();

        try {
            Cache::put($key, 'ok', 10);

            if (Cache::get($key) !== 'ok') {
                throw new RuntimeException('Cache round-trip gagal.');
            }
        } finally {
            Cache::forget($key);
        }
    }

    private function checkStorage(): void
    {
        $path = storage_path('framework');

        if (! is_dir($path) || ! is_writable($path)) {
            throw new RuntimeException('Storage framework tidak bisa ditulis.');
        }
    }
}
