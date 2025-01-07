export const MeasureKey = [
    "stature",
    "shoulder_circumference",
    "chest_circumference",
    "waist_circumference",
    "hip_circumference",
    "shoulder_height",
    "hip_height",
    "knee_height",
    "chest_spacing",
    "breast_height",
    "pelvis_height",
    "front_waist_length",
    "shoulder_length",
    "back_waist_length",
    "arm_length",
    "total_arm_length_bent",
    "wrist_circumference",
    "ankle_height",
    "seated_height",
    "crotch_length"
]
export type measureKey =
    "stature"
    | "shoulder_circumference"
    | "chest_circumference"
    | "waist_circumference"
    | "hip_circumference"
    | "shoulder_height"
    | "hip_height"
    | "knee_height"
    | "chest_spacing"
    | "breast_height"
    | "pelvis_height"
    | "front_waist_length"
    | "shoulder_length"
    | "back_waist_length"
    | "arm_length"
    | "total_arm_length_bent"
    | "wrist_circumference"
    | "ankle_height"
    | "seated_height"
    | "crotch_length"



export interface Measure {
    id: number;
    user: {
        user_id: number;
        user_name: string;
    };
    stature: number;
    shoulder_circumference: number;
    chest_circumference: number;
    waist_circumference: number;
    hip_circumference: number;
    shoulder_height: number;
    hip_height: number;
    knee_height: number;
    chest_spacing: number;
    breast_height: number;
    pelvis_height: number;
    front_waist_length: number;
    shoulder_length: number;
    back_waist_length: number;
    arm_length: number;
    total_arm_length_bent: number;
    wrist_circumference: number;
    ankle_height: number;
    seated_height: number;
    crotch_length: number;
    date_measure: string; // ISO 8601 date string
}
