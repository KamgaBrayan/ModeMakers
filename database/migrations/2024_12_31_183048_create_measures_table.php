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
            $table->float('head_circumference');
            $table->float('neck_circumference');
            $table->float('shoulder_length');
            $table->float('arm_length');
            $table->float('chest_circumference');
            $table->float('underbust_circumference');
            $table->float('waist_circumference');
            $table->float('iliac_crest_circumference');
            $table->float('hip_circumference');
            $table->float('thigh_circumference');
            $table->float('knee_circumference');
            $table->float('calf_circumference');
            $table->float('ankle_circumference');
            $table->float('biceps_circumference');
            $table->float('elbow_circumference');
            $table->float('forearm_circumference');
            $table->float('wrist_circumference');
            $table->float('wrist_to_elbow_length');
            $table->float('knee_to_ankle_length');
            $table->float('inseam_length');
            $table->float('outseam_length');
            $table->float('total_height');
            $table->float('front_body_length');
            $table->float('back_body_length');
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
