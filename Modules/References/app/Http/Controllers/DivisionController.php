<?php
namespace Modules\References\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\References\Models\Division;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DivisionController extends Controller
{
    public function index()
    {
        return Inertia::render('References::AddDivision/index');
    }

    public function store(Request $request)
    {
        $request->validate([
            'depart_code' => 'required|unique:divisions,depart_code',
            'depart_name' => 'required',
        ]);

        Division::create([
            'depart_code' => $request->depart_code,
            'depart_name' => $request->depart_name,
            'div_stat' => $request->div_stat ? 1 : 0,
        ]);

        return redirect()->back()->with('message', 'Division created successfully.');
    }
}
