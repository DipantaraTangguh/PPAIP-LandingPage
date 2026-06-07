<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @php
            $privatePage = request()->is(
                'admin*',
                'dashboard',
                'profile*',
                'login',
                'forgot-password',
                'reset-password*',
                'verify-email*',
                'confirm-password',
            );
            $siteName = config('app.name', 'PPAIP Universitas Bakrie');
            $seo = data_get($page, 'props.seo', config('seo.default'));
            $pageTitle = $seo['title'] ?? $siteName;
            $fullTitle = str_contains($pageTitle, $siteName)
                ? $pageTitle
                : "{$pageTitle} - {$siteName}";
            $defaultDescription = $seo['description'] ?? config('seo.default.description');
            $image = data_get($page, 'props.bannerImage', $seo['image'] ?? config('seo.default.image'));
            $defaultImage = str_starts_with($image, 'http')
                ? $image
                : asset(ltrim($image, '/'));
        @endphp

        <title inertia>{{ $fullTitle }}</title>
        <meta inertia="description" name="description" content="{{ $defaultDescription }}">
        <meta inertia="robots" name="robots" content="{{ $privatePage ? 'noindex, nofollow' : 'index, follow' }}">
        <link inertia="canonical" rel="canonical" href="{{ url()->current() }}">
        <meta inertia="og:type" property="og:type" content="website">
        <meta inertia="og:site_name" property="og:site_name" content="{{ $siteName }}">
        <meta inertia="og:title" property="og:title" content="{{ $fullTitle }}">
        <meta inertia="og:description" property="og:description" content="{{ $defaultDescription }}">
        <meta inertia="og:url" property="og:url" content="{{ url()->current() }}">
        <meta inertia="og:image" property="og:image" content="{{ $defaultImage }}">
        <meta inertia="twitter:card" name="twitter:card" content="summary_large_image">
        <meta inertia="twitter:title" name="twitter:title" content="{{ $fullTitle }}">
        <meta inertia="twitter:description" name="twitter:description" content="{{ $defaultDescription }}">
        <meta inertia="twitter:image" name="twitter:image" content="{{ $defaultImage }}">
        <link rel="icon" href="{{ asset('favicon.ico') }}" sizes="any">
        <link rel="shortcut icon" href="{{ asset('favicon.ico') }}">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
