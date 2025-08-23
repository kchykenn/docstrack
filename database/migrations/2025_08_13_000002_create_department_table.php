<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDepartmentTable extends Migration
{
    public function up(): void
    {
        Schema::create('tbl_department', function (Blueprint $table) {
            $table->id();
            $table->string('depart_code')->unique();
            $table->string('division_name');
            $table->string('depart_name');
            $table->boolean('depart_stat')->default(0);

            $table->timestamp('ts_created_at')->nullable();
            $table->timestamp('ts_updated_at')->nullable();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tbl_department');
    }
}
