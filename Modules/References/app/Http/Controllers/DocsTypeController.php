<?php
namespace Modules\References\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocsTypeController extends Controller
{
    public function index()
    {
        return Inertia::render('References::AddDocsType/index');
    }
}
