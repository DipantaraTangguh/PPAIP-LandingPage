<?php

namespace App\Http\Middleware;

use App\Models\FooterLink;
use App\Models\NavLink;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'navLinks' => fn () => NavLink::ordered()
                ->get(['label', 'href'])
                ->map(fn (NavLink $l) => ['label' => $l->label, 'href' => $l->href])
                ->all(),
            'footerLinks' => fn () => FooterLink::ordered()
                ->get(['group_index', 'label', 'url'])
                ->groupBy('group_index')
                ->sortKeys()
                ->map(fn ($items) => [
                    'items' => $items->map(fn (FooterLink $i) => [
                        'label' => $i->label,
                        'url' => $i->url,
                    ])->values()->all(),
                ])
                ->values()
                ->all(),
        ];
    }
}
