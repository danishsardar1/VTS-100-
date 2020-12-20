<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SchoolController extends Controller
{
    protected $db;
    public function __construct()
    {
        $this->db = app('firebase.firestore')->database();
    }
    public function index() {
        $doc = $this->db->collection('Schools')->documents();
        return view('schools.index')->withData($doc);
    }
    public function edit($id) {
        $docs = $this->db->collection('Schools')
            ->where('SchoolCode', '=', $id)
            ->documents();
        $doc = $docs->rows()[0];
        return view('schools.add-edit')->withData($doc);
    }
    public function create() {
        return view('schools.add-edit');
    }
    public function delete($id) {
        $docs = $this->db->collection('Schools')
            ->where('SchoolCode', '=', $id)
            ->documents();
        $id = $docs->rows()[0]->id();
        $this->db->collection('Schools')
        ->document($id)
        ->delete();
        return redirect()->route('schools.index');
    }
    public function store(Request $request, $id = 0) {
        if(!$id) {
            $doc = $this->db->collection('Schools')->newDocument();
            $code = \Str::uuid()->toString();
            $doc->set([
                "Name" => $request->Name,
                "destination" => $request->destination,
                "SchoolCode" => $code,
            ]);
        } else {
            $docs = $this->db->collection('Schools')
                ->where('SchoolCode', '=', $id)
                ->documents();
            $id = $docs->rows()[0]->id();
            $this->db->collection('Schools')
            ->document($id)
            ->update([
                ['path' => "Name", "value" => $request->Name],
                ['path' => "destination", "value" => $request->destination],
            ]);
        }
        return redirect()->route('schools.index');
    }
}
