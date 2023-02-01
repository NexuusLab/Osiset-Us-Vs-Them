<!doctype html>
<!--
* Tabler - Premium and Open Source dashboard template with responsive and high quality UI.
* @version 1.0.0-beta10
* @link https://tabler.io
* Copyright 2018-2022 The Tabler Authors
* Copyright 2018-2022 codecalm.net Paweł Kuna
* Licensed under MIT (https://github.com/tabler/tabler/blob/master/LICENSE)
-->
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>Login</title>
    <!-- CSS files -->
    <link href="{{asset('dist/css/tabler.min.css')}}" rel="stylesheet"/>
    <link href="{{asset('dist/css/tabler-flags.min.css')}}" rel="stylesheet"/>
    <link href="{{asset('dist/css/tabler-payments.min.css')}}" rel="stylesheet"/>
    <link href="{{asset('dist/css/tabler-vendors.min.css')}}" rel="stylesheet"/>
    <link href="{{asset('dist/css/demo.min.css')}}" rel="stylesheet"/>
</head>
<body  class=" border-top-wide border-primary d-flex flex-column">
<div class="page page-center">
    <div class="container-tight py-4">
        <div class="text-center mb-4">
            <a href="." class="navbar-brand navbar-brand-autodark"><img src="./static/logo.svg" height="36" alt=""></a>
        </div>
        <form class="card card-md" action="{{ route('login') }}" method="POST" autocomplete="off">
            @csrf
            <div class="card-body">
                <h2 class="card-title text-center mb-4">Login to your account</h2>
                <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input type="email" class="form-control @error('email') is-invalid @enderror" name="email" required placeholder="Enter email" autocomplete="off">
                    @error('email')
                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                    @enderror
                </div>
                <div class="mb-2">
                    <label class="form-label">
                        Password
{{--                        <span class="form-label-description">--}}
{{--                              @if (Route::has('password.request'))--}}
{{--                                <a href="{{ route('password.request') }}">I forgot password</a>--}}
{{--                            @endif--}}
{{--                </span>--}}
                    </label>
                    <div class="input-group input-group-flat">
                        <input type="password" id="pass_log_id" class="form-control @error('password') is-invalid @enderror" name="password" required  placeholder="Password"  autocomplete="off">
                        <span class="input-group-text">
                  <a  class="link-secondary" id="show_password" title="Show password" data-bs-toggle="tooltip"><!-- Download SVG icon from http://tabler-icons.io/i/eye -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="2" /><path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" /></svg>
                  </a>
                </span>
                    </div>
                </div>
                <div class="mb-2">
                    <label class="form-check">
                        <input type="checkbox" class="form-check-input"/>
                        <span class="form-check-label">Remember me on this device</span>
                    </label>
                </div>
                <div class="form-footer">
                    <button type="submit" class="btn btn-primary w-100">Sign in</button>
                </div>
            </div>

        </form>
{{--        <div class="text-center text-muted mt-3">--}}
{{--            Don't have account yet? <a href="{{route('register')}}" tabindex="-1">Sign up</a>--}}
{{--        </div>--}}
    </div>
</div>
<!-- Libs JS -->
<!-- Tabler Core -->
<script src="{{asset('dist/js/demo.min.js')}}" defer></script>
<script src="{{asset('dist/js/tabler.min.js')}}" defer></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>


<script>

    $(document).ready(function (){
        $("body").on('click', '#show_password', function() {
            var input = $("#pass_log_id");
            if (input.attr("type") === "password") {
                input.attr("type", "text");
            } else {
                input.attr("type", "password");
            }
        });
    });
</script>
</body>
</html>
