<?php

namespace App\Http\Controllers;

use App\Services\Landing\AboutPageData;
use App\Services\Landing\CertificationPageData;
use App\Services\Landing\IndustryChallengeClassPageData;
use App\Services\Landing\InternshipPageData;
use App\Services\Landing\KubTalkPageData;
use App\Services\Landing\PractitionerTeachingPageData;
use App\Services\Landing\WelcomePageData;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    public function home(WelcomePageData $data): Response
    {
        return Inertia::render('Welcome', $data->payload());
    }

    public function internship(InternshipPageData $data): Response
    {
        return Inertia::render('InternshipProgram', $data->payload());
    }

    public function practitionerTeaching(PractitionerTeachingPageData $data): Response
    {
        return Inertia::render('PractitionerTeaching', $data->summary());
    }

    public function practitionerTeachingDetail(string $slug, PractitionerTeachingPageData $data): Response
    {
        $payload = $data->detail($slug);

        abort_if($payload['detail'] === null, 404);

        return Inertia::render('PractitionerTeachingMajor', $payload);
    }

    public function kubTalk(KubTalkPageData $data): Response
    {
        return Inertia::render('KubTalk', $data->payload());
    }

    public function industryChallengeClass(IndustryChallengeClassPageData $data): Response
    {
        return Inertia::render('IndustryChallengeClass', $data->payload());
    }

    public function certification(CertificationPageData $data): Response
    {
        return Inertia::render('StudentCertification', $data->payload());
    }

    public function about(AboutPageData $data): Response
    {
        return Inertia::render('AboutUs', $data->payload());
    }
}
