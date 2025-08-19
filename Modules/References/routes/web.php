<?php

use Illuminate\Support\Facades\Route;
use Modules\References\Http\Controllers\DepartmentController;
use Modules\References\Http\Controllers\DivisionController;
use Modules\References\Http\Controllers\DocsTypeController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/addDepartment', [DepartmentController::class, 'create_department'])->name('addDepartment.create_department');
    Route::post('/storeDepart', [DepartmentController::class, 'storeDep'])->name('storeDepart.storeDep');


    Route::get('/addDivision', [DivisionController::class, 'index'])->name('addDivision.index');
    Route::post('/storeDivision', [DivisionController::class, 'storeDiv'])->name('storeDivision.storeDiv');


    Route::get('/addDocsType', [DocsTypeController::class, 'index'])->name('addDivision.index');
    Route::post('/storeDocsType', [DocsTypeController::class, 'storeDocsType'])->name('storeDocsType.storeDocsType');
});
