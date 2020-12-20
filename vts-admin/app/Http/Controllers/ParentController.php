<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ParentController extends Controller
{
    protected $db;
    public function __construct()
    {
        $this->db = app('firebase.firestore')->database();
    }
    public function index() {
        $doc = $this->db->collection('Parrent')->documents();
        return view('parents.index')->withData($doc);
    }
    public function delete($id) {
        $docs = $this->db->collection('Parrent')
            ->where('uid', '=', $id)
            ->documents();
        $id = $docs->rows()[0]->id();
        $this->db->collection('Parrent')
        ->document($id)
        ->delete();
        return redirect()->route('parents.index');
    }
}
