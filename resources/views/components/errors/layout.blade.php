@props([
    'code',
    'title',
    'message',
    'eyebrow' => 'Oops',
])

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="robots" content="noindex, nofollow">
        <title>{{ $code }} - {{ $title }} | {{ config('app.name', 'PPAIP Universitas Bakrie') }}</title>
        <link rel="icon" href="{{ asset('favicon.ico') }}" sizes="any">
        <link rel="shortcut icon" href="{{ asset('favicon.ico') }}">
        @vite(['resources/css/error.css'])
    </head>
    <body class="min-h-screen bg-surface-muted text-gray-900 antialiased">
        <main class="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16">
            <div class="absolute inset-0">
                <img
                    src="{{ asset('assets/bakrie-banner.jpg') }}"
                    alt=""
                    aria-hidden="true"
                    class="h-full w-full object-cover"
                    decoding="async"
                    fetchpriority="high"
                >
                <div class="absolute inset-0 bg-gradient-to-br from-brand-primary/95 via-brand-dark/88 to-brand-night/92"></div>
                <div class="absolute -left-24 top-16 h-72 w-72 rounded-full bg-brand-gold/20 blur-3xl"></div>
                <div class="absolute -right-20 bottom-8 h-80 w-80 rounded-full bg-brand-orange/20 blur-3xl"></div>
            </div>

            <section class="relative z-10 w-full max-w-3xl rounded-[2rem] border border-white/20 bg-white/92 p-6 text-center shadow-[0_32px_120px_rgba(18,5,5,0.34)] backdrop-blur md:p-10">
                <a href="{{ route('home') }}" class="mx-auto mb-8 inline-flex items-center justify-center">
                    <img
                        src="{{ asset('assets/logo-bakrie.png') }}"
                        alt="Universitas Bakrie"
                        class="h-12 w-auto"
                        decoding="async"
                    >
                </a>

                <p class="mb-3 text-xs font-black uppercase tracking-[0.26em] text-brand-copper">
                    {{ $eyebrow }}
                </p>
                <div class="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-[1.75rem] bg-brand-dark text-4xl font-black text-white shadow-lg shadow-brand-dark/25">
                    {{ $code }}
                </div>
                <h1 class="text-3xl font-black tracking-tight text-brand-heading md:text-5xl">
                    {{ $title }}
                </h1>
                <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 md:text-base">
                    {{ $message }}
                </p>

                <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <a
                        href="{{ route('home') }}"
                        class="inline-flex w-full items-center justify-center rounded-full bg-brand-dark px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 sm:w-auto"
                    >
                        Kembali ke Beranda
                    </a>
                    <a
                        href="javascript:history.back()"
                        class="inline-flex w-full items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-bold text-gray-800 shadow-sm transition hover:border-brand-dark hover:text-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 sm:w-auto"
                    >
                        Kembali Sebelumnya
                    </a>
                </div>

                <p class="mt-8 text-xs font-medium text-gray-400">
                    Kalau masalah masih muncul, silakan hubungi tim PPAIP Universitas Bakrie.
                </p>
            </section>
        </main>
    </body>
</html>
