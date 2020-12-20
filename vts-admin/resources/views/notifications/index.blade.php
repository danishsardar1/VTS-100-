@extends('layout.app')
@section('content')
<div>

    <nav aria-label="breadcrumb" class="c-subheader px-3">
        <div class="row w-100">
            <div class="col">
                <h3 class="pt-2">Notifications</h3>
            </div>
        </div>
    </nav>
    <div class="p-3">
        <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Title</th>
                <th scope="col">Driver ID</th>
                <th scope="col">Parent ID</th>
                <th scope="col">Destination</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
                @foreach($data as $row)
                    <tr>
                        <td>{{$row->data()['Type'] ?? ''}}</td>
                        <td>{{$row->data()['Title'] ?? ''}}</td>
                        <td>{{$row->data()['DriverId'] ?? ''}}</td>
                        <td>{{$row->data()['ParentId'] ?? ''}}</td>
                        <td>{{$row->data()['Destination'] ?? ''}}</td>
                        <td>{{$row->data()['Description'] ?? ''}}</td>
                        {{-- <td>
                            <a href="{{route('drivers.delete', $row->data()['uid'])}}"> Delete </a>
                        </td> --}}
                    </tr>
                @endforeach
            </tbody>
          </table>
    </div>
</div>
@endsection
