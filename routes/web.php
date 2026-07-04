<?php

use App\Http\Controllers\CharacterController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ItemController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Homepage')->name('home');
Route::inertia('/contact', 'Contact');
Route::post('/contact', ContactController::class);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::inertia('/dashboard/items', 'dashboard')->middleware('role:Moderator|Super-Admin');

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

    Route::prefix('dashboard')->group(function () {
        Route::middleware(['role:Moderator|Super-Admin'])->group(function () {
            Route::controller(ItemController::class)->group(function () {
                Route::get('/items', 'index');
                Route::get('/items/create', 'create');
                Route::post('/items', 'store');
                Route::get('/items/{item}', 'show');
                Route::get('/items/{item}/edit', 'edit');
                Route::patch('/items/{item}', 'update');
                Route::delete('/items/{item}', 'destroy');
            });
        });
    });

    Route::controller(CommentController::class)->group(function () {
        Route::prefix('characters')->group(function () {
            Route::post('/{character}/comments', 'store');
        });

        Route::patch('/comments/{comment}/approve', 'approve');
        Route::patch('/comments/{comment}/reject', 'reject');
    });
});

require __DIR__.'/settings.php';
