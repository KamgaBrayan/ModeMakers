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
        Schema::table('payments', function (Blueprint $table) {
            // Supprimer d'abord la contrainte de clé étrangère
            $table->dropForeign(['OrderId']);
            // Puis supprimer la colonne
            $table->dropColumn('OrderId');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            // Recréer la colonne
            $table->unsignedBigInteger('OrderId')->nullable();
            // Recréer la contrainte de clé étrangère
            $table->foreign('OrderId')->references('id')->on('orders');
        });
    }
};
