<!doctype html>
<html lang="en">
 <head>
 <!-- Required meta tags -->
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width, initial-scale=1">

 <!-- CoreUI CSS -->
 <link rel="stylesheet" href="{{asset('css/coreui.min.css')}}" crossorigin="anonymous">
 <link rel="stylesheet" href="https://unpkg.com/@coreui/icons@2.0.0-beta.3/css/all.min.css">
 <link rel="stylesheet" href="https://unpkg.com/@coreui/icons@2.0.0-beta.3/css/free.min.css">
 <link rel="stylesheet" href="https://unpkg.com/@coreui/icons@2.0.0-beta.3/css/brand.min.css">
 <link rel="stylesheet" href="https://unpkg.com/@coreui/icons@2.0.0-beta.3/css/flag.min.css">
@yield('styles')
 <title>VTS</title>
 </head>
 <body class="c-app">
    @include('blocks.sidebar')
    <div class="w-100 bg-white">
        @yield('content')
    </div>
 <!-- Optional JavaScript -->
 <!-- Popper.js first, then CoreUI JS -->
 <script src="{{asset('js/coreui-utilities.min.js')}}"></script>
 <script src="{{asset('js/coreui.bundle.min.js')}}"></script>
 <script src="{{asset('js/coreui.esm.min.js')}}"></script>
 <script src="{{asset('js/coreui.min.js')}}"></script>
 @yield('scripts')
 </body>
</html>
