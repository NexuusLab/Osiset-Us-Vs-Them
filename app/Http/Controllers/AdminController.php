<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserTemplateProduct;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index(){
    $users=User::where('role','!=','admin')->paginate(20);
    return view('admin.index',compact('users'));
    }

    public function StoreFilter(Request $request){

        $users=User::where('role','!=','admin')->where('name', 'like', '%' . $request->name . '%')->paginate('20');
        return view('admin.index',compact('users','request'));
    }

    public function StoreFrontFooterStatus(Request $request){

        $shop=User::find($request->id);
        $shop->footer_status=$request->store_front_status;
        $shop->save();

        if($shop->metafield_id==null) {

            $shop_metafield = $shop->api()->rest('post','/admin/metafields.json', [
                "metafield" => array(
                    "key" => 'setting',
                    "value" => $shop->footer_status,
                    "type" => "number_integer",
                    "namespace" => "usvsthem"
                )
            ]);
       if($shop_metafield['errors']==false){

            $shop->metafield_id=$shop_metafield['body']['metafield']['id'];
            $shop->save();

       }
        }
        else{
            $shop_metafield = $shop->api()->rest( 'put','/admin/metafields/' . $shop->metafield_id . '.json', [
                "metafield" => [
                    "value" => $shop->footer_status
                ]
            ]);
        }

        return response()->json(['status'=>$request->store_front_status]);
    }
}
