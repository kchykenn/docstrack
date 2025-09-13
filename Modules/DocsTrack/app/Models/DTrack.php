<?php

namespace Modules\DocsTrack\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class DTrack extends Model
{
    use SoftDeletes;

    protected $table = 'tbl_dtrack';

    protected $fillable = [
        'route_no',
        'docs_con_no',
        'office_con_no',
        'docs_subject',
        'docs_type',
        'seq_no',
        'depart_from',
        'act_taken',
        'depart_user',
        'docs_destin',
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
