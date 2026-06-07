<?php

namespace App\Http\Controllers;

use App\Services\Landing\AboutPageData;
use App\Services\Landing\CertificationPageData;
use App\Services\Landing\InternshipPageData;
use App\Services\Landing\KubTalkPageData;
use App\Services\Landing\PractitionerTeachingPageData;
use App\Services\Landing\WelcomePageData;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    public function welcome(WelcomePageData $data): Response
    {
        return Inertia::render('Welcome', $data->payload());
    }

    public function internshipProgram(InternshipPageData $data): Response
    {
        return Inertia::render('InternshipProgram', $data->payload());
    }

    public function praktisiMengajar(PractitionerTeachingPageData $data): Response
    {
        return Inertia::render('PraktisiMengajar', $data->summary());
    }

    public function praktisiMengajarProdi(
        string $slug,
        PractitionerTeachingPageData $data,
    ): Response {
        return Inertia::render('PraktisiMengajarProdi', $data->detail($slug));
    }

    public function kubTalk(KubTalkPageData $data): Response
    {
        return Inertia::render('KubTalk', $data->payload());
    }

    public function sertifikasi(CertificationPageData $data): Response
    {
        return Inertia::render('SertifikasiMahasiswa', $data->payload());
    }

    public function tentangKami(AboutPageData $data): Response
    {
        return Inertia::render('TentangKami', $data->payload());
    }
}
