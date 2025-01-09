export interface Measurements {
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
  date_measure: string;
}

export interface Precommand {
  id: number;
  customerName: string;
  productName: string;
  gender: 'male' | 'female' | 'unisex';
  ageRange: string;
  category: string;
  description: string;
  materials: string[];
  specifications: string;
  status: 'pending' | 'reviewed' | 'confirmed';
  submittedAt: string | Date;
  photos?: string[];
  measurements: Measurements;
  stylistId?: number;
  customerId?: number;
  price?: number;
  proposedPrice?: number;
  finalPrice?: number;
  workforcePrice?: number;
  deliveryDate?: string | Date;
  notes?: string;
}
