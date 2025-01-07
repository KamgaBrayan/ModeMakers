import { measureKey } from "./measure.interface";

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
