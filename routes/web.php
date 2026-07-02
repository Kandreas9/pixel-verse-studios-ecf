<?php

use App\Http\Controllers\CharacterController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // Character Routes
    Route::controller(CharacterController::class)->group(function () {
        Route::get('/characters', 'index');
        Route::get('/characters/create', 'create');
        Route::post('/characters', 'store');
        Route::get('/characters/{character}', 'show');
        Route::get('/characters/{character}/edit', 'edit');
        Route::patch('/characters/{character}', 'update');
        Route::delete('/characters/{character}', 'destroy');
    });
});

require __DIR__.'/settings.php';
