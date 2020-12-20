@extends('layout.app')
@section('content')
<div>

    <nav aria-label="breadcrumb" class="c-subheader px-3">
        <div class="row w-100">
            <div class="col">
            </div>
            <div class="col text-right py-3">
                <a href="{{ route('drivers.index') }}" class="btn btn-primary">All Drivers</a>
            </div>
        </div>
    </nav>
    <div class="p-3">
        <form action="{{route('drivers.post', isset($data)? $data['SchoolCode']: '')}}" method="POST">
            @csrf
            <div class="form-group">
                <label for="">School Name</label>
                <input
                type="text"
                name="Name"
                class="form-control"
                value="{{ isset($data)? $data['Name']: '' }}"
                placeholder="School Name">
            </div>
            <div class="form-group">
                <label for="">Destination</label>
                <input
                type="text"
                name="destination"
                value="{{ isset($data)? $data['destination']: '' }}"
                class="form-control"
                placeholder="Destination">
            </div>
            <div class="form-group">
                <input type="submit" value="Submit" class="btn btn-primary">
            </div>
      </form>
    </div>
</div>
@endsection
