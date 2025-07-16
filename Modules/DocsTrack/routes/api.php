<?php

use Illuminate\Support\Facades\Route;
use Modules\DocsTrack\Http\Controllers\DocsTrackController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('docstracks', DocsTrackController::class)->names('docstrack');
});
