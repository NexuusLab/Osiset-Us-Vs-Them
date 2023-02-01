<!doctype html>
<html lang="en">
@include('admin.layout.head')

<style>
    .alert{
        padding: 4px;
        padding-top: 10px;
    }
</style>
</head>
<body class="layout-fluid">
<div class="page">
    @include('admin.layout.navbar')
    <div class="page-wrapper">
        <div class="page-body">
            <div class="container-xl">
                <div class="row row-deck row-cards">
                    <div class="alert alert-important alert-success alert-dismissible " style="display: none" role="alert" id="alertSuccess">
                        <div class="d-flex">
                            <div>
                                <!-- Download SVG icon from http://tabler-icons.io/i/check -->
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon alert-icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 12l5 5l10 -10"></path></svg>
                            </div>
                            <div id="alertSuccessText">
                            </div>
                        </div>
                        {{--            <a class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="close"></a>--}}
                    </div>
                    @yield('content')
                </div>
            </div>
        </div>
    </div>
</div>
</div>




<script>

    $('body').on('click','.submit_loader',function (){


        $('body').append('<div id="coverScreen"  class="LockOn"> </div>');


    });

</script>


<script src="{{asset('dist/js/demo.min.js')}}" defer></script>
<script src="{{asset('dist/js/tabler.min.js')}}" defer></script>
@yield('scripts')

</body>
</html>
