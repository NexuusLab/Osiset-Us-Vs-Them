@extends('admin.layout.index')
<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
<style>
    .sync-button{
        float: right;
    }

    .size_button{
        font-size: 13px !important;
    }
    .select2-container{
        width: 100% !important;
    }

    .display_none
    {
        display: none;
    }
    .input-group > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback){
        margin-left: 2px !important;
    }

    .btn_size{
        font-size: 12px !important;
    }

    .d-flex{
        column-gap: 10px;
    }
    span.select2.select2-container.select2-container--default {
        width: 150px !important;
        padding: 2px;
        background-color: #fff;
        border: 1px solid #dadcde;
    }
    .theme-light{
        overflow-x: hidden;
    }

</style>
@section('content')

    @if(session()->has('message'))
        <div class="alert alert-important alert-success alert-dismissible "  role="alert" id="alertSuccess">
            <div class="d-flex">
                <div>
                    <!-- Download SVG icon from http://tabler-icons.io/i/check -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon alert-icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 12l5 5l10 -10"></path></svg>
                </div>
                <div id="alertSuccessText">
                    {{ session()->get('message') }}
                </div>
            </div>
            {{--            <a class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="close"></a>--}}
        </div>
    @endif
    <div class="page-header d-print-none">
        <div class="row g-2 ">
            <div class="col-md-6 ">
                <h1 class="page-title mt-2">
                    Dashboard
                </h1>
            </div>
            <div class="col-md-6">

                <div class="form-group">
                    <form action="{{route('store.filter')}}" method="GET">

                        <div class="input-group">
                            <input placeholder="Enter Store name" type="text" @if (isset($request)) value="{{$request->name}}" @endif name="name"  autocomplete="off" class="form-control">
                            @if(isset($request))
                                <a href="{{route('admin')}}" type="button" class="btn btn-secondary clear_filter_data mr-1 pl-4 pr-4">Clear</a>
                            @endif
                            <button type="submit" class="btn btn-primary mr-1 pl-4 pr-4">Filter</button>
                        </div>
                    </form>

                </div>

            </div>
        </div>

    </div>


    <div class="page-body">
        <div class="">
            <div class="row row-cards">
                <div class="col-12">
                    <div class="card">
                        <div class="table-responsive">
                            @if(count($users) > 0)
                                <table
                                    class="table table-vcenter card-table">
                                    <thead>
                                    <tr>
                                        <th style="width: 20%">Store Name</th>
                                        <th style="width: 15%">Impression Count</th>
                                        <th style="width: 10%">Enable/disable footer</th>


                                    </tr>
                                    </thead>
                                    <tbody>

                                    @foreach($users as $index=> $user)

                                        <tr>
                                            <td>{{$user->name}} </td>
                                            <td>{{$user->count}}</td>

                                            <td>
                                                <label class="form-check form-switch merchant-store-{{$user->id}}"    >
                                                    <input class="form-check-input ml-3 two_week-{{$user->id}} store_front_footer" data-id="{{$user->id}}" @if($user->footer_status==1) checked  @endif  value="1" type="checkbox" name="status_week">
                                                </label>
                                            </td>
                                        </tr>
                                    @endforeach
                                    </tbody>
                                </table>

                            @else
                                <h3 class="mx-3 my-3">No Store Found</h3>
                            @endif
                            <div class="pagination">
                                {{ $users->appends(\Illuminate\Support\Facades\Request::except('page'))->links("pagination::bootstrap-4") }}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <script>

        $(document).ready(function(){
            setTimeout(function() { $(".alert-success").hide(); }, 2000);

            $('.store_front_footer').change(function (){


                var id= $(this).data('id');

                if($(this).is(':checked')){

                    var status=1;
                }
                else{
                    var status=0;
                }


                $.ajax({
                    type:'get',
                    url:'{{URL::to('store-front-footer')}}',
                    data:{'store_front_status':status,'id':id},

                    success:function(data){
                        var op=' ';
                        if(data.status==1){
                            op += '<p>Footer Enabled</p>';

                            $('#alertSuccessText').empty();

                            $('#alertSuccessText').append(op);
                            $('#alertSuccess').show();
                            setTimeout(function() { $("#alertSuccess").hide(); }, 2000);
                        }
                        else{
                            op += '<p>Footer Disabled</p>';

                            $('#alertSuccessText').empty();
                            // $('#model_'+rem).empty();
                            $('#alertSuccessText').append(op);
                            $('#alertSuccess').show();

                            setTimeout(function() { $("#alertSuccess").hide(); }, 2000);

                        }

                    },
                    error: function (request, status, error) {


                    }


                });
            });
        });
    </script>



@endsection

