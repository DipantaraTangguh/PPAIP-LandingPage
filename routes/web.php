<?php

use App\Http\Controllers\LandingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchEngineController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [LandingController::class, 'welcome'])->name('home');
Route::get('/internship-program', [LandingController::class, 'internshipProgram'])->name('internship-program');
Route::get('/practitioner-teaching', [LandingController::class, 'praktisiMengajar'])->name('practitioner-teaching');
Route::get('/practitioner-teaching/{slug}', [LandingController::class, 'praktisiMengajarProdi'])
    ->where('slug', '[a-z0-9-]+')
    ->name('practitioner-teaching.detail');
Route::get('/kub-talk', [LandingController::class, 'kubTalk'])->name('kub-talk');
Route::get('/student-certification', [LandingController::class, 'sertifikasi'])->name('student-certification');
Route::get('/about', [LandingController::class, 'tentangKami'])->name('about');

Route::get('/sitemap.xml', [SearchEngineController::class, 'sitemap'])->name('sitemap');
Route::get('/robots.txt', [SearchEngineController::class, 'robots'])->name('robots');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
