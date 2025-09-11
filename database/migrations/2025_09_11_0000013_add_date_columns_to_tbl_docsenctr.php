<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tbl_docsenctr', function (Blueprint $table) {
            $table->string('date_received', 50)->nullable()->after('status');
            $table->string('date_rerouted', 50)->nullable()->after('date_received');
            $table->string('date_end', 50)->nullable()->after('date_rerouted');
        });
    }


    public function down(): void
    {
        Schema::table('tbl_docsenctr', function (Blueprint $table) {
            $table->dropColumn(['date_received', 'date_rerouted', 'date_end']);
        });
    }
};
