<?php

use App\Http\Controllers\LandingController;
use App\Http\Controllers\SearchEngineController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LandingController::class, 'home'])->name('home');
Route::get('/internship-program', [LandingController::class, 'internship'])->name('internship-program');
Route::get('/practitioner-teaching', [LandingController::class, 'practitionerTeaching'])->name('practitioner-teaching');
Route::get('/practitioner-teaching/{slug}', [LandingController::class, 'practitionerTeachingDetail'])
    ->where('slug', '[a-z0-9-]+')
    ->name('practitioner-teaching.detail');
Route::get('/kub-talk', [LandingController::class, 'kubTalk'])->name('kub-talk');
Route::get('/industry-challenge-class', [LandingController::class, 'industryChallengeClass'])
    ->name('industry-challenge-class');
Route::get('/student-certification', [LandingController::class, 'certification'])->name('student-certification');
Route::get('/about', [LandingController::class, 'about'])->name('about');

if (app()->environment('testing')) {
    Route::get('/__test/forbidden', fn () => abort(403));
    Route::get('/__test/server-error', fn () => abort(500));
}

Route::get('/sitemap.xml', [SearchEngineController::class, 'sitemap'])->name('sitemap');
Route::get('/robots.txt', [SearchEngineController::class, 'robots'])->name('robots');
