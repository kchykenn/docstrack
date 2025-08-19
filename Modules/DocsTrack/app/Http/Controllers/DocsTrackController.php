<?php

namespace Modules\DocsTrack\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Referrences\Models\DocumentType;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class DocsTrackController extends Controller
{

    public function index()
    {
        return Inertia::render('DocsTrack::DocumTrack/index');
    }


    public function create()
    {
        $docstype = DB::table('tbl_documtype')
            ->select('id', 'docs_code', 'docs_name', 'docs_stat')
            ->orderBy('id', 'asc')
            ->get();

        return Inertia::render('DocsTrack::DocumTrack/AddDtrack', [
            'docstype' => $docstype,
        ]);
    }

    
    public function test()
    {
        return Inertia::render('DocsTrack::modal/AddDocsTrack');
    }


    public function store(Request $request) {}

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        return view('docstrack::show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return view('docstrack::edit');
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
