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
        Schema::table('characters', function (Blueprint $table) {
            $table->string('gender', 50);
            $table->string('skin_color', 50);
            $table->string('eye_color', 50);
            $table->string('eye_shape', 50);
            $table->string('hair_color', 50);
            $table->string('nose_color', 50);
            $table->string('mouth_color', 50);
            $table->boolean('isShared');
            $table->boolean('isAuthorized');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('characters');
    }
};
