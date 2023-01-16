<?php

namespace App\Jobs;

use App\Http\Controllers\ProductController;
use App\Models\Product;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


class AfterAuthenticateJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(Request $request)
    {

       $productController = new ProductController();
        $productController->SyncProdcuts($request->shop);
        $shop=User::where('name',$request->shop)->first();
        $products=Product::where('shop_id',$shop->id)->get();

        foreach ($products as $product) {
            $res = $shop->api()->rest('get', '/admin/products/' . $product->shopify_id . '/metafields.json');

                foreach ($res['body']['container']['metafields'] as $deliverydate) {
                    if ($deliverydate['key'] == 'products') {
                        $delete = $shop->api()->rest('delete', '/admin/metafields/' . $deliverydate['id'] . '.json');
                    }
                }
        }


    }
}
