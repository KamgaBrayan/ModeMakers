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
        Schema::create('measures', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->float('stature');
            $table->float('shoulder_circumference');
            $table->float('chest_circumference');
            $table->float('waist_circumference');
            $table->float('hip_circumference');
            $table->float('shoulder_height');
            $table->float('hip_height');
            $table->float('knee_height');
            $table->float('chest_spacing');
            $table->float('breast_height');
            $table->float('pelvis_height');
            $table->float('front_waist_length');
            $table->float('shoulder_length');
            $table->float('back_waist_length');
            $table->float('arm_length');
            $table->float('total_arm_length_bent');
            $table->float('wrist_circumference');
            $table->float('ankle_height');
            $table->float('seated_height');
            $table->float('crotch_length');
            $table->timestamp('date_measure');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('measures');
    }
};
