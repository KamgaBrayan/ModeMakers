export interface Material {
  id: number;
  type: string;
  name: string;
  photos: string[];
  descrtption: string;
  price_per_square_meter: number;
  color: string[];
}


export interface ReduceMaterial {
  name: string;
  photo: string;
  price_per_square_meter: number
}
