 export   interface Product {
    id: number;
    name: string;
    gender: string;
    age: string;
    photos: string[];
    description: string;
    price: number;
    price_per_square_metter: number;
    stylist: {
      id: number;
      name: string;
    };
    material: {
      id: number;
      type: string;
    }[];
    rating: number;
    workforce: string[];
    views: number;
    // requiredMeasures: Partial<Record<MeasureKey, boolean>>; // Dictionnaire des mesures requises
  }
    
  export interface Stylist {
    id: number;
    name: string;
    photos: string[];
    biography: string;
    calendar: string[];
    experience: string;
    localisation: string;
    phone: string;
    rating: number;
    specialty: string;
    category: string[];
    views: number;
  }
  
export interface Material {
  id: number;
  name: string;
  photos: string[];
  description: string;
  price_per_square_meter: number;
  color: string[];
}
  
export interface UserReview {
  username: string;
  rating: number; // Valeur entre 1 et 5
  comment: string;
  date: Date;
}

export interface Review{
  id: number;
  user:{
    user_id: number;
    user_name: string;
  };
  product:{
    product_note: number;
    product_id: number;
  };
  comment: string,
  date: string;
}

export const  MeasureKey = [ 
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
  export type  measureKey =  
    "stature"
    |"shoulder_circumference"
    |"chest_circumference"
    |"waist_circumference"
    |"hip_circumference"
    |"shoulder_height"
    |"hip_height"
    |"knee_height"
    |"chest_spacing"
    |"breast_height"
    |"pelvis_height"
    |"front_waist_length"
    |"shoulder_length"
    |"back_waist_length"
    |"arm_length"
    |"total_arm_length_bent"
    |"wrist_circumference"
    |"ankle_height"
    |"seated_height"
    |"crotch_length"
    
  export interface ReduceMaterial{
    name: string; 
    photo: string;
    price_per_square_meter: number 
  }

  export interface Precommand{
    name: string;
    photos: string[];
  }

  export interface Garment{
    productId: string;
    materials:{
      name: string; 
      photo: string;
      price_per_square_meter: number 
    };
    gender: 'male' | 'female'| 'other';
    location: string;
    specification: string;
    deliveryType: 'standard' | 'advanced' | 'express' ;
    measure:{
      measureKey : measureKey;
      measureValue : number
    }
  }

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
  