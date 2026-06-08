# PPAIP Universitas Bakrie

[![CI](https://github.com/DipantaraTangguh/PPAIP-LandingPage/actions/workflows/ci.yml/badge.svg)](https://github.com/DipantaraTangguh/PPAIP-LandingPage/actions/workflows/ci.yml)

Website publik dan CMS PPAIP Universitas Bakrie. Aplikasi ini dipakai untuk menampilkan program-program berbasis industri seperti internship, KUB Talk, practitioner teaching, student certification, FAQ, dan profil unit PPAIP.

Public site fokus ke experience mahasiswa dan positioning “Experience The Real Thing”. Admin panel berbasis Filament dipakai tim internal untuk update konten, banner, program, statistik, FAQ, gallery KUB Talk, dan data pendukung lain tanpa perlu edit code.

## Tech Stack

- PHP 8.4+
- Laravel 13
- Filament 4
- Inertia.js 2
- React 18
- Tailwind CSS 4
- Vite 8
- MySQL untuk production, SQLite cukup untuk local/testing

## Local Setup

Pastikan sudah ada PHP 8.4+, Composer 2, Node.js 22+, npm, dan database driver yang mau dipakai.

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
```

Untuk setup cepat pakai SQLite:

```bash
touch database/database.sqlite
```

Lalu isi `.env`:

```dotenv
DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/database/database.sqlite
```

Kalau pakai MySQL:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ppaip
DB_USERNAME=root
DB_PASSWORD=
```

Jalankan migration, seeder, dan storage link:

```bash
php artisan migrate
php artisan db:seed
php artisan storage:link
```

Jalankan aplikasi local:

```bash
composer dev
```

Public site ada di `http://127.0.0.1:8000`. Admin panel ada di `http://127.0.0.1:8000/admin`.

## Database & Seeders

Seeder utama ada di `database/seeders/DatabaseSeeder.php`. Seeder ini menjalankan CMS seed content dan membuat admin pertama jika credential admin sudah disiapkan di `.env`.

```dotenv
ADMIN_NAME="PPAIP Admin"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="use-a-strong-password"
```

Catatan penting:

- `ADMIN_PASSWORD` minimal 12 karakter.
- Jangan pakai credential contoh di production.
- Kalau `ADMIN_EMAIL` atau `ADMIN_PASSWORD` kosong, akun admin akan dilewati.
- Menjalankan seeder ulang akan update admin dengan email yang sama.
- Jangan rutin menjalankan `db:seed` di production kecuali memang ingin refresh/update seed content.

## Admin Panel

Filament CMS tersedia di `/admin`.

Admin user harus punya kolom `is_admin = true`. Cara normalnya lewat seeder dengan env `ADMIN_*`. Kalau butuh manual via Tinker:

```bash
php artisan tinker
```

```php
App\Models\User::query()->updateOrCreate(
    ['email' => 'admin@example.com'],
    [
        'name' => 'PPAIP Admin',
        'password' => Illuminate\Support\Facades\Hash::make('use-a-strong-password'),
        'is_admin' => true,
    ],
);
```

Beberapa area penting di admin:

- `/admin/welcome-content` untuk konten homepage.
- `/admin/internship-years` dan `/admin/internship-content` untuk data internship.
- `/admin/kub-talks` dan `/admin/kub-talk-content` untuk gallery dan banner KUB Talk.
- `/admin/practitioner-teaching-majors` dan `/admin/practitioner-teaching-content` untuk practitioner teaching.
- `/admin/certification-majors` dan `/admin/student-certification-content` untuk student certification.
- `/admin/about-us-content`, `/admin/work-programs`, missions, dan team members untuk halaman About.
- `/admin/faqs`, nav links, footer links, dan programs untuk konten pendukung.

## Architecture Overview

Aplikasi ini memakai Laravel sebagai backend, Inertia sebagai bridge, dan React untuk halaman publik.

- `routes/web.php` mendefinisikan public routes, auth routes, SEO endpoints, health checks, dan route testing-only.
- `app/Http/Controllers/*Controller.php` tipis dan delegasi data halaman ke service.
- `app/Services/Landing/*PageData.php` menyiapkan payload Inertia dari model, CMS content, dan public asset resolver.
- `app/Models` berisi Eloquent model dengan naming English yang mengikuti table/column database.
- `app/Filament/Admin` berisi resource dan page CMS.
- `resources/js/Pages` berisi Inertia page React.
- `resources/js/Components` berisi shared layout, section, UI element, SEO, dan error boundary.
- `resources/css/app.css` menyimpan Tailwind entry, design tokens, dan animasi global.
- `resources/views/errors` berisi custom 403, 404, dan 500 pages.
- `tests/Feature` dan `resources/js/tests` menjaga behavior backend, admin, SEO, upload validation, dan komponen frontend.

Naming convention saat ini: internal code pakai English (`PractitionerTeachingMajor`, `CertificationMajor`, `WorkProgram`, `majorStats`), sementara copy UI boleh tetap Bahasa Indonesia sesuai kebutuhan user/admin.

## Content & Uploads

File upload dari Filament disimpan di:

```text
storage/app/public
```

Folder ini tidak masuk Git. Saat pindah server atau deploy baru:

- Jalankan `php artisan storage:link`.
- Backup/restore isi `storage/app/public`.
- Pastikan `storage` dan `bootstrap/cache` writable oleh process PHP.

Katalog internship default diarahkan ke:

```text
storage/app/public/student-catalog/Repository Magang 2025 UBakrie.pdf
```

Kalau nama file berubah, update `catalogUrl` di `app/Services/Landing/InternshipPageData.php`.

## Common Commands

```bash
# Backend tests
composer test

# PHP format check
vendor/bin/pint --test

# Auto-format PHP
vendor/bin/pint

# Frontend lint
npm run lint

# Auto-fix lint yang aman
npm run lint:fix

# Frontend tests
npm run test

# Production frontend build
npm run build

# Bundle/performance budget check
npm run build:check

# Lihat route aplikasi
php artisan route:list --except-vendor
```

Sebelum merge atau deploy, minimal jalankan:

```bash
composer test
vendor/bin/pint --test
npm run lint
npm run test
npm run build
npm run build:check
```

## Production Notes

Baseline `.env` production:

```dotenv
APP_NAME="PPAIP Universitas Bakrie"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.example

LOG_LEVEL=error
SESSION_ENCRYPT=true

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ppaip
DB_USERNAME=ppaip_user
DB_PASSWORD=strong-database-password

CACHE_STORE=database
SESSION_DRIVER=database
QUEUE_CONNECTION=database
```

Manual deploy flow:

```bash
php artisan down --retry=60

git pull --ff-only
composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction
npm ci
npm run build
npm run build:check

php artisan migrate --force
php artisan storage:link
php artisan optimize
php artisan queue:restart

php artisan up
```

Production checklist:

- Backup database dan `storage/app/public` sebelum migration.
- Document root web server harus mengarah ke folder `public`.
- Pakai HTTPS.
- Jangan commit `.env`, database dump, atau credential.
- Simpan `APP_KEY` production dengan aman. Jangan regenerate setelah aplikasi sudah berjalan dengan data/session aktif.
- Jalankan queue worker kalau mulai ada email atau background job.

## Queue

Default queue menggunakan database driver. Untuk production:

```bash
php artisan queue:work --sleep=3 --tries=3 --timeout=90
```

Jalankan worker lewat Supervisor, systemd, atau process manager dari hosting.
