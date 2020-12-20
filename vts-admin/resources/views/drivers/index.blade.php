@extends('layout.app')
@section('content')
<div>


    <nav aria-label="breadcrumb" class="c-subheader px-3">
        <div class="row w-100">
            <div class="col">
                <h3 class="pt-2">Drivers</h3>
            </div>
        </div>
    </nav>
    <div class="p-3">
        <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">CNIC</th>
                <th scope="col">Mobile No</th>
                <th scope="col">Email</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
                @foreach($data as $row)
                    <tr>
                        <td>{{$row->data()['uid']}}</td>
                        <td>{{$row->data()['name']}}</td>
                        <td>{{$row->data()['Cnic']}}</td>
                        <td>{{$row->data()['MobNo']}}</td>
                        <td>{{$row->data()['email']}}</td>
                        <td>
                            {{-- <a href="{{route('drivers.edit', $row->data()['SchoolCode'])}}"> Edit </a>/ --}}
                            <a href="{{route('drivers.delete', $row->data()['uid'])}}"> Delete </a>
                        </td>
                    </tr>
                @endforeach
            </tbody>
          </table>
    </div>
</div>
@endsection
