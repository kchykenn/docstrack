<?php

use Illuminate\Support\Facades\Route;
use Modules\DocsTrack\Http\Controllers\DocsTrackController;
use Modules\DocsTrack\Http\Controllers\CHDRpoController;


Route::middleware(['auth', 'verified'])->group(function () {


    //dtracks route
    Route::get('/dtracks', [DocsTrackController::class, 'index'])->name('docstrack.index');
    Route::get('/dtracks/incomming', [DocsTrackController::class, 'incomm'])->name('docstrack.incomm');
    Route::get('/dtracks/create', [DocsTrackController::class, 'create'])->name('docstrack.create');
    Route::post('/dtracks/store', [DocsTrackController::class, 'store'])->name('docstrack.store');
    Route::get('/dtracks/test', [DocsTrackController::class, 'test'])->name('docstrack.test');

    Route::get('/chdrpo', [CHDRpoController::class, 'index'])->name('chdrpo.index');
});


