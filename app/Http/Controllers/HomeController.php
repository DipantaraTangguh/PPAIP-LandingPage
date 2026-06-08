<?php

namespace App\Http\Controllers;

use App\Services\Landing\WelcomePageData;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(WelcomePageData $data): Response
    {
        return Inertia::render('Welcome', $data->payload());
    }
}
