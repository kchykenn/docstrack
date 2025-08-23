<?php
namespace Modules\References\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Modules\References\Models\DocumentType;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocsTypeController extends Controller
{
    public function index()
    {
        $latestDocsType = DB::table('tbl_documtype')->orderBy('id', 'desc')->first();

        if ($latestDocsType && preg_match('/DOC-\d{4}-(\d+)/', $latestDocsType->docs_code, $matches)) {
            $lastNumber = intval($matches[1]);
        } else {
            $lastNumber = 0;
        }
        $nextNumber = $lastNumber + 1;
        $year = date('Y');
        $autoDocsCode = sprintf('DOC-%s-%011d', $year, $nextNumber);

        $docstype = DB::table('tbl_documtype')
            ->select('id', 'docs_code', 'docs_name', 'docs_stat')
            ->orderBy('id', 'asc')
            ->get();

        return Inertia::render('References::AddDocsType/index', [
            'autoDocsCode' => $autoDocsCode,
            'docstype' => $docstype,
        ]);
    }

    public function storeDocsType(Request $request)
    {
        $request->validate([
            'docs_code' => 'required|unique:tbl_documtype,docs_code',
            'docs_name' => 'required|string|max:255',
            'docs_stat' => 'required|in:0,1',
        ]);

        $docstype = new DocumentType();
        $docstype->docs_code = $request->docs_code;
        $docstype->docs_name = $request->docs_name;
        $docstype->docs_stat = $request->docs_stat;
        $docstype->save();

        return redirect()->back()->with('success', 'Document Type Added successfully!');
    }
}
