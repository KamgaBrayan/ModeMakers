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


            // Ajouter les nouvelles colonnes
            if (!Schema::hasColumn('payments', 'pre_order_id')) {
                $table->foreignId('pre_order_id')->constrained('orders')->after('id');
            }
            if (!Schema::hasColumn('payments', 'amount')) {
                $table->decimal('amount', 10, 2)->after('pre_order_id');
            }
            if (!Schema::hasColumn('payments', 'currency')) {
                $table->string('currency')->default('XAF')->after('amount');
            }
            if (!Schema::hasColumn('payments', 'payment_intent_id')) {
                $table->string('payment_intent_id')->nullable()->after('currency');
            }
            if (!Schema::hasColumn('payments', 'client_secret')) {
                $table->string('client_secret')->nullable()->after('payment_intent_id');
            }

            // Modifier le type de status si la colonne existe
            if (Schema::hasColumn('payments', 'status')) {
                $table->enum('status', ['pending', 'confirmed', 'canceled'])->default('pending')->change();
            } else {
                $table->enum('status', ['pending', 'confirmed', 'canceled'])->default('pending');
            }

            // Ajouter les timestamps si nécessaire
            if (!Schema::hasColumn('payments', 'created_at')) {
                $table->timestamp('created_at')->useCurrent();
            }
            if (!Schema::hasColumn('payments', 'updated_at')) {
                $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            // Supprimer les nouvelles colonnes
            $table->dropColumn([
                'pre_order_id',
                'amount',
                'currency',
                'payment_intent_id',
                'client_secret'
            ]);
            
            // Restaurer les anciennes colonnes
            $table->foreignId('commandId')->constrained('orders');
            $table->decimal('payment_cost', 10, 2);
            $table->timestamp('payment_date');
            $table->string('payment_method');
            
            // Restaurer l'ancien type de status
            $table->string('status')->change();
        });
    }
};
