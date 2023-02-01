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


        $user_template_products = UserTemplateProduct::where('shop_id', $shop->id)->get();
        if(count($user_template_products) > 0) {
            $value = [
                "footer_status" => $shop->footer_status,
            ];
            foreach ($user_template_products as $user_template_product) {

                $product_metafield = $shop->api()->rest('put', '/admin/products/' . $user_template_product->shopify_product_id . '.json', [
                    'product' => [
                        "metafields" =>
                            array(
                                0 =>
                                    array(
                                        "key" => 'products',
                                        "value" => json_encode($value),
                                        "type" => "json_string",
                                        "namespace" => "widget",
                                    ),
                            ),
                    ]
                ]);
                if ($product_metafield['errors']=true) {
                    $res = $shop->api()->rest('get', '/admin/products/' . $user_template_product->shopify_product_id . '/metafields.json');


                    foreach ($res['body']['container']['metafields'] as $deliverydate) {

                        if ($deliverydate['key'] == 'products') {

                            $product_metafield = $shop->api()->rest('put', '/admin/metafields/'.$deliverydate['id'].'.json', [

                                "metafield" =>

                                    array(
                                        "type" => "json_string",
                                        "value" => json_encode($value),
                                    ),
                            ]);
                        }
                    }
                }
            }
        }
        return response()->json(['status'=>$request->store_front_status]);
    }
}
