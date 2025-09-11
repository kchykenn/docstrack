<?php

namespace Modules\DocsTrack\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\DocsTrack\Models\DTrack;
use Modules\DocsTrack\Models\DocsEnctr;

class DocsTrackController extends Controller
{

    public function index()
    {
        $user = Auth::user();
        $departName = $user->depart_name;

        $dtracks = DB::table('tbl_dtrack')
            ->select('route_no', 'docs_con_no', 'office_con_no', 'docs_subject', 'docs_type', 'act_taken', 'depart_from', 'docs_destin', 'ts_created_at')
            ->orderBy('route_no', 'desc')
            ->get();

        $denctr = DB::table('tbl_docsenctr')
            ->select('route_no', 'docs_con_no', 'office_con_no', 'docs_subject', 'docs_type', 'act_taken', 'depart_from', 'docs_destin', 'status', 'ts_created_at')
            ->orderBy('route_no', 'desc')
            ->get();

        return Inertia::render('DocsTrack::DocumTrack/index', [
            'dtracks' => $dtracks,
            'denctr' => $denctr,
            'depart_name' => $departName,
        ]);
    }

    public function enctr($routeNo)
    {
        $encounters = DB::table('tbl_docsenctr')
            ->where('route_no', $routeNo)
            ->orderBy('ts_created_at', 'asc')
            ->get();

        return response()->json($encounters);
    }

    public function create()
    {

        $user = Auth::user();
        $departName = $user->depart_name;
        $departUser = $user->first_name . ' ' . $user->middle_name . ' ' . $user->last_name;

        $lastRouteNo = DB::table('tbl_dtrack')
            ->select('route_no')
            ->orderBy('id', 'desc')
            ->value('route_no');

        $lastDocsConNo = DB::table('tbl_dtrack')
            ->select('docs_con_no')
            ->orderBy('id', 'desc')
            ->value('docs_con_no');

        $lastOfficeConNo = DB::table('tbl_dtrack')
            ->select('office_con_no')
            ->orderBy('id', 'desc')
            ->value('office_con_no');

        $routeNo = 0;
        $docsConNo = 0;
        $officeConNo = 0;

        if ($lastRouteNo && preg_match('/RN-\d{4}-(\d+)/', $lastRouteNo, $matches)) {
            $routeNo = intval($matches[1]);
        }

        if ($lastDocsConNo && preg_match('/DCN-\d{4}-(\d+)/', $lastDocsConNo, $matches)) {
            $docsConNo = intval($matches[1]);
        }

        if ($lastOfficeConNo && preg_match('/OCN-\d{4}-(\d+)/', $lastOfficeConNo, $matches)) {
            $officeConNo = intval($matches[1]);
        }

        $year = date('Y');

        $autoRouteNo = sprintf('RN-%s-%09d', $year, $routeNo + 1);
        $autoDocsConNo = sprintf('DCN-%s-%09d', $year, $docsConNo + 1);
        $autoOfficeConNo = sprintf('OCN-%s-%09d', $year, $officeConNo + 1);

        $docstype = DB::table('tbl_documtype')
            ->select('id', 'docs_code', 'docs_name', 'docs_stat')
            ->orderBy('id', 'asc')
            ->get();

        $dtracks = DB::table('tbl_dtrack')
            ->select('id', 'route_no', 'docs_con_no', 'office_con_no', 'docs_subject', 'docs_type', 'seq_no', 'act_taken', 'depart_user', 'docs_destin', 'ts_created_at', 'depart_from')
            ->where('depart_from', $departName)
            ->orderBy('id', 'desc')
            ->get();


        $departments = DB::table('tbl_department')
            ->select('id', 'depart_name')
            ->where('depart_stat', 1)
            ->orderBy('depart_name', 'asc')
            ->get();

        $acttype = DB::table('tbl_accttype')
            ->select('id', 'act_name')
            ->where('act_stat', 1)
            ->orderBy('act_name', 'asc')
            ->get();


        return Inertia::render('DocsTrack::DocumTrack/AddDtrack', [
            'docstype' => $docstype,
            'autoRouteNo' => $autoRouteNo,
            'autoDocsConNo' => $autoDocsConNo,
            'autoOfficeConNo' => $autoOfficeConNo,
            'dtracks' => $dtracks,
            'departments' => $departments,
            'acttype' => $acttype,
            'departName' => $departName,
            'departUser' => $departUser,
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
            'depart_from'   => 'required|string|max:50',
            'act_taken'     => 'required|string|max:50',
            'depart_user'   => 'required|string|max:50',
            'docs_destin'   => 'required|string|max:255',
            'remarks'       => 'nullable|string|max:500',
        ]);

        $dtrack = DTrack::create($validated);
        $docsEnctr = DocsEnctr::create($validated);

        return redirect()->back()
            ->with('success', 'Document routed successfully!')
            ->with('id', $dtrack->id)
            ->with('id', $docsEnctr->id);
    }


    public function incomm()
    {
        $user = Auth::user();
        $departName = $user->depart_name;

        $dtracks = DB::table('tbl_docsenctr')
            ->select('id', 'route_no', 'docs_con_no', 'office_con_no', 'docs_subject', 'docs_type', 'depart_from', 'act_taken', 'docs_destin', 'status', 'ts_created_at')
            ->where('docs_destin', $departName)
            ->orderBy('route_no', 'desc')
            ->get();

        return Inertia::render('DocsTrack::DocumTrack/DTrackIncom', [
            'dtracks' => $dtracks,
            'depart_name' => $departName,
        ]);
    }


    public function recev()
    {
        $user = Auth::user();
        $departName = $user->depart_name;
        $departUser = $user->first_name . ' ' . $user->middle_name . ' ' . $user->last_name;

        $dtracks = DB::table('tbl_docsenctr')
            ->select('id', 'route_no', 'docs_con_no', 'office_con_no', 'docs_subject', 'docs_type', 'depart_from', 'act_taken', 'docs_destin', 'status', 'ts_created_at')
            ->where('docs_destin', $departName)
            ->orderBy('route_no', 'desc')
            ->get();

        $docstype = DB::table('tbl_documtype')
            ->select('id', 'docs_code', 'docs_name', 'docs_stat')
            ->orderBy('id', 'asc')
            ->get();

        $departments = DB::table('tbl_department')
            ->select('id', 'depart_name')
            ->where('depart_stat', 1)
            ->orderBy('depart_name', 'asc')
            ->get();

        $acttype = DB::table('tbl_accttype')
            ->select('id', 'act_name')
            ->where('act_stat', 1)
            ->orderBy('act_name', 'asc')
            ->get();


        return Inertia::render('DocsTrack::DocumTrack/RecevDTrack', [
            'docstype' => $docstype,
            'dtracks' => $dtracks,
            'departments' => $departments,
            'acttype' => $acttype,
            'departName' => $departName,
            'departUser' => $departUser,
        ]);
    }

    public function received($id)
    {
        $docsEnctr = DocsEnctr::findOrFail($id);

        $docsEnctr->status = 1;
        $docsEnctr->date_received = now('Asia/Manila')->format('Y-m-d H:i:s');
        $docsEnctr->save();

        return redirect()->back()
            ->with('success', 'Document marked as received!')
            ->with('id', $docsEnctr->id);
    }


    public function endroute($id)
    {
        $docsEnctr = DocsEnctr::findOrFail($id);

        DocsEnctr::where('route_no', $docsEnctr->route_no)
            ->update(['status' => 2]);

        $lastEnctr = DocsEnctr::where('route_no', $docsEnctr->route_no)
            ->latest('id')
            ->first();

        if ($lastEnctr) {
            $lastEnctr->date_end = now('Asia/Manila')->format('Y-m-d H:i:s');
            $lastEnctr->save();
        }

        return redirect()->back()
            ->with('success', 'All documents with this route number marked as end Transaction!')
            ->with('id', $docsEnctr->id);
    }



    public function recevstore(Request $request)
    {
        $validated = $request->validate([
            'route_no'      => 'required|string|max:255',
            'docs_con_no'   => 'required|string|max:255',
            'office_con_no' => 'required|string|max:255',
            'docs_subject'  => 'required|string|max:255',
            'docs_type'     => 'required|string',
            'seq_no'        => 'nullable|string|max:10',
            'depart_from'   => 'required|string|max:50',
            'act_taken'     => 'required|string|max:50',
            'depart_user'   => 'required|string|max:50',
            'docs_destin'   => 'required|string|max:255',
            'remarks'       => 'nullable|string|max:500',
        ]);

        $validated['status'] = 0;
        $validated['date_rerouted'] = now('Asia/Manila')->format('Y-m-d H:i:s');


        $docsEnctr = DocsEnctr::create($validated);

        return redirect()->back()
            ->with('success', 'Document routed successfully!')
            ->with('id', $docsEnctr->id);
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
