#!/bin/sh
set -e

if [ "${RUN_MIGRATIONS:-true}" = "true" ]; then
    php artisan migrate --force
fi

# Seed CMS content (and the ADMIN_* account) only when the database is still
# empty. CmsContentSeeder truncates its tables, so it must never re-run over
# content edited through the admin panel. Some migrations insert defaults into
# page_contents/programs, so emptiness is judged on tables only the seeder fills.
if [ "${SEED_ON_FIRST_RUN:-true}" = "true" ]; then
    if php -r '
        require "vendor/autoload.php";
        $app = require "bootstrap/app.php";
        $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
        foreach (["nav_links", "footer_links", "faqs"] as $table) {
            if (Illuminate\Support\Facades\DB::table($table)->exists()) {
                exit(1);
            }
        }
    '; then
        php artisan db:seed --force
    fi
fi

php artisan optimize

exec docker-php-entrypoint "$@"
