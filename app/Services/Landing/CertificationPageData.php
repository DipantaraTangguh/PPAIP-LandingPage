<?php

namespace App\Services\Landing;

use App\Models\Certification;
use App\Models\CertificationMajor;
use App\Models\PageContent;
use App\Support\PublicAssetUrl;

class CertificationPageData
{
    public function __construct(private readonly PublicAssetUrl $asset) {}

    public function payload(): array
    {
        $prodis = CertificationMajor::with('certifications')->ordered()->get();

        return [
            'majorCertifications' => $prodis->map(fn (CertificationMajor $prodi) => [
                'name' => $prodi->name,
                'certifications' => $prodi->certifications->map(fn (Certification $certification) => [
                    'title' => $certification->title,
                    'issuer' => $certification->issuer,
                    'available' => (bool) $certification->is_available,
                    'registerUrl' => $certification->register_url,
                ])->all(),
            ])->all(),
            'aboutDescription' => PageContent::get('sertifikasi.about_description'),
            'bannerImage' => $this->asset->resolve(
                PageContent::get('sertifikasi.banner_image', '/assets/internship-mandiri.png'),
            ),
        ];
    }
}
