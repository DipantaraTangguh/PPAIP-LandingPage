<?php

namespace App\Http\Controllers;

use App\Services\Landing\InternshipPageData;
use Inertia\Inertia;
use Inertia\Response;

class InternshipController extends Controller
{
    public function __invoke(InternshipPageData $data): Response
    {
        return Inertia::render('InternshipProgram', $data->payload());
    }
}
