<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tbl_docsenctr', function (Blueprint $table) {
            $table->string('received_by', 50)->nullable()->after('date_received');
            $table->string('end_by', 50)->nullable()->after('date_end');
        });
    }


    public function down(): void
    {
        Schema::table('tbl_docsenctr', function (Blueprint $table) {
            $table->dropColumn(['received_by', 'end_by']);
        });
    }
};
