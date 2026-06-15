<?php

namespace App\Http\Controllers;

use App\Services\Landing\IndustryChallengeClassPageData;
use Inertia\Inertia;
use Inertia\Response;

class IndustryChallengeClassController extends Controller
{
    public function __invoke(IndustryChallengeClassPageData $data): Response
    {
        return Inertia::render('IndustryChallengeClass', $data->payload());
    }
}
