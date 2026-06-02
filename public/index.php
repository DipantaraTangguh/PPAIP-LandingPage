<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Kalau app lagi maintenance, Laravel pakai file ini buat short-circuit request.
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Composer dulu, baru lanjut bootstrap Laravel.
require __DIR__.'/../vendor/autoload.php';

// Semua request web mulai dari sini sebelum masuk router.
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->handleRequest(Request::capture());
