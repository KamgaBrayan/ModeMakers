<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('gender');
            $table->string('age');
            $table->float('note')->nullable();
            $table->string('category');
            $table->json('photos');
            $table->boolean('disponibilite')->default(true);
            $table->float('mean_evalue')->nullable();
            $table->text('description');
            $table->float('price');
            $table->float('price_per_square_metter')->nullable();
            $table->string('duree')->nullable();
            $table->string('couleur')->nullable();
            $table->foreignId('stylist_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('material_id')->constrained('materials')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
}
