<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //

        Schema::create('operations', function(Blueprint $table){
            $table->id();
            $table->string('type');
            $table->float('montant');
            $table->timestamp('date_operation')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->unsignedBigInteger('compte_id');
            $table->foreign('compte_id')->references('id')->on('comptes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::table('operations', function(Blueprint $table){
            $table->dropForeign('client_id');
        });
    }
};
