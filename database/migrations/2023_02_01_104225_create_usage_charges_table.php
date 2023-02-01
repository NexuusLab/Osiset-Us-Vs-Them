<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsageChargesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usage_charges', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('charge_id')->nullable();
            $table->longText('description')->nullable();
            $table->double('price')->nullable();
            $table->text('currency')->nullable();
            $table->text('billing_on')->nullable();
            $table->double('balance_used')->nullable();
            $table->double('balance_remaining')->nullable();
            $table->double('risk_level')->nullable();
            $table->bigInteger('shop_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('usage_charges');
    }
}
