<div class="c-sidebar c-sidebar-dark c-sidebar-show">
    <ul class="c-sidebar-nav">
      <li class="c-sidebar-nav-title"><h3>{{env('APP_NAME', 'VTS')}}</h3></li>
      <li class="c-sidebar-nav-item">
        <a class="c-sidebar-nav-link" href="{{route('schools.index')}}">
          <i class="c-sidebar-nav-icon cil-school"></i> Schools
        </a>
      </li>
      <li class="c-sidebar-nav-item">
        <a class="c-sidebar-nav-link" href="{{route('drivers.index')}}">
          <i class="c-sidebar-nav-icon cil-car-alt"></i> Drivers
        </a>
      </li>
      <li class="c-sidebar-nav-item">
        <a class="c-sidebar-nav-link" href="{{route('parents.index')}}">
          <i class="c-sidebar-nav-icon cil-user"></i> Parents
        </a>
      </li>
      <li class="c-sidebar-nav-item">
        <a class="c-sidebar-nav-link" href="{{route('childs.index')}}">
          <i class="c-sidebar-nav-icon cil-people"></i> Childs
        </a>
      </li>
      <li class="c-sidebar-nav-item">
        <a class="c-sidebar-nav-link" href="{{route('notifications.index')}}">
          <i class="c-sidebar-nav-icon cil-people"></i> Notifications
        </a>
      </li>
      {{-- <li class="c-sidebar-nav-item">
        <a class="c-sidebar-nav-link" href="{{route('schools.index')}}">
          <i class="c-sidebar-nav-icon cil-speedometer"></i> Notifications
        </a>
      </li> --}}
  </div>
