<?php

use App\Http\Controllers\LandingController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [LandingController::class, 'welcome']);
Route::get('/internship-program', [LandingController::class, 'internshipProgram']);
Route::get('/praktisi-mengajar', [LandingController::class, 'praktisiMengajar']);
Route::get('/praktisi-mengajar/{slug}', [LandingController::class, 'praktisiMengajarProdi'])
    ->where('slug', '[a-z0-9-]+');
Route::get('/kub-talk', [LandingController::class, 'kubTalk']);
Route::get('/sertifikasi-mahasiswa', [LandingController::class, 'sertifikasi']);
Route::get('/tentang-kami', [LandingController::class, 'tentangKami']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
