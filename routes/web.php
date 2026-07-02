<?php

use App\Http\Controllers\CharacterController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::post('/characters', [CharacterController::class, 'store'])->middleware('auth');
Route::get('/my-characters', [CharacterController::class, 'index'])->middleware('auth');
Route::patch('/characters/{character}', [CharacterController::class, 'update'])->middleware('auth');
Route::delete('/characters/{character}', [CharacterController::class, 'destroy'])->middleware('auth');

require __DIR__.'/settings.php';
