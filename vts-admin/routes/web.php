<?php
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('test', function() {
    $db = app('firebase.firestore')->database();
    $doc = $db->collection('Schools')->document('6c4236e94d794a99883c');
    dd($doc->snapshot()->data());
    /* $schoolID = Str::uuid()->toString();
    $doc->set([
        "Name" => 'ABCD 2',
        "SchoolCode" => $schoolID,
        "destination" => "",
    ]);
    dd($doc->data()); */
});
Route::get('/', function () {
    return redirect()->route('schools.index');
});
// Schools
Route::group(['prefix' => 'schools', 'as' => 'schools.'], function () {
    Route::get('/', 'SchoolController@index')->name('index');
    Route::get('/edit/{code}', 'SchoolController@edit')->name('edit');
    Route::get('/delete/{code}', 'SchoolController@delete')->name('delete');
    Route::get('/add', 'SchoolController@create')->name('create');
    Route::post('/edit/{code?}', 'SchoolController@store')->name('post');
});
// Drivers
Route::group(['prefix' => 'drivers', 'as' => 'drivers.'], function () {
    Route::get('/', 'DriverController@index')->name('index');
    Route::get('/delete/{code}', 'DriverController@delete')->name('delete');
});
// Parents
Route::group(['prefix' => 'parents', 'as' => 'parents.'], function () {
    Route::get('/', 'ParentController@index')->name('index');
    Route::get('/delete/{code}', 'ParentController@delete')->name('delete');
});
// Childs
Route::group(['prefix' => 'childs', 'as' => 'childs.'], function () {
    Route::get('/', 'ChildController@index')->name('index');
    Route::get('/delete/{code}', 'ChildController@delete')->name('delete');
});
// Notifications
Route::group(['prefix' => 'notifications', 'as' => 'notifications.'], function () {
    Route::get('/', 'NotificationController@index')->name('index');
});
