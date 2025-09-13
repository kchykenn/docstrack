<?php
namespace Modules\References\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Modules\References\Models\ActionType;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActionTypeController extends Controller
{
    public function index()
    {
        $latestActionType = DB::table('tbl_accttype')->orderBy('id', 'desc')->first();

        if ($latestActionType && preg_match('/ACT-\d{4}-(\d+)/', $latestActionType->act_code, $matches)) {
            $lastNumber = intval($matches[1]);
        } else {
            $lastNumber = 0;
        }
        $nextNumber = $lastNumber + 1;
        $year = date('Y');
        $autoActCode = sprintf('ACT-%s-%011d', $year, $nextNumber);

        $acttype = DB::table('tbl_accttype')
            ->select('id', 'act_code', 'act_name', 'act_stat')
            ->orderBy('id', 'asc')
            ->get();

        return Inertia::render('References::ActionTaken/index', [
            'autoActCode' => $autoActCode,
            'acttype' => $acttype,
        ]);
    }

    public function storeActionType(Request $request)
    {
        $request->validate([
            'act_code' => 'required|unique:tbl_accttype,act_code',
            'act_name' => 'required|string|max:255',
            'act_stat' => 'required|in:0,1',
        ]);

        $acttype = new ActionType();
        $acttype->act_code = $request->act_code;
        $acttype->act_name = $request->act_name;
        $acttype->act_stat = $request->act_stat;
        $acttype->save();

        return redirect()->back()->with('success', 'Action Type Added successfully!');
    }
}
