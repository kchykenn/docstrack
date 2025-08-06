<?php

namespace Modules\References\Http\Controllers;

use Modules\References\Models\Division;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ReferencesController extends Controller
{

    public function create_department()
    {
        return Inertia::render('References::AddDepartment/index');
    }

    public function show($id)
    {
        return view('references::show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return view('references::edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {}
}
