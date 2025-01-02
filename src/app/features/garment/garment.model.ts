 
export   interface Product {
    id: number;
    name: string;
    gender: string;
    age: string; // Vous pouvez adapter le type en fonction des valeurs possibles, comme 'Range' ou 'Child'
    category: string;
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
    views: number;
    requiredMeasures: Partial<Record<MeasureKey, boolean>>; // Dictionnaire des mesures requises
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
    workforce: number[]; //La main d'oeuvre
  }
  
export interface Material {
  id: number;
  name: string;
  photos: string[];
  description: string;
  price_per_square_meter: number;
  color: string[];
}
  
export type MeasureKey = 
  | "stature"
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
  | "";
