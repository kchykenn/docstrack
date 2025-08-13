<?php

namespace Modules\References\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\References\Models\Division;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DivisionController extends Controller
{
    public function index()
    {
        $latestDivision = DB::table('tbl_divisions')->orderBy('id', 'desc')->first();

        if ($latestDivision && preg_match('/DIV-\d{4}-(\d+)/', $latestDivision->division_code, $matches)) {
            $lastNumber = intval($matches[1]);
        } else {
            $lastNumber = 0;
        }
        $nextNumber = $lastNumber + 1;
        $year = date('Y');
        $autoDivisionCode = sprintf('DIV-%s-%011d', $year, $nextNumber);

        $divisions = DB::table('tbl_divisions')
            ->select('id', 'division_code', 'division_name', 'div_stat')
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('References::AddDivision/index', [
            'autoDivisionCode' => $autoDivisionCode,
            'divisions' => $divisions,
        ]);
    }

    public function storeDiv(Request $request)
    {
        $request->validate([
            'depart_code' => 'required|unique:tbl_divisions,division_code',
            'depart_name' => 'required|string|max:255',
            'div_stat' => 'required|in:0,1',
        ]);

        $division = new Division();
        $division->division_code = $request->depart_code;
        $division->division_name = $request->depart_name;
        $division->div_stat = $request->div_stat;
        $division->save();

        return redirect()->back()->with('success', 'Division added successfully!');
    }
}
