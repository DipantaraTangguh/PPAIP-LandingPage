# syntax=docker/dockerfile:1

# ---- Frontend assets (Vite) ----
FROM node:22-alpine AS assets

WORKDIR /app

COPY package.json package-lock.json .npmrc ./
RUN npm ci

COPY vite.config.js jsconfig.json ./
COPY resources ./resources
RUN npm run build

# ---- Application (FrankenPHP) ----
FROM dunglas/frankenphp:1-php8.4 AS app

RUN install-php-extensions intl zip pdo_mysql pdo_sqlite opcache \
    && cp "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

ENV APP_ENV=production \
    APP_DEBUG=false \
    LOG_CHANNEL=stderr \
    COMPOSER_ALLOW_SUPERUSER=1

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --no-interaction --no-progress --prefer-dist

COPY . .
COPY --from=assets /app/public/build ./public/build

RUN mkdir -p storage/app/public storage/framework/cache/data storage/framework/sessions \
        storage/framework/views storage/logs bootstrap/cache /config/psysh \
    && composer dump-autoload --optimize --no-dev --no-interaction \
    && php artisan storage:link \
    && chown -R www-data:www-data storage bootstrap/cache database /config/caddy /config/psysh /data/caddy \
    && chmod +x docker/entrypoint.sh

USER www-data

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD curl -fsS http://127.0.0.1:8080/up || exit 1

ENTRYPOINT ["/app/docker/entrypoint.sh"]
CMD ["--config", "/etc/frankenphp/Caddyfile", "--adapter", "caddyfile"]
