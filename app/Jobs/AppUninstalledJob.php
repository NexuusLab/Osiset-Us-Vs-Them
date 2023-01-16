<?php namespace App\Jobs;

use App\Models\Advantage;
use App\Models\Charge;
use App\Models\Competator;
use App\Models\CompetitorName;
use App\Models\ErrorLog;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\User;
use App\Models\UserTemplate;
use App\Models\UserTemplateProduct;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Osiset\ShopifyApp\Objects\Values\ShopDomain;
use stdClass;

class AppUninstalledJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Shop's myshopify domain
     *
     * @var ShopDomain|string
     */
    public $shopDomain;

    /**
     * The webhook data
     *
     * @var object
     */
    public $data;

    /**
     * Create a new job instance.
     *
     * @param string   $shopDomain The shop's myshopify domain.
     * @param stdClass $data       The webhook data (JSON decoded).
     *
     * @return void
     */
    public function __construct($shopDomain, $data)
    {
        $this->shopDomain = $shopDomain;
        $this->data = $data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // Convert domain
        $shop= User::where('name', $this->shopDomain)->first();
        try {

          ProductVariant::where('shop_id',$shop->id)->delete();
           UserTemplate::where('shop_id',$shop->id)->delete();
           Advantage::where('shop_id',$shop->id)->delete();
            Competator::where('shop_id',$shop->id)->delete();
            CompetitorName::where('shop_id',$shop->id)->delete();
            Charge::where('shop_id',$shop->id)->delete();
            UserTemplateProduct::where('shop_id',$shop->id)->delete();
          Product::where('shop_id',$shop->id)->delete();

            User::where('id',$shop->id)->forceDelete();

        } catch (\Exception $e) {

            $error_log=new ErrorLog();
            $error_log->topic='Unistall catch';
            $error_log->response=  $e->getMessage();
            $error_log->save();
        }
    }
}
