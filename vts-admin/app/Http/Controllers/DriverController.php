<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DriverController extends Controller
{
    protected $db;
    public function __construct()
    {
        $this->db = app('firebase.firestore')->database();
    }
    public function index() {
        $doc = $this->db->collection('Driver')->documents();
        return view('drivers.index')->withData($doc);
    }
    public function delete($id) {
        $docs = $this->db->collection('Driver')
            ->where('uid', '=', $id)
            ->documents();
        $id = $docs->rows()[0]->id();
        $this->db->collection('Driver')
        ->document($id)
        ->delete();
        return redirect()->route('drivers.index');
    }
}
