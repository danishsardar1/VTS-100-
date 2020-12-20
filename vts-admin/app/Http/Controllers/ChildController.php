<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChildController extends Controller
{
    protected $db;
    public function __construct()
    {
        $this->db = app('firebase.firestore')->database();
    }
    public function index() {
        $doc = $this->db->collection('Child')->documents();
        return view('childs.index')->withData($doc);
    }
    public function delete($id) {
        $docs = $this->db->collection('Child')
            ->where('id', '=', $id)
            ->documents();
        $id = $docs->rows()[0]->id();
        $this->db->collection('Child')
        ->document($id)
        ->delete();
        return redirect()->route('childs.index');
    }
}
