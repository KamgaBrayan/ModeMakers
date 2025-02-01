import { Product } from "./product.interface";

 export interface StylistUser {
  id: number;
  name: string;
  roles: string[];
  specialty: string;
  photos: string[];
  biography: string;
  calendar: string[];
  experience: string;
  localisation: string;
  phone: string;
  category: string[];
  products:Product[]
}
