<?php

namespace App\Http\Controllers;

use App\Services\Landing\AboutPageData;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function __invoke(AboutPageData $data): Response
    {
        return Inertia::render('TentangKami', $data->payload());
    }
}
