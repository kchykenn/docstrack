<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActionTypeTable extends Migration
{
    public function up(): void
    {
        Schema::create('tbl_accttype', function (Blueprint $table) {
            $table->id();
            $table->string('act_code')->unique();
            $table->string('act_name');
            $table->boolean('act_stat')->default(0);

            $table->timestamp('ts_created_at')->nullable();
            $table->timestamp('ts_updated_at')->nullable();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tbl_accttype');
    }
}
