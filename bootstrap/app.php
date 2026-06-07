<?php

use App\Http\Controllers\HealthController;
use App\Http\Middleware\AddRequestId;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Support\Facades\Context;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: function (): void {
            Route::get('/up/ready', [HealthController::class, 'readiness'])
                ->name('health.readiness');
        },
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->append(AddRequestId::class);

        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->respond(function (Response $response): Response {
            if (Context::has('request_id')) {
                $response->headers->set(
                    'X-Request-ID',
                    (string) Context::get('request_id'),
                );
            }

            return $response;
        });
    })->create();
