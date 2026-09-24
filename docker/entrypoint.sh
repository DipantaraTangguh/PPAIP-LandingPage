#!/bin/sh
set -e

# ---- Railway: set listen port dynamically ----
# Railway injects $PORT at runtime. FrankenPHP reads SERVER_NAME to know where to bind.
# Falls back to :8080 for local docker-compose usage.
export SERVER_NAME=":${PORT:-8080}"

# ---- SQLite: create the database file if it does not exist ----
# When DB_CONNECTION=sqlite (default), Laravel expects the file to already exist.
# We create it here so "php artisan migrate" won't throw SQLiteDatabaseDoesNotExistException.
if [ "${DB_CONNECTION:-sqlite}" = "sqlite" ]; then
    DB_FILE="${DB_DATABASE:-/app/database/database.sqlite}"
    if [ ! -f "$DB_FILE" ]; then
        echo "Creating SQLite database at $DB_FILE"
        mkdir -p "$(dirname "$DB_FILE")"
        touch "$DB_FILE"
    fi
fi

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
