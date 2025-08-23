<?php

namespace Modules\DocsTrack\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DocsTrackController extends Controller
{

    public function index()
    {
        return Inertia::render('DocsTrack::DocumTrack/index');
    }


    public function create()
    {
        $latestDTrack = DB::table('tbl_dtrack')->orderBy('id', 'desc')->first();

        $lastRouteNo = 0;
        $lastDocsConNo = 0;
        $lastOfficeConNo = 0;

        if ($latestDTrack) {
            if (preg_match('/RN-\d{4}-(\d+)/', $latestDTrack->route_no, $matches)) {
                $lastRouteNo = intval($matches[1]);
            }

            if (preg_match('/DCN-\d{4}-(\d+)/', $latestDTrack->docs_con_no, $matches)) {
                $lastDocsConNo = intval($matches[1]);
            }

            if (preg_match('/OCN-\d{4}-(\d+)/', $latestDTrack->office_con_no, $matches)) {
                $lastOfficeConNo = intval($matches[1]);
            }
        }

        $year = date('Y');

        $autoRouteNo = sprintf('RN-%s-%04d', $year, $lastRouteNo + 1);
        $autoDocsConNo = sprintf('DCN-%s-%04d', $year, $lastDocsConNo + 1);
        $autoOfficeConNo = sprintf('OCN-%s-%04d', $year, $lastOfficeConNo + 1);

        $docstype = DB::table('tbl_documtype')
            ->select('id', 'docs_code', 'docs_name', 'docs_stat')
            ->orderBy('id', 'asc')
            ->get();

        $dtracks = DB::table('tbl_dtrack')
            ->select('id', 'route_no', 'docs_con_no', 'office_con_no', 'docs_subject', 'docs_type', 'seq_no', 'docs_destin')
            ->orderBy('id', 'desc')
            ->get();

        $departments = DB::table('tbl_department')
            ->select('id', 'depart_name')
            ->where('depart_stat', 1)
            ->orderBy('depart_name', 'asc')
            ->get();

        return Inertia::render('DocsTrack::DocumTrack/AddDtrack', [
            'docstype' => $docstype,
            'autoRouteNo' => $autoRouteNo,
            'autoDocsConNo' => $autoDocsConNo,
            'autoOfficeConNo' => $autoOfficeConNo,
            'dtracks' => $dtracks,
            'departments' => $departments,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'route_no'      => 'required|string|max:255|unique:tbl_dtrack,route_no',
            'docs_con_no'   => 'required|string|max:255|unique:tbl_dtrack,docs_con_no',
            'office_con_no' => 'required|string|max:255|unique:tbl_dtrack,office_con_no',
            'docs_subject'  => 'required|string|max:255',
            'docs_type'     => 'required|string',
            'seq_no'        => 'nullable|string|max:10',
            'docs_destin'   => 'required|string|max:255',
            'remarks'       => 'nullable|string|max:500',
        ]);

        $doc = DB::table('tbl_dtrack')->insertGetId([
            'route_no'      => $validated['route_no'],
            'docs_con_no'   => $validated['docs_con_no'],
            'office_con_no' => $validated['office_con_no'],
            'docs_subject'  => $validated['docs_subject'],
            'docs_type'     => $validated['docs_type'],
            'seq_no'        => $validated['seq_no'],
            'docs_destin'   => $validated['docs_destin'],
            'remarks'       => $validated['remarks'] ?? null,
        ]);

        return redirect()->back()
            ->with('success', 'Document routed successfully!')
            ->with('doc', $doc);
    }

    public function test()
    {
        return Inertia::render('DocsTrack::modal/AddDocsTrack');
    }


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
