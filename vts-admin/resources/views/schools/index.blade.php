@extends('layout.app')
@section('content')
<div>

    <nav aria-label="breadcrumb" class="c-subheader px-3">
        <div class="row w-100">
            <div class="col">
                <h3 class="pt-2">Schools</h3>
            </div>
            <div class="col text-right py-3">
                <a href="{{ route('schools.create') }}" class="btn btn-primary">Add New School</a>
            </div>
        </div>
    </nav>
    <div class="p-3">
        <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">School ID</th>
                <th scope="col">School Name</th>
                <th scope="col">School Distination</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
                @foreach($data as $row)
                    <tr>
                        <td>{{$row->data()['SchoolCode']}}</td>
                        <td>{{$row->data()['Name']}}</td>
                        <td>{{$row->data()['destination']}}</td>
                        <td>
                            <a href="{{route('schools.edit', $row->data()['SchoolCode'])}}"> Edit </a>/
                            <a href="{{route('schools.delete', $row->data()['SchoolCode'])}}"> Delete </a>
                        </td>
                    </tr>
                @endforeach
            </tbody>
          </table>
    </div>
</div>
@endsection
