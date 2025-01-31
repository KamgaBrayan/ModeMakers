<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Measure extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'head_circumference',
        'neck_circumference',
        'shoulder_length',
        'arm_length',
        'chest_circumference',
        'underbust_circumference',
        'waist_circumference',
        'iliac_crest_circumference',
        'hip_circumference',
        'thigh_circumference',
        'knee_circumference',
        'calf_circumference',
        'ankle_circumference',
        'biceps_circumference',
        'elbow_circumference',
        'forearm_circumference',
        'wrist_circumference',
        'wrist_to_elbow_length',
        'knee_to_ankle_length',
        'inseam_length',
        'outseam_length',
        'total_height',
        'front_body_length',
        'back_body_length',
        'date_measure',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
