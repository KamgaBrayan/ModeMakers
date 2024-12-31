<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('OrderId');
            $table->decimal('payment_cost', 10, 2);
            $table->timestamp('payment_date');
            $table->string('payment_method');
            $table->string('status');
            $table->timestamps();

            $table->foreign('OrderId')->references('id')->on('orders')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('payments');
    }
}
