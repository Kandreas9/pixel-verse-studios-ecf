<?php

use App\Http\Controllers\CharacterController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CommentRatingController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ItemController;
use Illuminate\Auth\Middleware\RequirePassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Homepage')->name('home');
Route::inertia('/terms', 'legal/TermsOfService');
Route::inertia('/privacy', 'legal/PrivacyPolicy');

Route::middleware(['auth'])->group(function () {
    Route::inertia('/contact', 'Contact');
    Route::post('/contact', ContactController::class);

    Route::get('/profile', function (Request $request) {
        return inertia('Profile', ['characters' => $request->user()->characters]);
    });

    // Character Routes
    Route::controller(CharacterController::class)->group(function () {
        Route::get('/characters/create', 'create');
        Route::post('/characters', 'store');
        Route::get('/characters/{character}/edit', 'edit');
        Route::patch('/characters/{character}', 'update');
        Route::delete('/characters/{character}', 'destroy');

        Route::patch('/characters/{character}/share', 'share');
        Route::patch('/characters/{character}/unshare', 'unshare');

        Route::patch('/characters/{character}/approve', 'approve')->middleware(['role:Moderator|Super-Admin']);
        Route::delete('/characters/{character}/reject', 'reject')->middleware(['role:Moderator|Super-Admin']);
    });

    // Dashboard Routes
    Route::prefix('dashboard')->group(function () {
        Route::middleware(['role:Moderator|Super-Admin'])->group(function () {
            Route::controller(ItemController::class)->group(function () {
                Route::get('/items', 'index');
                Route::get('/items/create', 'create');
                Route::post('/items', 'store');
                Route::get('/items/{item}/edit', 'edit');
                Route::patch('/items/{item}', 'update');
                Route::delete('/items/{item}', 'destroy');

                Route::patch('items/{item}/activate', 'activate');
                Route::patch('items/{item}/deactivate', 'deactivate');
            });

            Route::controller(DashboardController::class)->group(function () {
                Route::get('/', 'index');

                Route::get('/characters', 'characters');

                Route::get('/users', 'users');
                Route::delete('/users/{user}', 'userDestroy');

                Route::get('/comments', 'comments');
            });
        });

        Route::middleware(['role:Super-Admin'])->group(function () {
            Route::controller(DashboardController::class)->group(function () {
                Route::get('/moderators', 'moderators');
                Route::get('/moderators/create', 'moderatorsCreate');
                Route::post('/moderators', 'moderatorsStore');
                Route::get('/moderators/{user}/password/edit', 'moderatorsPasswordEdit')
                    ->middleware(RequirePassword::class);
                Route::patch('/moderators/{user}/password/', 'moderatorsPasswordUpdate');

                Route::get('/contacts/logs', 'contactLogs');
                Route::get('/characters/logs', 'characterLogs');
            });
        });
    });

    // Comment Routes
    Route::controller(CommentController::class)->group(function () {
        Route::prefix('characters')->group(function () {
            Route::post('/{character}/comments', 'store');

        });

        Route::delete('/comments/{comment}', 'destroy')->middleware(['role:Moderator|Super-Admin']);

        Route::patch('/comments/{comment}/approve', 'approve')->middleware(['role:Moderator|Super-Admin']);
        Route::delete('/comments/{comment}/reject', 'reject')->middleware(['role:Moderator|Super-Admin']);
    });

    Route::controller(CommentRatingController::class)->group(function () {
        Route::post('/comments/{comment}/ratings', 'store');
        Route::delete('/comments/{comment}/ratings/{rating}', 'destroy');
    });
});

Route::get('/characters', [CharacterController::class, 'index']);
Route::get('/characters/{character}', [CharacterController::class, 'show']);

require __DIR__.'/settings.php';
