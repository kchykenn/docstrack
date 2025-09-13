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
        Schema::table('tbl_dtrack', function (Blueprint $table) {
            // Add prefix and name_extension columns
            $table->string('depart_user', 50)->after('depart_from');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tbl_dtrack', function (Blueprint $table) {
            // Rollback: drop the columns
            $table->dropColumn('depart_user');
        });
    }
};
