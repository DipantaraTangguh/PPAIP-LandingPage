# PPAIP Universitas Bakrie

[![CI](https://github.com/DipantaraTangguh/PPAIP-LandingPage/actions/workflows/ci.yml/badge.svg)](https://github.com/DipantaraTangguh/PPAIP-LandingPage/actions/workflows/ci.yml)

Website dan CMS PPAIP Universitas Bakrie untuk mengelola program internship, KUB Talk, praktisi mengajar, sertifikasi mahasiswa, FAQ, serta konten profil unit.

## Tech Stack

- PHP 8.4.1+
- Laravel 13
- Filament 4
- Inertia.js 2
- React 18
- Tailwind CSS 4
- Vite 8
- MySQL atau SQLite

## Requirements

Pastikan server atau komputer lokal memiliki:

- PHP 8.4.1 atau lebih baru beserta extension Laravel yang dibutuhkan.
- Composer 2.
- Node.js 22 atau lebih baru dan npm.
- MySQL 8+ untuk production. SQLite cukup untuk development dan testing.
- Web server dengan document root mengarah ke folder `public`.

## Local Setup

1. Install dependency dan buat environment file.

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
```

2. Konfigurasi database di `.env`.

Contoh MySQL:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ppaip
DB_USERNAME=root
DB_PASSWORD=
```

Untuk SQLite:

```bash
touch database/database.sqlite
```

```dotenv
DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/database/database.sqlite
```

3. Konfigurasi administrator awal.

```dotenv
ADMIN_NAME="PPAIP Admin"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="use-a-strong-password"
```

`ADMIN_PASSWORD` minimal 12 karakter. Jangan gunakan kredensial contoh di production.

4. Siapkan database, data awal, dan public storage.

```bash
php artisan migrate
php artisan db:seed
php artisan storage:link
```

Seeder hanya membuat administrator jika `ADMIN_EMAIL` dan `ADMIN_PASSWORD` sudah diisi. Menjalankan seeder kembali akan memperbarui administrator dengan email yang sama.

5. Jalankan development server.

```bash
composer dev
```

Website tersedia di `http://127.0.0.1:8000`. Filament CMS tersedia di `/admin`.

## Common Commands

```bash
# Menjalankan semua test
composer test

# Memeriksa format PHP
vendor/bin/pint --test

# Memperbaiki format PHP
vendor/bin/pint

# Membuat production frontend assets
npm run build

# Menampilkan route aplikasi
php artisan route:list
```

Sebelum merge atau deploy, minimal jalankan:

```bash
composer test
vendor/bin/pint --test
npm run build
```

## Content and Uploads

Media yang diunggah melalui Filament disimpan di:

```text
storage/app/public
```

Folder tersebut tidak disimpan di Git. Deployment baru wajib:

1. Menjalankan `php artisan storage:link`.
2. Memindahkan atau restore isi `storage/app/public` dari server sebelumnya.
3. Memberikan permission tulis kepada process PHP untuk `storage` dan `bootstrap/cache`.

Katalog internship saat ini diharapkan tersedia pada:

```text
storage/app/public/student-catalog/Repository Magang 2025 UBakrie.pdf
```

Jika nama atau lokasi file diubah, sesuaikan `catalogUrl` pada `LandingController`.

## Production Environment

Gunakan konfigurasi production berikut sebagai baseline:

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

FILESYSTEM_DISK=local
CACHE_STORE=database
SESSION_DRIVER=database
QUEUE_CONNECTION=database
```

Gunakan HTTPS dan jangan menyimpan `.env`, database dump, atau kredensial di repository.
Simpan `APP_KEY` production dengan aman dan jangan menjalankan `key:generate` ulang setelah aplikasi memiliki data terenkripsi atau session aktif.

## Production Deployment

Contoh deployment manual menggunakan maintenance mode:

```bash
php artisan down --retry=60

git pull --ff-only
composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction
npm ci
npm run build

php artisan migrate --force
php artisan storage:link
php artisan optimize
php artisan queue:restart

php artisan up
```

Catatan:

- Jalankan backup database dan media sebelum migration.
- Jangan menjalankan `db:seed` pada setiap deploy. Gunakan hanya saat setup awal atau ketika memang ingin memperbarui seed content.
- Jika frontend assets dibangun di CI, server tidak perlu menjalankan `npm ci` dan `npm run build`; upload folder `public/build` hasil CI.
- Pastikan document root web server adalah `/path/to/project/public`, bukan root project.

## Web Server

### Nginx

Contoh konfigurasi inti:

```nginx
server {
    listen 80;
    server_name your-domain.example;
    root /var/www/ppaip/public;

    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

Sesuaikan socket PHP-FPM dan aktifkan HTTPS melalui konfigurasi hosting.

## Queue

Environment default menggunakan database queue. Jika aplikasi mulai mengirim email atau menjalankan background job, aktifkan worker:

```bash
php artisan queue:work --sleep=3 --tries=3 --timeout=90
```

Di production, jalankan worker menggunakan Supervisor, systemd, atau process manager dari platform hosting.

## Backup

Backup minimal harus mencakup:

- Database production.
- Seluruh folder `storage/app/public`.
- `.env` production yang disimpan di secret manager atau lokasi aman.

Contoh MySQL:

```bash
mysqldump -u ppaip_user -p ppaip > ppaip-$(date +%F).sql
tar -czf ppaip-media-$(date +%F).tar.gz storage/app/public
```

Backup belum dianggap aman sampai proses restore pernah diuji.

## Restore

```bash
mysql -u ppaip_user -p ppaip < ppaip-YYYY-MM-DD.sql
tar -xzf ppaip-media-YYYY-MM-DD.tar.gz
php artisan storage:link
php artisan optimize:clear
```

Pastikan ownership dan permission folder storage sesuai dengan user PHP-FPM.

## Troubleshooting

### Gambar upload tidak tampil

```bash
php artisan storage:link
```

Pastikan `APP_URL` sesuai domain aktif dan `public/storage` mengarah ke `storage/app/public`.

### Error permission pada storage

Pastikan web server memiliki akses tulis ke:

```text
storage
bootstrap/cache
```

### Perubahan `.env` tidak terbaca

```bash
php artisan optimize:clear
php artisan optimize
```

### Halaman error setelah deployment

```bash
php artisan migrate:status
php artisan about
tail -n 100 storage/logs/laravel.log
```

Jangan mengaktifkan `APP_DEBUG=true` di production.

### Admin tidak bisa login

Pastikan user memiliki `is_admin = true`. Cek dan perbaiki status user melalui Tinker:

```bash
php artisan tinker
```

```php
$user = App\Models\User::where('email', 'admin@example.com')->firstOrFail();
$user->update(['is_admin' => true]);
```

Gunakan alur lupa password untuk mengganti password admin. Hindari menjalankan `DatabaseSeeder` untuk perbaikan akun di production karena seeder tersebut juga mengisi ulang konten CMS awal.

## Release Checklist

- `composer test` lulus.
- `vendor/bin/pint --test` lulus.
- `npm run build` lulus.
- Database dan media sudah dibackup.
- Environment production menggunakan `APP_DEBUG=false`.
- Migration sudah dijalankan.
- `storage:link` tersedia.
- Homepage dan halaman program bisa dibuka.
- Login dan akses Filament admin sudah dicek.
- Upload gambar dari Filament sudah diuji.

## Security

- Registrasi publik dinonaktifkan.
- Hanya user dengan `is_admin = true` yang dapat mengakses Filament.
- Jangan membagikan akun admin antar pengguna.
- Gunakan password unik dan password manager.
- Rotasi kredensial database, email, dan admin saat ada pergantian pengelola.
