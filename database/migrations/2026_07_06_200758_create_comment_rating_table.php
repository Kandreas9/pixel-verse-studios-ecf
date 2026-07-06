<?php

use App\Models\Comment;
use App\Models\Rating;
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
        Schema::create('comment_rating', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Comment::class)->constrained()->onDelete('cascade');
            $table->foreignIdFor(Rating::class)->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comment_rating');
    }
};
