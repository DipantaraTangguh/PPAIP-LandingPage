<?php

namespace App\Http\Controllers;

use App\Services\Landing\CertificationPageData;
use Inertia\Inertia;
use Inertia\Response;

class CertificationController extends Controller
{
    public function __invoke(CertificationPageData $data): Response
    {
        return Inertia::render('StudentCertification', $data->payload());
    }
}
