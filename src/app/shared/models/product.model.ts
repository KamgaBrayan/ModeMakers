import { Material } from './material.model';

export interface Product {
  id: number;
  name: string;
  gender: string;
  age: string;
  category: string;
  description: string;
  price: number;
  pricePerMeter: number;
  duration: string;
  color: string;
  availability: boolean;
  meanEvaluation: number;
  note: number;
  images: string[];
  stylist: {
    id: number;
    name: string;
    image: string;
  };
  materials: Material[];
  delivery?: {
    id: number;
    day: number;
    price: number;
    type: string;
  }[];
  inStock?: boolean;
  numberReviews?: number;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
}
