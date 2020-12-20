@extends('layout.app')
@section('content')
<div>
    <nav aria-label="breadcrumb" class="c-subheader px-3">
        <div class="row w-100">
            <div class="col">
                <h3 class="pt-2">Childs</h3>
            </div>
        </div>
    </nav>
    <div class="p-3">
        <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Mobile No</th>
                <th scope="col">School Name</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
                @foreach($data as $row)
                    <tr>
                        <td>{{$row->data()['ChildName']}}</td>
                        <td>{{$row->data()['MobNo']}}</td>
                        <td>{{$row->data()['SchoolName']}}</td>
                        <td>
                            {{-- <a href="{{route('childs.edit', $row->data()['SchoolCode'])}}"> Edit </a>/ --}}
                            <a href="{{route('childs.delete', $row->data()['id'] ?? 0)}}"> Delete </a>
                        </td>
                    </tr>
                @endforeach
            </tbody>
          </table>
    </div>
</div>
@endsection
