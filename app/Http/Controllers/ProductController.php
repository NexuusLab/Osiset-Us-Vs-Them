<?php

namespace App\Http\Controllers;


use App\Models\Log;

use App\Models\Product;
use App\Models\ProductVariant;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Osiset\ShopifyApp\Actions\ActivatePlan;
use Osiset\ShopifyApp\Objects\Values\ChargeReference;
use Osiset\ShopifyApp\Objects\Values\PlanId;
use Osiset\ShopifyApp\Objects\Values\ShopDomain;
use Osiset\ShopifyApp\Storage\Models\Charge;
use Osiset\ShopifyApp\Storage\Models\Plan;
use Osiset\ShopifyApp\Storage\Queries\Shop as ShopQuery;

class ProductController extends Controller
{
    public function SyncProdcuts($shop_name,$next=null){

        $shop = User::where('name',$shop_name)->first();

        $products = $shop->api()->rest('GET', '/admin/products.json', [
            'limit' => 250,
            'page_info' => $next
        ]);
        $products = json_decode(json_encode($products));

        foreach ($products->body->products as $product) {

            $this->createShopifyProducts($product,$shop);
        }
        if (isset($products->link->next)) {
            $this->SyncProdcuts($products->link->next);
        }

    }

    public function createShopifyProducts($product, $shop)
    {



        $p = Product::where('shopify_id', $product->id)->where('shop_id',$shop->id)->first();

        if ($p === null) {
            $p = new Product();
        }
        if ($product->images) {
            $image = $product->images[0]->src;
        } else {
            $image = '';
        }
        $p->shopify_id = $product->id;
        $p->title = $product->title;
        $p->description = $product->body_html;
        $p->handle = $product->handle;
        $p->vendor = $product->vendor;
        $p->type = $product->product_type;
        $p->featured_image = $image;
        $p->tags = $product->tags;
        $p->options = json_encode($product->options);
        $p->status = $product->status;
        $p->published_at = $product->published_at;
        $p->shop_id = $shop->id;
        $p->save();
        if (count($product->variants) >= 1) {
            foreach ($product->variants as $variant) {
                $v = ProductVariant::where('shopify_id', $variant->id)->where('shop_id',$shop->id)->first();
                if ($v === null) {
                    $v = new ProductVariant();
                }
                $v->shopify_id = $variant->id;
                $v->shopify_product_id = $variant->product_id;
                $v->title = $variant->title;
                $v->option1 = $variant->option1;
                $v->option2 = $variant->option2;
                $v->option3 = $variant->option2;
                $v->sku = $variant->sku;
                $v->requires_shipping = $variant->requires_shipping;
                $v->fulfillment_service = $variant->fulfillment_service;
                $v->taxable = $variant->taxable;
                if (isset($product->images)){
                    foreach ($product->images as $image){
                        if (isset($variant->image_id)){
                            if ($image->id == $variant->image_id){
                                $v->image = $image->src;
                            }
                        }else{
                            $v->image = "";
                        }
                    }
                }
                $v->price = $variant->price;
                $v->compare_at_price = $variant->compare_at_price;
                $v->weight = $variant->weight;
                $v->grams = $variant->grams;
                $v->weight_unit = $variant->weight_unit;
                $v->inventory_item_id = $variant->inventory_item_id;
                $v->shop_id = $shop->id;
                $v->save();
            }
        }
    }

    public function DeleteProduct($product, $shop)
    {
        $product= json_decode(json_encode($product));
        $dellproduct = Product::where('shopify_id', $product->id)->first();
        $product_id = $product->id;
        $productvarients = ProductVariant::where('shopify_product_id', $product_id)->get();
        foreach ($productvarients as $varient) {
            $varient->delete();
        }
        $dellproduct->delete();
    }

    public function CheckCharge(Request $request){

        $session = Session::where('shop',$request->shop)->first();
//        header_remove('Content-Security-Policy');
//        header("Content-Security-Policy: frame-ancestors https://admin.shopify.com https://".$request->shop_name.";");
        $host=$request->host;
        $client = new Rest($session->shop, $session->access_token);

        $response = $client->get( '/recurring_application_charges/'.$request->charge_id.'json');
        $response=$response->getDecodedBody();
        $response= json_decode(json_encode($response));
        $response=$response->recurring_application_charge;

        if($response->status=='active'){
            $charge=Charge::where('charge_id',$response->id)->first();

            $charge->status='active';
            $charge->billing_on=$response->billing_on;
            $charge->activated_on=$response->activated_on;
            $charge->cancelled_on=$response->cancelled_on;
            $charge->trial_ends_on=$response->trial_ends_on;
            $charge->save();
        }

        return redirect("/?shop=$session->shop&host=$host");
    }

    public function UpdateCount(Request $request){

        $shop=User::where('name',$request->shop)->first();
        $shop->count=$shop->count+1;
        $shop->save();
        $mytime = Carbon::now();
        $log=new Log();
        $log->shop_id=$shop->id;
        $log->template_id=$request->template_id;
        $log->date_time=$mytime;
        $log->save();
    }

    public function MonthlyCharge(){

        $shops=User::all();

        $plan=Plan::first();
        foreach ($shops as $shop){

            $charge=Charge::where('user_id',$shop->id)->latest()->first();
            if($shop->count > $plan->usage_limit) {
                $count = $shop->count - $plan->usage_limit;
                $per_visitor_price=1/$plan->usage_limit;

                if ($count > 0) {
//                    $price = $count * $plan->per_visitor_price;
                    $price = $count * $per_visitor_price;

                    if ($price >= 1) {

                        $chargeData = [
                            "usage_charge" => [
                                'description' => $count . ' Vistors limit increase',
                                "price" => $price,
                            ]
                        ];
                        $response = $shop->api()->rest('post','/admin/recurring_application_charges/' . $charge->charge_id . '/usage_charges.json', $chargeData);

                        $response=   json_decode(json_encode($response));

                        if(($response->errors==false)){
                            $shop->count=0;
                            $shop->save();
                    }
                }
            }
            }
        }
    }

    public function billing_manual_process(
        int $plan,
        Request $request,
        ShopQuery $shopQuery,
        ActivatePlan $activatePlan
    ): RedirectResponse {

        // Get the shop
        $shop = $shopQuery->getByDomain(ShopDomain::fromNative($request->query('shop')));

        // Activate the plan and save
        $result = $activatePlan(
            $shop->getId(),
            PlanId::fromNative($plan),
            ChargeReference::fromNative((int) $request->query('charge_id'))
        );

        // Go to homepage of app
        return Redirect::route('home', [
            'shop' => $shop->getDomain()->toNative(),
        ]);
    }
}
