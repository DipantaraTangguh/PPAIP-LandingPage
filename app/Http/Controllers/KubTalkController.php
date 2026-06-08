<?php

namespace App\Http\Controllers;

use App\Services\Landing\KubTalkPageData;
use Inertia\Inertia;
use Inertia\Response;

class KubTalkController extends Controller
{
    public function __invoke(KubTalkPageData $data): Response
    {
        return Inertia::render('KubTalk', $data->payload());
    }
}
