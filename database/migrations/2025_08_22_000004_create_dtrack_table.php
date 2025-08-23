<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDTrackTable extends Migration
{
    public function up(): void
    {
        Schema::create('tbl_dtrack', function (Blueprint $table) {
            $table->id();
            $table->string('route_no')->unique();
            $table->string('docs_con_no')->unique();
            $table->string('office_con_no')->unique();
            $table->string('docs_subject');
            $table->string('docs_type');
            $table->string('seq_no')->nullable();
            $table->string('docs_destin');

            $table->timestamp('ts_created_at')->nullable();
            $table->timestamp('ts_updated_at')->nullable();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tbl_dtrack');
    }
}
