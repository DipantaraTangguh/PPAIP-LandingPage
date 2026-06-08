<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\CertificationController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InternshipController;
use App\Http\Controllers\KubTalkController;
use App\Http\Controllers\PractitionerTeachingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchEngineController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');
Route::get('/internship-program', InternshipController::class)->name('internship-program');
Route::get('/practitioner-teaching', [PractitionerTeachingController::class, 'index'])->name('practitioner-teaching');
Route::get('/practitioner-teaching/{slug}', [PractitionerTeachingController::class, 'show'])
    ->where('slug', '[a-z0-9-]+')
    ->name('practitioner-teaching.detail');
Route::get('/kub-talk', KubTalkController::class)->name('kub-talk');
Route::get('/student-certification', CertificationController::class)->name('student-certification');
Route::get('/about', AboutController::class)->name('about');

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
