<?php

namespace Modules\References\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Modules\References\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{

    public function create_department()
    {
        $latestDepartment = DB::table('tbl_department')->orderBy('id', 'desc')->first();

        if ($latestDepartment && preg_match('/DEP-\d{4}-(\d+)/', $latestDepartment->depart_code, $matches)) {
            $lastNumber = intval($matches[1]);
        } else {
            $lastNumber = 0;
        }
        $nextNumber = $lastNumber + 1;
        $year = date('Y');
        $autoDepartCode = sprintf('DEP-%s-%011d', $year, $nextNumber);

        $divisions = DB::table('tbl_divisions')
            ->select('id', 'division_name')
            ->orderBy('division_name')
            ->get();

        $department = DB::table('tbl_department')
            ->select('id', 'depart_code', 'division_name', 'depart_name', 'depart_stat')
            ->orderBy('id', 'asc')
            ->get();

        return Inertia::render('References::AddDepartment/index', [
            'autoDepartCode' => $autoDepartCode,
            'divisions' => $divisions,
            'department' => $department,
        ]);
    }
    public function storeDep(Request $request)
    {
        $request->validate([
            'depart_code' => 'required|unique:tbl_department,depart_code',
            'division_name' => 'required|string|max:255',
            'depart_name' => 'required|string|max:255',
            'depart_stat' => 'required|in:0,1',
        ]);

        $department = new Department();
        $department->depart_code = $request->depart_code;
        $department->division_name = $request->division_name;
        $department->depart_name = $request->depart_name;
        $department->depart_stat = $request->depart_stat;
        $department->save();

        return redirect()->back()->with('success', 'Department added successfully!');
    }
}
