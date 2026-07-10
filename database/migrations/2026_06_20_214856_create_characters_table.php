<?php

use App\Models\User;
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
        Schema::create('characters', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->onDelete('cascade');
            $table->string('name', 50)->unique();
            $table->string('gender', 50);
            $table->string('skin_color', 50);
            $table->string('eye_color', 50);
            $table->string('eye_shape', 50);
            $table->string('hair_color', 50);
            $table->string('nose_shape', 50);
            $table->string('mouth_shape', 50);
            $table->boolean('is_shared')->default(false);
            $table->boolean('is_approved')->default(false);
            $table->string('image')->nullable();
            $table->timestamps();
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
