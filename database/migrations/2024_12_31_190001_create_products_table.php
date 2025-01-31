<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('gender');
            $table->string('age');
            $table->text('note')->nullable();
            $table->string('category');
            $table->json('photos');
            $table->boolean('disponibilite')->default(true);
            $table->decimal('mean_evalue', 3, 2)->default(0.00);
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->string('duree');
            $table->string('couleur');
            $table->foreignId('stylist_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
