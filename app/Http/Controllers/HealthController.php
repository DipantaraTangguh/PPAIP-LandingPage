<?php

namespace App\Http\Controllers;

use App\Services\System\ReadinessCheck;
use Illuminate\Http\JsonResponse;

class HealthController extends Controller
{
    public function readiness(ReadinessCheck $readiness): JsonResponse
    {
        $checks = $readiness->run();
        $isReady = ! in_array(false, $checks, true);

        return response()->json([
            'status' => $isReady ? 'ok' : 'unavailable',
            'checks' => array_map(
                fn (bool $passed): string => $passed ? 'ok' : 'failed',
                $checks,
            ),
        ], $isReady ? 200 : 503);
    }
}
