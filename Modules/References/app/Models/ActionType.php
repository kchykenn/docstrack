<?php

namespace Modules\References\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class ActionType extends Model
{
    use SoftDeletes;

    protected $table = 'tbl_accttype';

    protected $fillable = [
        'act_code',
        'act_name',
        'act_stat',
        'ts_created_at',
        'ts_updated_at',
    ];

    public $timestamps = false;

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->ts_created_at = Carbon::now('Asia/Manila');
        });

        static::updating(function ($model) {
            $model->ts_updated_at = Carbon::now('Asia/Manila');
        });
    }

    protected $dates = ['ts_created_at', 'ts_updated_at', 'deleted_at'];
}