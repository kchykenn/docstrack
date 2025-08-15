<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocsTypeTable extends Migration
{
    public function up(): void
    {
        Schema::create('tbl_documtype', function (Blueprint $table) {
            $table->id();
            $table->string('docs_code')->unique();
            $table->string('docs_name');
            $table->boolean('docs_stat')->default(0);

            $table->timestamp('ts_created_at')->nullable();
            $table->timestamp('ts_updated_at')->nullable();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tbl_documtype');
    }
}
