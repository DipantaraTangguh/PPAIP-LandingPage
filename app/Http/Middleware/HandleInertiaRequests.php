<?php

namespace App\Http\Middleware;

use App\Models\FooterLink;
use App\Models\NavLink;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

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
