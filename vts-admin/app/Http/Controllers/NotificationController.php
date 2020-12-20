<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    protected $db;
    public function __construct()
    {
        $this->db = app('firebase.firestore')->database();
    }
    public function index() {
        $doc = $this->db->collection('notifications')->documents();
        return view('notifications.index')->withData($doc);
    }
}
