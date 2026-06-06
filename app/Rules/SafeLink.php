<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class SafeLink implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if ($value === null || $value === '') {
            return;
        }

        if (! is_string($value) || preg_match('/[\x00-\x1F\x7F]/', $value)) {
            $fail('The :attribute contains an invalid link.');

            return;
        }

        if ($value === '#' || preg_match('/^#[A-Za-z][A-Za-z0-9_-]*$/', $value)) {
            return;
        }

        if (str_starts_with($value, '/') && ! str_starts_with($value, '//')) {
            return;
        }

        if (filter_var($value, FILTER_VALIDATE_URL)) {
            $scheme = strtolower((string) parse_url($value, PHP_URL_SCHEME));

            if (in_array($scheme, ['http', 'https'], true)) {
                return;
            }
        }

        if (preg_match('/^(mailto:[^@\s]+@[^@\s]+\.[^@\s]+|tel:\+?[0-9 ()-]{6,})$/i', $value)) {
            return;
        }

        $fail('The :attribute must be an internal path or a safe HTTP, email, or phone link.');
    }
}
