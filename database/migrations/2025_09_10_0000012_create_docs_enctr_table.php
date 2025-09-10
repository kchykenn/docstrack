<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocsEnctrTable extends Migration
{
    public function up(): void
    {
        Schema::create('tbl_docsenctr', function (Blueprint $table) {
            $table->id();
            $table->string('route_no');
            $table->string('docs_con_no');
            $table->string('office_con_no');
            $table->string('docs_subject');
            $table->string('remarks')->nullable();
            $table->string('docs_type');
            $table->string('seq_no')->nullable();
            $table->string('depart_from');
            $table->string('act_taken');
            $table->string('depart_user');
            $table->string('docs_destin');
            $table->string('status')->default('0');

            $table->timestamp('ts_created_at')->nullable();
            $table->timestamp('ts_updated_at')->nullable();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tbl_docsenctr');
    }
}
