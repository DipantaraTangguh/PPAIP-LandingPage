<?php

namespace App\Http\Controllers;

use App\Services\Landing\PractitionerTeachingPageData;
use Inertia\Inertia;
use Inertia\Response;

class PractitionerTeachingController extends Controller
{
    public function index(PractitionerTeachingPageData $data): Response
    {
        return Inertia::render('PraktisiMengajar', $data->summary());
    }

    public function show(string $slug, PractitionerTeachingPageData $data): Response
    {
        $payload = $data->detail($slug);

        abort_if($payload['detail'] === null, 404);

        return Inertia::render('PraktisiMengajarProdi', $payload);
    }
}
