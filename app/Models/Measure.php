<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Measure extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'stature',
        'shoulder_circumference',
        'chest_circumference',
        'waist_circumference',
        'hip_circumference',
        'shoulder_height',
        'hip_height',
        'knee_height',
        'chest_spacing',
        'breast_height',
        'pelvis_height',
        'front_waist_length',
        'shoulder_length',
        'back_waist_length',
        'arm_length',
        'total_arm_length_bent',
        'wrist_circumference',
        'ankle_height',
        'seated_height',
        'crotch_length',
        'date_measure',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
