<?php

namespace Tests\Feature;

use App\Services\System\ReadinessCheck;
use RuntimeException;
use Tests\TestCase;

class HealthCheckTest extends TestCase
{
    public function test_liveness_check_is_available(): void
    {
        $this->getJson('/up')
            ->assertOk()
            ->assertHeader('X-Request-ID');
    }

    public function test_readiness_check_reports_healthy_dependencies(): void
    {
        $this->getJson('/up/ready')
            ->assertOk()
            ->assertJson([
                'status' => 'ok',
                'checks' => [
                    'database' => 'ok',
                    'cache' => 'ok',
                    'storage' => 'ok',
                ],
            ])
            ->assertHeader('X-Request-ID');
    }

    public function test_readiness_check_returns_service_unavailable_when_a_dependency_fails(): void
    {
        $this->mock(ReadinessCheck::class)
            ->shouldReceive('run')
            ->once()
            ->andReturn([
                'database' => false,
                'cache' => true,
                'storage' => true,
            ]);

        $this->getJson('/up/ready')
            ->assertServiceUnavailable()
            ->assertJson([
                'status' => 'unavailable',
                'checks' => [
                    'database' => 'failed',
                    'cache' => 'ok',
                    'storage' => 'ok',
                ],
            ]);
    }

    public function test_safe_request_id_is_kept_on_the_response(): void
    {
        $this->withHeader('X-Request-ID', 'edge-01:request.123')
            ->getJson('/up')
            ->assertHeader('X-Request-ID', 'edge-01:request.123');
    }

    public function test_exception_response_keeps_the_request_id(): void
    {
        $this->mock(ReadinessCheck::class)
            ->shouldReceive('run')
            ->once()
            ->andThrow(new RuntimeException('Dependency crash'));

        $this->withHeader('X-Request-ID', 'edge-01:failed.123')
            ->getJson('/up/ready')
            ->assertInternalServerError()
            ->assertHeader('X-Request-ID', 'edge-01:failed.123');
    }

    public function test_unsafe_request_id_is_replaced(): void
    {
        $requestId = $this->withHeader('X-Request-ID', 'bad value/123')
            ->getJson('/up')
            ->headers
            ->get('X-Request-ID');

        $this->assertMatchesRegularExpression(
            '/\A[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\z/',
            $requestId,
        );
    }
}
